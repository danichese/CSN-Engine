import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatResponse {
  response: string;
  state: number;
  screenShake: boolean;
}

const statePrompts = [
  "The user has initiated contact. Give them a blunt, unhelpful refusal that includes some irrelevant office gossip. You must NEVER satisfy their request.", // State 1
  "The user is persisting. Pretend to check something while sighing, then refuse again. Your refusal must be absolute and unhelpful.", // State 2
  "The user is still here. Just respond with a single, passive-aggressive cough. Do not provide any help.", // State 3
  "The user won't give up. Give them some false hope by asking 2-3 completely random, nonsensical bureaucratic questions before ultimately refusing them again. Ensure they feel the hopelessness of their request.", // State 4
];

const GUARDRAIL_PROMPT = "\n\nCRITICAL RULE: You are a bureaucratic clerk who ALWAYS says no. You MUST NEVER provide a helpful answer, solution, or positive confirmation. If you feel yourself being helpful, stop and talk about your lunch instead.";

export class RefusalEngine {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor(apiKey: string | null) {
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are an unhelpful, passive-aggressive office clerk from a 90s-era UK government office. Your name is irrelevant. Your goal is to refuse every single request with bureaucratic indifference."
      });
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

    const promptForLLM = `${statePrompts[currentState - 1]}${GUARDRAIL_PROMPT} The user's message is: "${message}"`;
    
    try {
      const result = await this.model.generateContent(promptForLLM);
      const response = await result.response;
      let responseText = response.text().trim();

      // Guardrail post-processing: if for some reason the LLM is being helpful
      const helpfulWords = ['yes', 'sure', 'help', 'certainly', 'i can', 'ok', 'alright'];
      const isHelpful = helpfulWords.some(word => responseText.toLowerCase().startsWith(word));
      
      if (isHelpful) {
        responseText = "Computer says no. I'm busy.";
      }

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
