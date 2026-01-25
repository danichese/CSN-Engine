import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import '@testing-library/jest-dom';

describe('App', () => {
  it('renders the API Key setup modal by default', () => {
    render(<App />);
    
    // Check for the "Setup" title in the modal
    expect(screen.getByText(/Setup/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter your Google Gemini API Key/i)).toBeInTheDocument();
  });

  it('renders the main window title', () => {
    render(<App />);
    expect(screen.getByText(/CSN_Engine_v1.0.exe/i)).toBeInTheDocument();
  });
});
