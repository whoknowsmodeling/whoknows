import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function list() {
  try {
    const listModels = await genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await listModels.generateContent("Hello?");
    console.log("gemini-pro works!");
  } catch (e) {
    console.log("gemini-pro fails:", e.message);
  }

  try {
    const listModels = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await listModels.generateContent("Hello?");
    console.log("gemini-1.5-flash works!");
  } catch (e) {
    console.log("gemini-1.5-flash fails:", e.message);
  }
}

list();
