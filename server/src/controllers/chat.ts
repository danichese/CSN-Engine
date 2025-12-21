import type { Request, Response } from 'express';
import prisma from '../db.js';
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
    let session;

    if (sessionId) {
      session = await prisma.session.findUnique({ where: { id: sessionId } });
    }

    if (!session) {
      session = await prisma.session.create({ data: {} });
    }

    const currentState = session.state;
    // Combine the state-specific instruction with the user's actual message
    const promptForLLM = `${statePrompts[currentState - 1]} The user's message is: "${message}"`;
    
    const responseText = await generateResponse(promptForLLM);

    // Advance state, looping back to 1 after 4
    const nextState = currentState >= 4 ? 1 : currentState + 1;

    const updatedSession = await prisma.session.update({
      where: { id: session.id },
      data: { state: nextState },
    });

    res.json({
      sessionId: updatedSession.id,
      response: responseText,
    });
  } catch (error) {
    console.error("Error in chat handler:", error);
    res.status(500).json({ error: "An internal error occurred. Please try again later... or don't. It's all the same." });
  }
};