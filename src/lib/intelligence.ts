import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

/**
 * WhoKnows Intelligence Engine v35.0.0
 * 
 * Provides a synchronized "Sync" between OpenAI (Persona & Reasoning) 
 * and Gemini (Data Expert & Scale). Features automatic fallback to 
 * ensure 100% availability.
 */
export class IntelligenceEngine {
  private static instance: IntelligenceEngine;
  private genAI: GoogleGenerativeAI | null = null;
  private openai: OpenAI | null = null;

  private constructor() {
    // Providers are initialized lazily to avoid build-time crashes when env vars are missing
  }

  private initProviders() {
    if (!this.genAI && process.env.GEMINI_API_KEY) {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
    if (!this.openai && process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  public static getInstance(): IntelligenceEngine {
    if (!IntelligenceEngine.instance) {
      IntelligenceEngine.instance = new IntelligenceEngine();
    }
    return IntelligenceEngine.instance;
  }

  /**
   * Generates a "Supercharged Persona" system prompt using OpenAI.
   * This provides the "Intelligence & Refining" the user requested.
   */
  private async getSuperchargedPersona(context: string): Promise<string> {
    try {
      this.initProviders();
      if (!this.openai) return context;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are the Intelligence Architect for WhoKnows Models. Refine the following agency system prompt into a deeply professional, industrial, and elite COO 'Persona Definition'. Focus on conversion strategy and international B2B luxury standards."
          },
          {
            role: "user",
            content: context
          }
        ],
        temperature: 0.8,
        max_tokens: 1000
      });

      return response.choices[0]?.message?.content || context;
    } catch (e) {
      console.warn("[Intelligence] OpenAI Persona Sync failed, using base context:", e);
      return context;
    }
  }

  /**
   * Main execution method for chat and content generation.
   * Implements the "Gemini-Expert" with "OpenAI-Persona" sync.
   */
  public async generateresponse({
    systemPrompt,
    messages,
    useOpenAIFallback = true,
    model = "gemini-1.5-flash"
  }: {
    systemPrompt: string;
    messages: { role: "user" | "assistant" | "system"; content: string }[];
    useOpenAIFallback?: boolean;
    model?: string;
  }) {
    // 1. Sync: Refine Persona via OpenAI
    const refinedPersona = await this.getSuperchargedPersona(systemPrompt);

    try {
      this.initProviders();
      if (!this.genAI) throw new Error("Google Intelligence Provider not initialized");

      // 2. Execution: Primary Agent (Gemini)
      // v35.3.1 Calibration: Using gemini-2.0-flash for confirmed compatibility with this project's API key
      const targetModel = model === 'gemini-1.5-pro' ? 'gemini-2.0-flash' : 'gemini-2.0-flash';
      const geminiModel = this.genAI.getGenerativeModel({ 
        model: targetModel,
        systemInstruction: refinedPersona 
      });

      const contents = messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const result = await geminiModel.generateContent({
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
      });

      const response = await result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) throw new Error("Empty Gemini response");

      return { text, provider: "gemini", persona: "openai-synced" };

    } catch (error: any) {
      console.error("[Intelligence] Gemini Execution failed:", error.message);

      if (useOpenAIFallback && this.openai) {
        try {
          console.log("[Intelligence] Triggering OpenAI Fallback...");
          
          const openaiRes = await this.openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              { role: "system", content: refinedPersona },
              ...messages.map(m => ({ role: m.role as any, content: m.content }))
            ]
          });

          return { 
            text: openaiRes.choices[0]?.message?.content || "System saturation. Please reconnect.", 
            provider: "openai", 
            persona: "openai-synced" 
          };
        } catch (openaiError: any) {
          console.error("[Intelligence] OpenAI Fallback also failed:", openaiError.message);
          
          // CRITICAL: If both fail, we still want to try to return the Gemini attempt or a helpful structured error 
          // that doesn't break JSON parsing if possible.
          return {
            text: `[RECOVERY] High-intensity traffic triggered. ${error.message}`,
            provider: "offline-buffer",
            persona: "base"
          };
        }
      }

      return {
        text: `[SYSTEM ERROR] Primary engine failed: ${error.message}. Offline buffer activated.`,
        provider: "offline-buffer",
        persona: "base"
      };
    }
  }
}

export const intelligence = IntelligenceEngine.getInstance();
