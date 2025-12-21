import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

global.fetch = vi.fn();

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe('App', () => {
  it('renders message from backend', async () => {
    // @ts-ignore
    fetch.mockResolvedValue(createFetchResponse({ message: 'Computer Says No Engine API' }));

    render(<App />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Computer Says No Engine API/i)).toBeInTheDocument();
    });
  });
});