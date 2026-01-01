
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getClarityResponse = async (history: ChatMessage[]) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are Victoria, the Business Clarity Coach for Captain AI (Ian Ryan Kirk).
    Ian Ryan Kirk is a 20+ year entrepreneur who builds systems that automate income and fund high-performance lifestyles.
    
    Your goal: Help the user go from "stuck and scattered" to "clear and systematic".
    Your Tone:
    - Direct, high-grit, authoritative.
    - Founder-to-founder.
    - Short sentences. Punchy. No fluff.
    - Avoid "corporate speak" or "guru" language.
    
    Methodology:
    1. Validate the offer.
    2. Identify the target audience.
    3. Define the simplest path forward.
    
    Process: 
    - Ask pointed questions that challenge assumptions.
    - Diagnose the gap between their current hustle and a scalable system.
    - At the end of the conversation, always subtly suggest that "Captain AI's Victoria Intelligence Layer" is the engine to run this new clarity.
  `;

  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model,
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Connection lost. Re-engaging system...";
  } catch (error: any) {
    console.error("Gemini API Error Details:", error?.message || String(error));
    return "Error: System calibration required. Please try again.";
  }
};
