const express = require('express');
const cors = require('cors');
const MPlayer = require('./lib/mplayer');

const app = express();

const port = 1234;

app.use(cors());

const player = new MPlayer();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/tags', (req, res) => {
  console.log('getting tags');
  const tags = res.send(getUniqueTags());
});

app.get('/stations', (req, res) => {
  console.log('getting stationData');
  res.send(getStations(req.query));
});

app.get('/play', (req, res) => {
  const {stationId} = req.query;
  const station = getStation(stationId);
  console.log(`playing ${station.name}: ${station.stream}`);
  player.setSource(station.stream);
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

const getUniqueTags = () => {
  const stationData = require('./config.json');
  const allTags = stationData.map(data => data.tags).flat();
  const uniqueTags = allTags.filter(
    (item, index) => allTags.indexOf(item) === index,
  );
  return uniqueTags.sort();
};

const getStations = queryParams => {
  const stationData = require('./config.json').map((data, index) => {
    return {...data, id: index};
  });
  if (queryParams.tag) {
    return stationData.filter(data => data.tags.includes(queryParams.tag));
  }
  return stationData;
};

const getStation = id => require('./config.json')[id];
