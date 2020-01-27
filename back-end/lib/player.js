const {spawn} = require('child_process');
const readline = require('readline');

class Player {
  constructor() {
    const initialVolume = 100;
    this._volumeIncrement = 2;

    const initialArgs = ['-idle', '-slave', '-volume', initialVolume];
    this.instance = spawn('mplayer', initialArgs);
    this._setStatus({isPlaying: false, volume: initialVolume});

    this._stdout = readline.createInterface({input: this.instance.stdout});
    this._stdout.on('line', line => this._onOutput(line));

    this._stderr = readline.createInterface({input: this.instance.stderr});
    this._stderr.on('line', line => this._onOutput(line));
  }

  playStation(station) {
    this._cmd(`loadfile ${station.stream}`);
    this._setStatus({isPlaying: true, source: {station}});
  }

  stop() {
    this._cmd('stop');
    this._setStatus({isPlaying: false});
  }

  decreaseVolume() {
    this.setVolume(this._status.volume - this._volumeIncrement);
  }

  increaseVolume() {
    this.setVolume(this._status.volume + this._volumeIncrement);
  }

  setVolume(level) {
    const newVolume = Math.min(Math.max(level, 0), 100);
    this._cmd(`volume ${level} 1`);
    this._setStatus({volume: newVolume});
  }

  getStatus() {
    return this._status;
  }

  _onOutput(line) {
    console.log(line);
  }

  _setStatus(update) {
    this._status = {...this._status, ...update};
  }

  _cmd(command) {
    this.instance.stdin.write(command + '\n');
  }
}

module.exports = Player;
