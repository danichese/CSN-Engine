import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

global.fetch = vi.fn();

const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>;

describe('App', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders the retro window with the greeting', () => {
    render(<App />);

    expect(screen.getByText('Computer Says No')).toBeInTheDocument();
    expect(screen.getByText('What do YOU want')).toBeInTheDocument();
    expect(screen.getByLabelText('Request:')).toBeInTheDocument();
  });

  it('sends a message and renders the response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'Computer says no.', sessionId: 'session-1' }),
    });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Type your request...'), {
      target: { value: 'Can you help me?' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Ask' }));

    expect(await screen.findByText('Can you help me?')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Computer says no.')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/chat',
      expect.objectContaining({ method: 'POST' })
    );
  });
});
