import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatResponse {
  response: string;
  state: number;
  screenShake: boolean;
}

const statePrompts = [
  "The user has initiated contact. Give them a blunt, unhelpful refusal that includes some irrelevant office gossip.", // State 1
  "The user is persisting. Pretend to check something while sighing, then refuse again.", // State 2
  "The user is still here. Just respond with a single, passive-aggressive cough.", // State 3
  "The user won't give up. Give them some false hope by asking 2-3 completely random, nonsensical bureaucratic questions before ultimately refusing them again.", // State 4
];

export class RefusalEngine {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor(apiKey: string | null) {
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
  }

  async generateResponse(message: string, currentState: number): Promise<ChatResponse> {
    if (!this.model) {
      throw new Error("API Key not configured");
    }

    // Special handling for initial contact (no message provided)
    if (!message) {
      return {
        response: "What do YOU want",
        state: 1,
        screenShake: false
      };
    }

    const promptForLLM = `${statePrompts[currentState - 1]} The user's message is: "${message}"`;
    
    try {
      const result = await this.model.generateContent(promptForLLM);
      const response = await result.response;
      const responseText = response.text();

      return {
        response: responseText,
        state: currentState,
        screenShake: currentState === 3
      };
    } catch (error) {
      console.error("Error generating Gemini response:", error);
      throw error;
    }
  }

  getNextState(currentState: number): number {
    return currentState >= 4 ? 1 : currentState + 1;
  }
}
