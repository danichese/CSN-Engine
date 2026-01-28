import { useState } from 'react';
import Window from './components/Window';
import ApiKeyModal from './components/ApiKeyModal';
import ChatWindow from './components/ChatWindow';
import { getStoredApiKey, setStoredApiKey } from './services/storage';

function App() {
  const [apiKey] = useState<string | null>('demo');
  const [isCoughing, setIsCoughing] = useState(false);

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      
      <Window title="CSN_Engine_v1.0.exe" width="max-w-xl">
        <div className={`transition-transform duration-100 ${isCoughing ? 'translate-x-1 translate-y-1 rotate-1' : ''}`}>
          <ChatWindow apiKey={apiKey} onCough={setIsCoughing} />
        </div>
      </Window>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-win-gray win-outset border-t-2 flex items-center px-1 gap-2">
        <button 
          onClick={handleReset}
          className="win-outset bg-win-gray h-8 px-2 flex items-center gap-1 font-bold italic active:translate-x-[1px] active:translate-y-[1px]"
        >
          <div className="w-4 h-4 bg-win-blue"></div>
          Start
        </button>
        <div className="win-inset flex-1 h-8 px-2 flex items-center">
          {apiKey === 'demo' && <span className="text-xs font-bold text-red-700 animate-pulse">DEMO MODE</span>}
        </div>
        <div className="win-inset h-8 px-4 flex items-center text-sm">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export default App;