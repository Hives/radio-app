const apiUrl = 'http://192.168.0.36:1234';

export const getStations = () =>
  fetch(`${apiUrl}/stations`).then(res => res.json());

export const playStation = station =>
  fetch(`${apiUrl}/play?station=${station}`);

export const stopPlaying = () => fetch(`${apiUrl}/stop`);
