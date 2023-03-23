const mpvAPI = require("node-mpv");

const INITIAL_VOLUME = 20;
const MIN_VOLUME = 0;
const MAX_VOLUME = 100;
const VOLUME_INCREMENT = 1;
const SOCKET_ADDRESS = "/tmp/paulys-radio-mpv.sock";

class AudioController {
  constructor() {
    this._mpv = new mpvAPI({
      audio_only: true,
      socket: SOCKET_ADDRESS
    });

    this._mpv.on("status", status => {
      console.log(status);
    });
  }

  async init() {
    try {
      console.log("before start");
      await this._mpv.start();
      console.log("after start");
      await this.setVolume(INITIAL_VOLUME);
      this._setStatus({ isPlaying: false, volume: INITIAL_VOLUME });
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

  async stop() {
    await this._mpv.stop();
    this._setStatus({isPlaying: false});
  }

  decreaseVolume() {
    this.setVolume(this._status.volume - VOLUME_INCREMENT);
  }

  increaseVolume() {
    this.setVolume(this._status.volume + VOLUME_INCREMENT);
  }

  setVolume(level) {
    try {
      const newVolume = this._volumeInRange(level);
      console.log(`volume: ${newVolume}`);
      this._mpv.volume(newVolume);
      this._setStatus({ volume: newVolume });
    } catch (error) {
      console.error(error);
    }
  }

  _volumeInRange(level) {
    return Math.min(Math.max(level, MIN_VOLUME), MAX_VOLUME);
  }

  _setStatus(update) {
    this._status = { ...this._status, ...update };
  }
}

module.exports = AudioController;
