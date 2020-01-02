const {spawn} = require('child_process');

class MPlayer {
  constructor() {
    const args = ['-idle', '-slave'];
    const instance = spawn('mplayer', args);
    this.instance = instance;
  }

  setSource(source) {
    this._cmd(`loadfile ${source}`);
  }

  stop() {
    this._cmd('stop');
  }

  _cmd(command) {
    this.instance.stdin.write(command + '\n');
  }
}

module.exports = MPlayer;
