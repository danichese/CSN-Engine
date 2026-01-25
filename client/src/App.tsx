import { useState, useEffect } from 'react';
import Window from './components/Window';
import ApiKeyModal from './components/ApiKeyModal';
import { getStoredApiKey, setStoredApiKey } from './services/storage';

function App() {
  const [apiKey, setApiKey] = useState<string | null>(getStoredApiKey());
  const [isCoughing, setIsCoughing] = useState(false);

  const handleSaveApiKey = (key: string) => {
    setStoredApiKey(key);
    setApiKey(key);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {!apiKey && <ApiKeyModal onSave={handleSaveApiKey} />}
      
      <Window title="CSN_Engine_v1.0.exe" width="max-w-xl">
        <div className={`space-y-4 transition-transform duration-100 ${isCoughing ? 'translate-x-1 translate-y-1' : ''}`}>
          <div className="win-inset h-80 overflow-y-auto p-2 text-sm">
            <div className="text-blue-800 font-bold mb-2">*** SYSTEM READY ***</div>
            <div className="bg-gray-100 p-2 border border-gray-300 mb-2">
              <span className="font-bold">Clerk:</span> What do YOU want
            </div>
          </div>
          
          <div className="flex gap-2">
            <input 
              type="text" 
              className="win-inset flex-1 px-2 py-1 outline-none text-sm"
              placeholder="Enter your request..."
            />
            <button className="win-outset bg-win-gray px-4 py-1 text-sm font-bold active:translate-x-[1px] active:translate-y-[1px]">
              Send
            </button>
          </div>
        </div>
      </Window>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-win-gray win-outset border-t-2 flex items-center px-1 gap-2">
        <button className="win-outset bg-win-gray h-8 px-2 flex items-center gap-1 font-bold italic active:translate-x-[1px] active:translate-y-[1px]">
          <div className="w-4 h-4 bg-win-blue"></div>
          Start
        </button>
        <div className="win-inset flex-1 h-8"></div>
        <div className="win-inset h-8 px-4 flex items-center text-sm">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export default App;
