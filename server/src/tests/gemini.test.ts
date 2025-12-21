import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockGenerateContent, mockGetGenerativeModel } = vi.hoisted(() => {
  const mockGenerateContent = vi.fn();
  return {
    mockGenerateContent,
    mockGetGenerativeModel: vi.fn(() => ({
      generateContent: mockGenerateContent,
    })),
  };
});

vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(function () {
      return {
        getGenerativeModel: mockGetGenerativeModel,
      };
    }),
  };
});

import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateResponse } from '../services/gemini.js';

describe('Gemini Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call Gemini API with correct system prompt and user prompt', async () => {
    const mockResponseText = "Mocked unhelpful response.";
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => mockResponseText,
      },
    });

    const userPrompt = "I want a refund.";
    const result = await generateResponse(userPrompt);

    expect(result).toBe(mockResponseText);
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.arrayContaining([
      expect.stringContaining("Carol"), // part of system prompt
      userPrompt
    ]));
  });

  it('should return a fallback message when Gemini API fails', async () => {
    mockGenerateContent.mockRejectedValue(new Error("API Error"));

    const result = await generateResponse("Fail me.");
    expect(result).toContain("Please wait indefinitely.");
  });
});
