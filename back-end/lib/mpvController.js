const { spawn, exec } = require("child_process");
const readline = require("readline");

const mpvAPI = require("../Node-MPV/lib/mpv/mpv");

const INITIAL_VOLUME = 20;
const MIN_VOLUME = 0;
const MAX_VOLUME = 100;
const VOLUME_INCREMENT = 1;

class AudioController {
  constructor() {
    this._mpv = new mpvAPI({
      verbose: true,
      audio_only: true,
      socket: "paulys-radio-mpv.sock"
    });

    this._mpv.on("status", status => {
      console.log(status);
    });

    this.setVolume(INITIAL_VOLUME);
    this._setStatus({ isPlaying: false, volume: INITIAL_VOLUME });
  }

  async start() {
    try {
      console.log("before start");
      await this._mpv.start().then(() => {
        console.log("is running: " + this._mpv.isRunning());
      });
      console.log("after start");
    } catch (error) {
      console.error(error);
    }
  }

  getStatus() {
    return this._status;
  }

  async playStation(station) {
    console.log("inside playStation");
    try {
      console.log("inside try");
      await this._mpv.load(station.stream, "replace");
      console.log("after load");
      this._setStatus({ isPlaying: true, source: { station } });
    } catch (error) {
      console.log("inside catch");
      console.error(error);
    }
  }

  stop() {
    this._mpv.stop();
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
    console.log(`volume: ${newVolume}`);
    exec(`pactl set-sink-volume @DEFAULT_SINK@ ${newVolume}%`);
    this._setStatus({ volume: newVolume });
  }

  _volumeInRange(level) {
    return Math.min(Math.max(level, MIN_VOLUME), MAX_VOLUME);
  }

  _setStatus(update) {
    this._status = { ...this._status, ...update };
  }
}

module.exports = AudioController;
