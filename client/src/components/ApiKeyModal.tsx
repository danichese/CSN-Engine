import React, { useState } from 'react';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-black p-4 w-full max-w-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-[#000080] text-white px-2 py-1 mb-4 flex justify-between items-center font-bold">
          <span>Setup</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-black">Please enter your Google Gemini API Key to continue. It will be stored locally in your browser.</p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="AIza..."
            className="w-full bg-white border-t-2 border-l-2 border-[#808080] border-r-2 border-b-2 border-white px-2 py-1 outline-none"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onSave('demo')}
              className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-black px-4 py-1 active:translate-x-[1px] active:translate-y-[1px] text-sm"
            >
              Try Demo
            </button>
            <button
              type="submit"
              className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-black px-6 py-1 active:translate-x-[1px] active:translate-y-[1px] font-bold"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;
