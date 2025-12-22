import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';

// Mock the gemini service
vi.mock('../services/gemini.js', () => ({
  generateResponse: vi.fn(),
}));

import { generateResponse } from '../services/gemini.js';

describe('POST /api/chat', () => {
  beforeEach(async () => {
    // Reset mocks before each test
    vi.mocked(generateResponse).mockReset();
  });

  it('should create a new session and call Gemini with the correct prompt', async () => {
    const mockResponse = "Computer says no... Mocked.";
    vi.mocked(generateResponse).mockResolvedValue(mockResponse);
    
    const userMessage = 'Hello, I need assistance.';
    const response = await request(app)
      .post('/api/chat')
      .send({ message: userMessage });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('sessionId');
    expect(response.body).toHaveProperty('state');
    expect(generateResponse).toHaveBeenCalledWith(expect.stringContaining(userMessage));
    expect(response.body.response).toBe(mockResponse);
  });

  it('should return "What do YOU want" on first contact (empty prompt)', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({}); // No message

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('sessionId');
    expect(response.body).toHaveProperty('state');
    expect(response.body.state).toBe(1);
    expect(response.body.response).toBe("What do YOU want");
    // Ensure Gemini was NOT called for this initial greeting
    expect(generateResponse).not.toHaveBeenCalled();
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
    expect(generateResponse).toHaveBeenLastCalledWith(expect.stringContaining("user has initiated contact"));

    // Second request
    const secondResponse = await request(app)
      .post('/api/chat')
      .send({ sessionId, message: 'Are you sure?' });

    expect(secondResponse.status).toBe(200);
    expect(secondResponse.body.sessionId).toBe(sessionId);
    expect(secondResponse.body.response).toBe(mockResponse2);
    expect(generateResponse).toHaveBeenCalledTimes(2);
    expect(generateResponse).toHaveBeenLastCalledWith(expect.stringContaining("user is persisting"));
  });

  it('should cycle through all 4 states and loop back to state 1', async () => {
    vi.mocked(generateResponse).mockResolvedValue("Mocked response");

    // Request 1: Starts at state 1, moves to state 2
    const res1 = await request(app).post('/api/chat').send({ message: 'Hello' });
    const sessionId = res1.body.sessionId;
    expect(generateResponse).toHaveBeenLastCalledWith(expect.stringContaining("initiated contact"));
    
    // Request 2: Starts at state 2, moves to state 3
    const res2 = await request(app).post('/api/chat').send({ sessionId, message: '...' });
    expect(res2.body.state).toBe(2);
    expect(res2.body.screenShake).toBe(false);
    expect(generateResponse).toHaveBeenLastCalledWith(expect.stringContaining("persisting"));
    
    // Request 3: Starts at state 3, moves to state 4
    const res3 = await request(app).post('/api/chat').send({ sessionId, message: '...' });
    expect(res3.body.state).toBe(3);
    expect(res3.body.screenShake).toBe(true);
    expect(generateResponse).toHaveBeenLastCalledWith(expect.stringContaining("passive-aggressive cough"));
    
    // Request 4: Starts at state 4, moves to state 1
    const res4 = await request(app).post('/api/chat').send({ sessionId, message: '...' });
    expect(res4.body.state).toBe(4);
    expect(res4.body.screenShake).toBe(false);
    expect(generateResponse).toHaveBeenLastCalledWith(expect.stringContaining("false hope"));

    // Request 5: Starts at state 1 again
    await request(app).post('/api/chat').send({ sessionId, message: '...' });
    expect(generateResponse).toHaveBeenLastCalledWith(expect.stringContaining("initiated contact"));

    expect(generateResponse).toHaveBeenCalledTimes(5);
  });
});