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
    expect(generateResponse).toHaveBeenCalledWith(expect.stringContaining(userMessage));
    expect(response.body.response).toBe(mockResponse);
  });

  // Note: State transition tests are temporarily disabled until In-Memory state is implemented in the next task.
});