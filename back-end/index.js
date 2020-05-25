const express = require("express");
const cors = require("cors");
const Player = require("./lib/mpvController");
const { getUniqueTags, getStations, getStation } = require("./lib/data");
const app = express();

const port = 1234;

app.use(cors());
app.use(express.json());

const player = new Player();
player.start();

app.get("/", (_, res) => res.send("Hello World!"));

app.get("/tags", (_, res) => {
  res.send(getUniqueTags());
});

app.get("/stations", (req, res) => {
  res.send(getStations(req.query));
});

app.put("/player/source", (req, res) => {
  const { stationId } = req.body;
  const station = getStation(stationId);
  player.playStation(station);
  res.send();
});

app.delete("/player/source", (_, res) => {
  player.stop();
  res.send();
});

app.get("/player/commands", (req, res) => {
  if (req.query.cmd === "volume") {
    const { volume } = req.query;

    switch (volume) {
      case "minus": {
        player.decreaseVolume();
        break;
      }
      case "plus": {
        player.increaseVolume();
        break;
      }
      default: {
        if (Number.isInteger(parseInt(volume))) {
          player.setVolume(parseInt(volume));
        } else {
          console.error(`could not set volume ${volume}`);
        }
      }
    }

    res.send({ volume: player.getStatus().volume });
  } else {
    res.send();
  }
});

app.get("/player/status", (_, res) => {
  res.send(player.getStatus());
});

app.listen(port, () => {
  console.log(`Radio server listening on port ${port}!`);
});
