/**
 * Gemini AI Infrastructure utility.
 * Handles semantic search and automated SEO metadata generation.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function askGemini(prompt: string) {
  if (!GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is not configured.");
    return null;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}

/**
 * Generates an SEO-optimized description for a model.
 * Targets international fashion capitals.
 */
export async function generateSEODescription(modelData: any) {
  const prompt = `
    Act as an expert international fashion editor. Generate a professional, SEO-optimized 160-character description for a model profile. 
    Name: ${modelData.name}
    Gender: ${modelData.gender}
    Location: Bali, Indonesia (International Agency)
    Bio: ${modelData.bio || 'Professional fashion model'}
    Specialties: ${modelData.specialties || 'Editorial, Runway'}
    
    Target Keywords: London, Paris, Milan, NYC, International Modelling, High-End Fashion.
    Output only the description text.
  `;

  return await askGemini(prompt);
}

/**
 * Handles semantic search for talent.
 * Returns a list of keywords or a summarized criteria to filter the database.
 */
export async function analyzeSearchIntent(query: string) {
  const prompt = `
    Analyze this modelling agency search query and extract key attributes (gender, look, specialty, height, hair color).
    Query: "${query}"
    Output valid JSON only with keys: gender, look, specialty, minHeight, hair.
    If an attribute is not found, set it to null.
  `;

  const raw = await askGemini(prompt);
  try {
    // Basic cleanup of markdown backticks if present
    const clean = (raw || '').replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    return null;
  }
}
