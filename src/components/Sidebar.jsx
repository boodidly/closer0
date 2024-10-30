import React, { useState } from 'react';
import { VscMail, VscTerminalCmd, VscPulse, VscAdd, VscGear, VscTrash } from 'react-icons/vsc';

function Sidebar() {
  const [commands, setCommands] = useState([
    { id: 1, name: 'Mail', icon: <VscMail />, command: 'thunderbird' },
    { id: 2, name: 'Terminal', icon: <VscTerminalCmd />, command: 'mate-terminal' },
    { id: 3, name: 'System Monitor', icon: <VscPulse />, command: 'gnome-system-monitor' },
    { id: 4, name: 'Top', icon: <VscTerminalCmd />, command: 'top' },
    { id: 5, name: 'Htop', icon: <VscTerminalCmd />, command: 'htop' },
  ]);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [isAddingCommand, setIsAddingCommand] = useState(false);
  const [newCommand, setNewCommand] = useState({ name: '', command: '' });
  const [accentColor, setAccentColor] = useState('#ff2d70');

  const executeCommand = (command) => {
    if (window.terminal) {
      window.terminal.openWithCommand(command);
    }
  };

  const handleRemove = (id) => {
    setCommands(commands.filter(cmd => cmd.id !== id));
  };

  const handleAdd = () => {
    if (newCommand.name && newCommand.command) {
      setCommands([...commands, {
        id: Date.now(),
        name: newCommand.name,
        icon: <VscTerminalCmd />,
        command: newCommand.command
      }]);
      setNewCommand({ name: '', command: '' });
      setIsAddingCommand(false);
    }
  };

  const handleColorChange = (color) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--accent-color', color);
  };

  return (
    <div className="w-64 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col">
      <div className="p-4 border-b border-[#2a2a2a]">
        <h1 className="text-[#ff2d70] text-xl font-bold flex items-center gap-2">
          <VscTerminalCmd /> Ruby OS
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {commands.map((item) => (
          <button
            key={item.id}
            onClick={() => isRemoveMode ? handleRemove(item.id) : executeCommand(item.command)}
            className={`w-full p-4 flex items-center gap-3 text-gray-300 hover:bg-[#2a2a2a] transition-colors button-glow
              ${isRemoveMode ? 'text-red-500 hover:text-red-400' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {isAddingCommand && (
        <div className="p-4 border-t border-[#2a2a2a]">
          <input
            type="text"
            placeholder="Command name"
            value={newCommand.name}
            onChange={(e) => setNewCommand({ ...newCommand, name: e.target.value })}
            className="w-full mb-2 p-2 bg-[#2a2a2a] rounded text-white"
          />
          <input
            type="text"
            placeholder="Command"
            value={newCommand.command}
            onChange={(e) => setNewCommand({ ...newCommand, command: e.target.value })}
            className="w-full mb-2 p-2 bg-[#2a2a2a] rounded text-white"
          />
          <button
            onClick={handleAdd}
            className="w-full p-2 bg-[#ff2d70] text-white rounded hover:bg-[#ff1a5c]"
          >
            Add Command
          </button>
        </div>
      )}

      <div className="border-t border-[#2a2a2a] p-2 flex justify-around">
        <button
          onClick={() => setIsAddingCommand(!isAddingCommand)}
          className="p-2 text-gray-300 hover:text-[#ff2d70] button-glow"
          title="Add Command"
        >
          <VscAdd size={20} />
        </button>
        <button
          onClick={() => {
            const color = prompt('Enter accent color (hex):', accentColor);
            if (color) handleColorChange(color);
          }}
          className="p-2 text-gray-300 hover:text-[#ff2d70] button-glow"
          title="Settings"
        >
          <VscGear size={20} />
        </button>
        <button
          onClick={() => setIsRemoveMode(!isRemoveMode)}
          className={`p-2 ${isRemoveMode ? 'text-red-500' : 'text-gray-300 hover:text-[#ff2d70]'} button-glow`}
          title="Remove Commands"
        >
          <VscTrash size={20} />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;