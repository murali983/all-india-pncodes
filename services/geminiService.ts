
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPostalInsights = async (pincode: string, officeName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a very brief (2-sentence) interesting fact or geographic insight about the area around ${officeName} with PIN code ${pincode} in India.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini AI error:", error);
    return "No AI insights available for this location.";
  }
};

export const chatWithAssistant = async (userMessage: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are a helpful assistant for the India PIN Code Finder website. You help users understand Indian postal codes, geography, and how to find their correct address details. Keep answers concise and polite.",
    },
  });
  const response = await chat.sendMessage({ message: userMessage });
  return response.text;
};
