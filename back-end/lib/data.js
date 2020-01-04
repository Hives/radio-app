const stationData = () => require('../config.json');

const getUniqueTags = () => {
  const stations = stationData();
  const allTags = stations.map(station => station.tags).flat();
  const uniqueTags = allTags.filter(
    (item, index) => allTags.indexOf(item) === index,
  );
  return uniqueTags.sort();
};

const getStations = queryParams => {
  const stations = stationData().map((station, index) => {
    return {...station, id: index};
  });
  if (queryParams.tag) {
    return stations.filter(station => station.tags.includes(queryParams.tag));
  }
  return stations;
};

const getStation = id => stationData()[id];

module.exports = {getUniqueTags, getStations, getStation};
