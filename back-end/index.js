const express = require('express');
const cors = require('cors');
const Player = require('./lib/player');
const {getUniqueTags, getStations, getStation} = require('./lib/data');
const app = express();

const port = 1234;

app.use(cors());
app.use(express.json());

const player = new Player();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/tags', (req, res) => {
  console.log('getting tags');
  res.send(getUniqueTags());
});

app.get('/stations', (req, res) => {
  console.log('getting stationData');
  res.send(getStations(req.query));
});

app.put('/player/source', (req, res) => {
  const {stationId} = req.body;
  const station = getStation(stationId);
  console.log(`playing ${station.name}: ${station.stream}`);
  player.playStation(station);
  res.send();
});

app.delete('/player/source', (req, res) => {
  console.log('stopping');
  player.stop();
  res.send();
});

app.get('/player/status', (req, res) => {
  res.send(player.status);
});

app.listen(port, () => {
  console.log(`Radio server listening on port ${port}!`);
});
