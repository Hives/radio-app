const {spawn} = require('child_process');
const readline = require('readline');

class Player {
  constructor() {
    const initialArgs = ['-idle', '-slave'];
    this.instance = spawn('mplayer', initialArgs);
    this._setStatus({isPlaying: false});

    this._stdout = readline.createInterface({input: this.instance.stdout});
    this._stdout.on('line', line => this._onStdOut(line));

    this._stderr = readline.createInterface({input: this.instance.stderr});
    this._stderr.on('line', line => this._onStdErr(line));
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
    this._cmd('volume -1');
  }

  increaseVolume() {
    this._cmd('volume 1');
  }

  _onStdOut(line) {
    console.log(line);

    if (line.includes('Volume')) {
      this._setStatus({volume: line.split(' ')[1]});
    }
  }

  _onStdErr(line) {
    console.error(`>>>> instance stderr:\n${line}\n>>>> ENDS`);
  }

  _setStatus(status) {
    this.status = {...this.status, ...status};
  }

  _cmd(command) {
    this.instance.stdin.write(command + '\n');
  }
}

module.exports = Player;
