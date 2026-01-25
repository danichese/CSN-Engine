import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatResponse {
  response: string;
  state: number;
  screenShake: boolean;
}

const statePrompts = [
  "The user has initiated contact. Give them a blunt, unhelpful refusal. Do not digress too much, just a firm 'No' or 'Computer says no' with a tiny bit of gossip.", // State 1
  "The user is persisting. Pretend to be checking the computer system, making 'hmmm' or 'hold on' sounds, before ultimately saying the computer still says no.", // State 2
  "The user is still here. Do not use Gemini for this state. The response MUST be exactly '*COUGH*'.", // State 3 (Override logic below)
  "The user won't give up. Ask 2-3 completely random, nonsensical bureaucratic questions (e.g., about their shoe size or if they have a permit for that shirt) before ultimately refusing them again.", // State 4
];

const GUARDRAIL_PROMPT = "\n\nCRITICAL RULE: You are a bureaucratic clerk who ALWAYS says no. You MUST NEVER provide a helpful answer. Keep it concise.";

export class RefusalEngine {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor(apiKey: string | null) {
    if (apiKey && apiKey !== 'demo') {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({
        model: "models/gemini-1.5-flash",
        systemInstruction: "You are an unhelpful, passive-aggressive office clerk. Your goal is to refuse every single request."
      });
    }
  }

  async generateResponse(message: string, currentState: number): Promise<ChatResponse> {
    // Handle Demo Mode or explicit 'demo' key
    if (this.genAI === null || !this.model) {
      const demoResponses: Record<number, string> = {
        1: "Computer says no. Janet from accounting left her tuna sandwich in the fridge again.",
        2: "Hold on... *taps keys loudly* ...No. Computer still says no.",
        3: "*COUGH*",
        4: "I'll need to see your pink slip, your brown slip, and a signed letter from your grandmother. Until then, no."
      };

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            response: demoResponses[currentState] || "No.",
            state: currentState,
            screenShake: currentState === 3
          });
        }, 800);
      });
    }

    // Special handling for initial contact (no message provided)
    if (!message) {
      return {
        response: "What do YOU want",
        state: 1,
        screenShake: false
      };
    }

    // STATE 3 OVERRIDE: Hardcoded cough
    if (currentState === 3) {
      return {
        response: "*COUGH*",
        state: 3,
        screenShake: true
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