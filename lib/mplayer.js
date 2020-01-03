const {spawn} = require('child_process');

class MPlayer {
  constructor() {
    const args = ['-idle', '-slave'];
    const instance = spawn('mplayer', args);
    instance.stderr.on('data', data => {
      console.error(`>>>> instance stderr:\n${data}>>>> ENDS`);
    });
    instance.stdout.on('data', data => {
      console.log(`instance stdout: ${data}`);
    });

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
