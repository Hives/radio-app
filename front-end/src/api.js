const apiUrl = 'http://192.168.0.36:1234';

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

export const stopPlaying = () =>
  fetch(`${apiUrl}/player/source`, {method: 'DELETE'});
