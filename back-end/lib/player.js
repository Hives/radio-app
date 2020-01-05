const {spawn} = require('child_process');

class Player {
  constructor() {
    const initialArgs = ['-idle', '-slave'];
    this.instance = spawn('mplayer', initialArgs);
    this.instance.stderr.on('data', data => this._onStdErr(data));
    this.instance.stdout.on('data', data => this._onStdOut(data));
    this._setStatus({isPlaying: false});
  }

  playStation(station) {
    this._cmd(`loadfile ${station.stream}`);
    this._setStatus({isPlaying: true, source: {station}});
  }

  stop() {
    this._cmd('stop');
    this._setStatus({isPlaying: false});
  }

  _onStdOut(data) {
    console.log(`instance stdout: ${data}`);
  }

  _onStdErr(data) {
    console.error(`>>>> instance stderr:\n${data}>>>> ENDS`);
  }

  _setStatus(status) {
    this.status = {...status};
  }

  _cmd(command) {
    this.instance.stdin.write(command + '\n');
  }
}

module.exports = Player;
