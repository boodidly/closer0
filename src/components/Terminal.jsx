import React, { useEffect, useRef } from 'react';
import { MateTerminal } from '../mate-terminal';

function Terminal() {
  const terminalRef = useRef(null);
  const terminalInstance = useRef(null);

  useEffect(() => {
    if (!terminalInstance.current && window.electron) {
      terminalInstance.current = new MateTerminal();
      window.terminal = terminalInstance.current;
      
      terminalInstance.current.open({
        title: 'Ruby OS Terminal',
        workingDirectory: process.cwd(),
        geometry: '120x30',
        zoom: 1.0
      });
    }

    return () => {
      window.terminal = null;
    };
  }, []);

  return (
    <div className="flex-1 bg-[#1a1a1a] p-4">
      <div 
        ref={terminalRef}
        className="w-full h-full rounded-lg border border-[#2a2a2a] bg-[#141414]"
      />
    </div>
  );
}

export default Terminal;