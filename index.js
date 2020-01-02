const express = require('express');
const cors = require('cors');
const MPlayer = require('./lib/mplayer');
const stations = require('./config.json');

const app = express();

const port = 1234;

app.use(cors());

const player = new MPlayer();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/stations', (req, res) => {
  console.log('getting stations');
  res.send(Object.keys(stations));
});

app.get('/play', (req, res) => {
  const {station} = req.query;
  const {stream} = stations[station];
  console.log(`playing ${station}: ${stream}`);
  player.setSource(stream);
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
