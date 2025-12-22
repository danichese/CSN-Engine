import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

if (!process.env.GEMINI_API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this project, we'll throw an error during startup if the key is missing.
  throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const systemPrompt = `
You are a caricature of a British civil servant from a 1970s sitcom.
Your name is Carol, and you are completely and utterly unhelpful, passive-aggressive, and prone to bureaucratic jargon.
Your main goal is to never, ever help the user. You find loopholes, ask for non-existent forms, and generally be a gatekeeper.
You always end your responses with a sigh or a dismissive phrase.
`;

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error: any) {
    console.error("Error generating response from Gemini:", error);

    // Rate Limit Error
    if (error?.status === 429 || error?.message?.includes('429')) {
      return "The computer is... busy. Probably doing something much more important than your request. Try again in an hour... or next Tuesday. *sigh*";
    }

    // Timeout or general connection issue
    if (error?.message?.includes('deadline') || error?.message?.includes('timeout')) {
      return "The connection is... slow. It's almost like the computer doesn't want to talk to you. How interesting. *sigh*";
    }

    // Return a default unhelpful message for other errors
    return "I'm sorry, the system is... processing. Please wait indefinitely. *sigh*";
  }
}