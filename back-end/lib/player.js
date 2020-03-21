const fs = require("fs");
const { spawn, exec } = require("child_process");
const readline = require("readline");

const INITIAL_VOLUME = 50;
const MIN_VOLUME = 00;
const MAX_VOLUME = 100;
const VOLUME_INCREMENT = 2;
const FIFO_PATH = "/tmp/radio-fifo-file";
const SIMPLE_MIXER_CONTROL = "Speaker";

class Player {
  constructor() {
    this._volumeIncrement = VOLUME_INCREMENT;
    this._fifo = FIFO_PATH;

    if (!fs.existsSync(this._fifo)) {
      this._execWithLogging(`mkfifo ${this._fifo}`);
    }

    this._execWithLogging(
      `mplayer -idle -slave -input file=${this._fifo} -volume ${INITIAL_VOLUME}`
    );
    this._setStatus({ isPlaying: false, volume: INITIAL_VOLUME });
  }

  getStatus() {
    return this._status;
  }

  playStation(station) {
    this._cmd(`loadfile ${station.stream}`);
    this.setVolume(this._status.volume);
    this._setStatus({ isPlaying: true, source: { station } });
  }

  stop() {
    this._cmd("stop");
    this._setStatus({ isPlaying: false });
  }

  decreaseVolume() {
    this.setVolume(this._status.volume - this._volumeIncrement);
  }

  increaseVolume() {
    this.setVolume(this._status.volume + this._volumeIncrement);
  }

  setVolume(level) {
    const newVolume = this._volumeInRange(level);
    this._execWithLogging(`amixer set ${SIMPLE_MIXER_CONTROL} ${newVolume}%`);
    this._setStatus({ volume: newVolume });
  }

  _volumeInRange(level) {
    return Math.min(Math.max(level, MIN_VOLUME), MAX_VOLUME);
  }

  _setStatus(update) {
    this._status = { ...this._status, ...update };
  }

  _cmd(command) {
    this._execWithLogging(`echo "${command}" > ${this._fifo}`);
  }

  _execWithLogging(command) {
    console.log(`command: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      // console.log(`stdout: ${stdout}`);
      // this is always just empty, but might be useful for something one day?
    });
  }
}

module.exports = Player;
