const express = require('express');
const cors = require('cors');
const app = express();

const MPlayer = require('mplayer');
const player = new MPlayer();

const stations = require('./config.json');

const port = 1234;

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/stations', (req, res) => {
  console.log('getting stations');
  res.send(Object.keys(stations));
});

app.get('/play', (req, res) => {
  const station = req.query.station;
  console.log('playing station ' + station);
  player.stop();
  player.openFile(stations[station]);
  res.send();
});

app.get('/stop', (req, res) => {
  player.stop();
  res.send();
});

app.listen(port, () => {
  console.log(`Radio server listening on port ${port}!`);
});
