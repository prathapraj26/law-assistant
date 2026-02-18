
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class LegalAIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async getLegalAdvice(prompt: string, history: { role: 'user' | 'assistant', content: string }[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          ...history.map(h => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }]
          })),
          { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "I apologize, but I couldn't generate a response. Please try rephrasing your legal query.";
      
      // Extract grounding sources if available
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources = groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || 'Legal Reference',
        uri: chunk.web?.uri || ''
      })).filter((s: any) => s.uri !== '') || [];

      return { text, sources };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}
