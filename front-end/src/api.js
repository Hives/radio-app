const serverIp = process.env.REACT_APP_SERVER_IP || 'localhost';
const serverPort = 1234;

const apiUrl = `http://${serverIp}:${serverPort}`;

export const getTags = () => fetch(`${apiUrl}/tags`).then(res => res.json());

export const getStationsByTag = tag =>
  fetch(`${apiUrl}/stations?tag=${tag}`).then(res => res.json());

export const getStatus = () =>
  fetch(`${apiUrl}/player/status`).then(res => res.json());

export const playStation = id =>
  fetch(`${apiUrl}/player/source`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({stationId: id}),
  });

export const decreaseVolume = () =>
  fetch(`${apiUrl}/player/commands?cmd=volume&volume=minus`).then(res =>
    res.json(),
  );

export const increaseVolume = () =>
  fetch(`${apiUrl}/player/commands?cmd=volume&volume=plus`).then(res =>
    res.json(),
  );

export const stopPlaying = () =>
  fetch(`${apiUrl}/player/source`, {method: 'DELETE'});
