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
    <div className="min-h-screen bg-[#008080] flex flex-col items-center justify-center p-4">
      {/* Desktop Icons */}
      <div className="fixed top-4 left-4 flex flex-col gap-6">
        <div className="flex flex-col items-center w-16 group cursor-pointer">
          <div className="w-8 h-8 bg-win-gray win-outset mb-1 flex items-center justify-center text-[10px] font-bold">My PC</div>
          <span className="text-white text-[10px] bg-black px-1">My Computer</span>
        </div>
        <div className="flex flex-col items-center w-16 group cursor-pointer">
          <div className="w-8 h-8 bg-win-gray win-outset mb-1 flex items-center justify-center text-[10px] font-bold">Bin</div>
          <span className="text-white text-[10px]">Recycle Bin</span>
        </div>
        <div className="flex flex-col items-center w-16 group cursor-pointer">
          <div className="w-8 h-8 bg-win-gray win-outset mb-1 flex items-center justify-center text-[10px] font-bold">IE</div>
          <span className="text-white text-[10px]">Netscape</span>
        </div>
      </div>

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
          Restart
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