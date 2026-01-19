import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001/api/chat';
const INITIAL_GREETING = 'What do YOU want';

const COUGH_PATTERN = /\*?cough\*?/i;

type ChatMessage = {
  id: string;
  author: 'user' | 'bot';
  text: string;
};

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'greeting', author: 'bot', text: INITIAL_GREETING },
  ]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [shakeScreen, setShakeScreen] = useState(false);

  useEffect(() => {
    if (!shakeScreen) return;

    const timeout = window.setTimeout(() => setShakeScreen(false), 600);
    return () => window.clearTimeout(timeout);
  }, [shakeScreen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isSending) return;

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      author: 'user',
      text: trimmedInput,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput, sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data: { response: string; sessionId: string } = await response.json();
      setSessionId(data.sessionId);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        author: 'bot',
        text: data.response,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      if (COUGH_PATTERN.test(data.response)) {
        setShakeScreen(true);
      }
    } catch (error) {
      const fallbackMessage: ChatMessage = {
        id: `bot-error-${Date.now()}`,
        author: 'bot',
        text: "The system's having a wobble. Try again, or don't.",
      };

      setMessages((prevMessages) => [...prevMessages, fallbackMessage]);
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="app-shell">
      <div className={`window ${shakeScreen ? 'window--shake' : ''}`}>
        <header className="title-bar">
          <span className="title-bar__icon" aria-hidden="true">
            ◎
          </span>
          <h1 className="title-bar__text">Computer Says No</h1>
          <div className="title-bar__controls" aria-hidden="true">
            <span className="title-bar__button">_</span>
            <span className="title-bar__button">□</span>
            <span className="title-bar__button">✕</span>
          </div>
        </header>

        <section className="window__body">
          <div className="chat-window">
            {messages.map((message) => (
              <div key={message.id} className={`message message--${message.author}`}>
                <span className="message__label">
                  {message.author === 'bot' ? 'Clerk' : 'You'}:
                </span>
                <p className="message__text">{message.text}</p>
              </div>
            ))}
          </div>

          <form className="composer" onSubmit={handleSubmit}>
            <label className="composer__label" htmlFor="message">
              Request:
            </label>
            <input
              id="message"
              className="composer__input"
              placeholder="Type your request..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isSending}
            />
            <button className="composer__button" type="submit" disabled={isSending}>
              {isSending ? 'Checking...' : 'Ask'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default App;
