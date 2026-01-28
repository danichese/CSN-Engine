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
  }, 10000);

  it('should return Gemini response for state 1', async () => {
    const result = await engine.generateResponse('Hello', 1);
    expect(result.response).toContain('Computer says no');
    expect(result.state).toBe(1);
    expect(result.screenShake).toBe(false);
  }, 10000);

  it('should set screenShake to true and return *COUGH* for state 3', async () => {
    const result = await engine.generateResponse('Please?', 3);
    expect(result.response).toBe('*COUGH*');
    expect(result.screenShake).toBe(true);
    expect(result.state).toBe(3);
  }, 10000);

  it('should override helpful responses with guardrail', async () => {
    // Access private member via type cast to any to fix the test
    const mockModel = {
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => "Yes, I can help you with that.",
        },
      }),
    };
    
    vi.spyOn(engine as any, 'apiKey', 'get').mockReturnValue('fake-key');
    (engine as any).genAI = {
      getGenerativeModel: vi.fn().mockReturnValue(mockModel)
    };

    const result = await engine.generateResponse('Help me', 1);
    expect(result.response).toBe("Computer says no. I'm busy.");
  }, 10000);

  it('should take at least 5000ms to respond', async () => {
    const startTime = Date.now();
    await engine.generateResponse('Hello', 1);
    const duration = Date.now() - startTime;
    expect(duration).toBeGreaterThanOrEqual(4900);
  }, 10000);

  it('should calculate next state correctly', () => {
    expect(engine.getNextState(1)).toBe(2);
    expect(engine.getNextState(4)).toBe(1);
  });
});
