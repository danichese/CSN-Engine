import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RefusalEngine } from './engine';

// Mock the GoogleGenerativeAI SDK
vi.mock('@google/generative-ai', () => {
  const GoogleGenerativeAI = vi.fn().mockImplementation(function() {
    return {
      getGenerativeModel: vi.fn().mockReturnValue({
        generateContent: vi.fn().mockResolvedValue({
          response: {
            text: () => "Computer says no. I'm busy watching Janet eat her yogurt.",
          },
        }),
      }),
    };
  });
  return { GoogleGenerativeAI };
});

describe('RefusalEngine', () => {
  let engine: RefusalEngine;

  beforeEach(() => {
    engine = new RefusalEngine('fake-api-key');
  });

  it('should return "What do YOU want" for empty message', async () => {
    const result = await engine.generateResponse('', 1);
    expect(result.response).toBe('What do YOU want');
    expect(result.state).toBe(1);
    expect(result.screenShake).toBe(false);
  });

  it('should return Gemini response for state 1', async () => {
    const result = await engine.generateResponse('Hello', 1);
    expect(result.response).toContain('Computer says no');
    expect(result.state).toBe(1);
    expect(result.screenShake).toBe(false);
  });

  it('should set screenShake to true for state 3', async () => {
    const result = await engine.generateResponse('Please?', 3);
    expect(result.screenShake).toBe(true);
    expect(result.state).toBe(3);
  });

  it('should calculate next state correctly', () => {
    expect(engine.getNextState(1)).toBe(2);
    expect(engine.getNextState(4)).toBe(1);
  });
});
