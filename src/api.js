const apiUrl = 'http://192.168.0.36:1234';

export const getTags = () => fetch(`${apiUrl}/tags`).then(res => res.json());

export const getStationsByTag = tag =>
  fetch(`${apiUrl}/stations?tag=${tag}`).then(res => res.json());

export const getStations = () =>
  fetch(`${apiUrl}/stations`).then(res => res.json());

export const playStation = id => fetch(`${apiUrl}/play?stationId=${id}`);

export const stopPlaying = () => fetch(`${apiUrl}/stop`);
