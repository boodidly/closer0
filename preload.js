const { contextBridge, ipcRenderer } = require('electron');
const { spawn } = require('child_process');

contextBridge.exposeInMainWorld('electron', {
  spawn: (command, args) => {
    return spawn(command, args, {
      stdio: 'inherit',
      shell: true
    });
  }
});