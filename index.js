const express = require('express');
const cors = require('cors');
const Player = require('./lib/player');
const {getUniqueTags, getStations, getStation} = require('./lib/data');
const app = express();

const port = 1234;

app.use(cors());

const player = new Player();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/tags', (req, res) => {
  console.log('getting tags');
  res.send(getUniqueTags());
});

app.get('/status', (req, res) => {
  res.send(player.status);
});

app.get('/stations', (req, res) => {
  console.log('getting stationData');
  res.send(getStations(req.query));
});

app.get('/play', (req, res) => {
  const {stationId} = req.query;
  const station = getStation(stationId);
  console.log(`playing ${station.name}: ${station.stream}`);
  player.playStation(station);
  res.send();
});

app.get('/stop', (req, res) => {
  console.log('stopping');
  player.stop();
  res.send();
});

app.listen(port, () => {
  console.log(`Radio server listening on port ${port}!`);
});
