import { Request, Response } from 'express';
import prisma from '../db.js';

const stateResponses = [
  "Computer says no... (I heard Brenda from accounts is leaving, by the way)",
  "Rigggggghtt, I'm checking... it says no.",
  "*COUGH*",
  "Okay, fine. What's your mother's maiden name? ... Doesn't matter. Still no."
];

export const handleChat = async (req: Request, res: Response) => {
  const { sessionId } = req.body;

  let session;

  if (sessionId) {
    session = await prisma.session.findUnique({ where: { id: sessionId } });
  }

  if (!session) {
    session = await prisma.session.create({ data: {} });
  }

  const currentState = session.state;
  const responseText = stateResponses[currentState - 1] || "Computer says no.";
  
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
};
