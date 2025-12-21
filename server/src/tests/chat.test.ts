import { describe, it, expect, beforeAll, afterAll, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';
import prisma from '../db.js';

// Mock the gemini service
vi.mock('../services/gemini.js', () => ({
  generateResponse: vi.fn(),
}));

import { generateResponse } from '../services/gemini.js';

describe('POST /api/chat', () => {
  beforeEach(async () => {
    // Reset mocks and database before each test to ensure isolation
    vi.mocked(generateResponse).mockReset();
    await prisma.session.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new session and call Gemini with the correct prompt for state 1', async () => {
    const mockResponse = "Computer says no... Mocked.";
    vi.mocked(generateResponse).mockResolvedValue(mockResponse);
    
    const userMessage = 'Hello, I need assistance.';
    const response = await request(app)
      .post('/api/chat')
      .send({ message: userMessage });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('sessionId');
    expect(generateResponse).toHaveBeenCalledWith(expect.stringContaining(userMessage));
    expect(response.body.response).toBe(mockResponse);
  });

  it('should use an existing session and advance the state', async () => {
    const mockResponse1 = "State 1 response";
    const mockResponse2 = "State 2 response";
    vi.mocked(generateResponse).mockResolvedValueOnce(mockResponse1).mockResolvedValueOnce(mockResponse2);

    // First request
    const firstResponse = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello again' });

    const sessionId = firstResponse.body.sessionId;
    expect(firstResponse.body.response).toBe(mockResponse1);

    // Second request
    const secondResponse = await request(app)
      .post('/api/chat')
      .send({ sessionId, message: 'Are you sure?' });

    expect(secondResponse.status).toBe(200);
    expect(secondResponse.body.sessionId).toBe(sessionId);
    expect(secondResponse.body.response).toBe(mockResponse2);
    expect(generateResponse).toHaveBeenCalledTimes(2);
  });

  it('should cycle through all 4 states and loop back to state 1', async () => {
    vi.mocked(generateResponse).mockResolvedValue("Mocked response");

    // Request 1: Starts at state 1, moves to state 2
    const res1 = await request(app).post('/api/chat').send({ message: 'Hello' });
    const sessionId = res1.body.sessionId;
    const session1 = await prisma.session.findUnique({ where: { id: sessionId } });
    expect(session1?.state).toBe(2);

    // Request 2: Starts at state 2, moves to state 3
    await request(app).post('/api/chat').send({ sessionId, message: '...' });
    const session2 = await prisma.session.findUnique({ where: { id: sessionId } });
    expect(session2?.state).toBe(3);

    // Request 3: Starts at state 3, moves to state 4
    await request(app).post('/api/chat').send({ sessionId, message: '...' });
    const session3 = await prisma.session.findUnique({ where: { id: sessionId } });
    expect(session3?.state).toBe(4);

    // Request 4: Starts at state 4, moves to state 1
    await request(app).post('/api/chat').send({ sessionId, message: '...' });
    const session4 = await prisma.session.findUnique({ where: { id: sessionId } });
    expect(session4?.state).toBe(1);

    // Request 5: Starts at state 1 again, moves to state 2
    await request(app).post('/api/chat').send({ sessionId, message: '...' });
    const session5 = await prisma.session.findUnique({ where: { id: sessionId } });
    expect(session5?.state).toBe(2);
  });
});