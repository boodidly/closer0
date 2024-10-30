export class MateTerminal {
  constructor() {
    this.activeTerminal = null;
    this.defaultProfile = 'Default';
  }

  open(options = {}) {
    const args = this._buildArgs(options);
    
    try {
      // If there's an active terminal, close it first
      if (this.activeTerminal) {
        this.activeTerminal.kill();
      }

      // Create new terminal process
      this.activeTerminal = window.electron.spawn('mate-terminal', args);
      return this.activeTerminal;
    } catch (error) {
      console.error('Failed to open mate-terminal:', error.message);
      throw error;
    }
  }

  _buildArgs(options) {
    const args = [];

    if (options.title) {
      args.push('--title', options.title);
    }

    if (options.command) {
      args.push('-e', options.command);
    }

    if (options.workingDirectory) {
      args.push('--working-directory', options.workingDirectory);
    }

    if (options.profile) {
      args.push('--profile', options.profile);
    }

    if (options.geometry) {
      args.push('--geometry', options.geometry);
    }

    if (options.zoom) {
      args.push('--zoom', options.zoom.toString());
    }

    if (options.fullscreen) {
      args.push('--full-screen');
    }

    if (options.maximize) {
      args.push('--maximize');
    }

    return args;
  }

  // Helper methods
  openWithCommand(command) {
    return this.open({ 
      command,
      title: `Ruby OS: ${command}`,
      workingDirectory: process.cwd()
    });
  }

  openInDirectory(directory) {
    return this.open({ 
      workingDirectory: directory,
      title: `Ruby OS: ${directory}`
    });
  }

  openFullscreen(command = null) {
    return this.open({ 
      command,
      fullscreen: true,
      title: command ? `Ruby OS: ${command}` : 'Ruby OS Terminal'
    });
  }
}