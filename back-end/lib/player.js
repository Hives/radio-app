const { spawn, exec } = require("child_process");
const readline = require("readline");

const INITIAL_VOLUME = 20;
const MIN_VOLUME = 0;
const MAX_VOLUME = 100;
const VOLUME_INCREMENT = 1;
const SIMPLE_MIXER_CONTROL = "Master";

class Player {
  constructor() {
    const initialArgs = ["-idle", "-slave", "-cache", "1024"];
    this.instance = spawn("mplayer", initialArgs);

    this._stdout = readline.createInterface({ input: this.instance.stdout });
    this._stdout.on("line", line => this._onOutput(line));

    this._stderr = readline.createInterface({ input: this.instance.stderr });
    this._stderr.on("line", line => this._onOutput(line));

    this.setVolume(INITIAL_VOLUME);
    this._setStatus({ isPlaying: false, volume: INITIAL_VOLUME });
  }

  getStatus() {
    return this._status;
  }

  playStation(station) {
    this._cmd(`loadfile ${station.stream}`);
    this._setStatus({ isPlaying: true, source: { station } });
  }

  stop() {
    this._cmd("stop");
    this._setStatus({ isPlaying: false });
  }

  decreaseVolume() {
    this.setVolume(this._status.volume - VOLUME_INCREMENT);
  }

  increaseVolume() {
    this.setVolume(this._status.volume + VOLUME_INCREMENT);
  }

  setVolume(level) {
    const newVolume = this._volumeInRange(level);
    exec(`amixer set ${SIMPLE_MIXER_CONTROL} ${newVolume}%`);
    this._setStatus({ volume: newVolume });
  }

  _volumeInRange(level) {
    return Math.min(Math.max(level, MIN_VOLUME), MAX_VOLUME);
  }

  _setStatus(update) {
    this._status = { ...this._status, ...update };
  }

  _cmd(command) {
    this.instance.stdin.write(command + "\n");
  }

  _onOutput(line) {
    console.log(line);
  }
}

module.exports = Player;
