import React from 'react';
import * as api from '../../api';

const Controls = ({stations}) => {
  return (
    <ul>
      {stations.map(station => (
        <li key={station.id}>
          <button onClick={e => api.playStation(station.id)}>
            {station.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Controls;
