const { spawn, exec } = require("child_process");

const INITIAL_VOLUME = 50;
const MIN_VOLUME = 0;
const MAX_VOLUME = 100;
const VOLUME_INCREMENT = 2;
const SIMPLE_MIXER_CONTROL = "Master";

class Player {
  constructor() {
    const initialArgs = ['-idle', '-slave'];
    this.instance = spawn('mplayer', initialArgs);
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
    this.instance.stdin.write(command + '\n');
  }
}

module.exports = Player;
