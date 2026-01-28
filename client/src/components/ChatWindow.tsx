import React, { useState, useEffect, useRef } from 'react';
import { RefusalEngine } from '../services/engine';
import type { ChatResponse } from '../services/engine';
import { getStoredRefusalState, setStoredRefusalState, getStoredChatHistory, setStoredChatHistory } from '../services/storage';
import type { Message } from '../services/storage';

interface ChatWindowProps {
  apiKey: string;
  onCough: (active: boolean) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ apiKey, onCough }) => {
  const [messages, setMessages] = useState<Message[]>(() => 
    getStoredChatHistory() || [{ sender: 'clerk', text: 'What do YOU want' }]
  );
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [engine] = useState(() => new RefusalEngine(apiKey));
  const [state, setState] = useState(() => getStoredRefusalState());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStoredChatHistory(messages);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response: ChatResponse = await engine.generateResponse(userMessage, state);
      
      if (response.screenShake) {
        onCough(true);
        setTimeout(() => onCough(false), 500);
      }

      setMessages(prev => [...prev, { sender: 'clerk', text: response.response }]);
      
      const nextState = engine.getNextState(state);
      setState(nextState);
      setStoredRefusalState(nextState);
    } catch (error: any) {
      console.error("Detailed Chat Error:", error);
      // Attempt to extract as much info as possible from the Google SDK error
      const errorMsg = error?.message || "Unknown error";
      const status = error?.status || "No status";
      setMessages(prev => [...prev, { 
        sender: 'clerk', 
        text: `Computer says no. [Error: ${errorMsg}] [Status: ${status}]. Please check if Gemini API is enabled in your Google Cloud Project.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusMessage = () => {
    switch (state) {
      case 1: return "Clerk is staring blankly...";
      case 2: return "Clerk is checking the computer... (Rigggggghtt...)";
      case 3: return "Clerk is preparing a big cough...";
      case 4: return "Clerk is sighing audibly...";
      default: return "Clerk is ignoring you...";
    }
  };

  return (
    <div className="space-y-4">
      <div 
        ref={scrollRef}
        className="win-inset h-80 overflow-y-auto p-2 text-sm space-y-2"
      >
        <div className="text-blue-800 font-bold mb-2">*** SYSTEM READY ***</div>
        {messages.map((msg, i) => (
          <div key={i} className={`${msg.sender === 'user' ? 'text-right' : ''}`}>
            <span className="font-bold">{msg.sender === 'clerk' ? 'Clerk: ' : 'You: '}</span>
            <span className={msg.sender === 'clerk' ? 'bg-gray-100 p-1 border border-gray-300 inline-block' : ''}>
              {msg.text}
            </span>
          </div>
        ))}
        {isLoading && <div className="italic text-gray-500">{getStatusMessage()}</div>}
      </div>
      
      <div className="flex gap-2">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="win-inset flex-1 px-2 py-1 outline-none text-sm"
          placeholder="Enter your request..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="win-outset bg-win-gray px-4 py-1 text-sm font-bold active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
