import type { Request, Response } from 'express';
import { generateResponse } from '../services/gemini.js';

// Specific prompts for each state, to be sent to the LLM
const statePrompts = [
  "The user has initiated contact. Give them a blunt, unhelpful refusal that includes some irrelevant office gossip.", // State 1
  "The user is persisting. Pretend to check something while sighing, then refuse again.", // State 2
  "The user is still here. Just respond with a single, passive-aggressive cough.", // State 3
  "The user won't give up. Give them some false hope by asking 2-3 completely random, nonsensical bureaucratic questions before ultimately refusing them again.", // State 4
];

export const handleChat = async (req: Request, res: Response) => {
  const { sessionId, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    // TODO: Implement In-Memory State in the next task
    const currentState = 1;
    const responseText = await generateResponse(`${statePrompts[currentState - 1]} The user's message is: "${message}"`);

    res.json({
      sessionId: sessionId || "temp-id",
      response: responseText,
    });
  } catch (error) {
    console.error("Error in chat handler:", error);
    res.status(500).json({ error: "An internal error occurred. Please try again later... or don't. It's all the same." });
  }
};