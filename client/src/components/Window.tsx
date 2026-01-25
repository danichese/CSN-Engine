import React from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  width?: string;
}

const Window: React.FC<WindowProps> = ({ title, children, width = "max-w-2xl" }) => {
  return (
    <div className={`win-outset bg-win-gray p-1 ${width} w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
      <div className="win-titlebar flex justify-between items-center px-2 py-1 mb-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white flex items-center justify-center border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-2 h-2 bg-win-blue"></div>
          </div>
          <span className="text-white font-bold text-sm tracking-wide">{title}</span>
        </div>
        <div className="flex gap-1">
          <button className="win-outset bg-win-gray w-4 h-4 text-[10px] flex items-center justify-center font-bold leading-none pb-1">_</button>
          <button className="win-outset bg-win-gray w-4 h-4 text-[10px] flex items-center justify-center font-bold leading-none">X</button>
        </div>
      </div>
      <div className="p-2">
        {children}
      </div>
    </div>
  );
};

export default Window;
