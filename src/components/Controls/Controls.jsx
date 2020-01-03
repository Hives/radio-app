import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../../api';

const Controls = ({stations}) => {
  return (
    <div>
      <ul>
        {stations.map(station => (
          <li key={station}>
            <button onClick={e => api.playStation(station)}>{station}</button>
          </li>
        ))}
      </ul>
      <button onClick={e => api.stopPlaying()}>Stop</button>
    </div>
  );
};

Controls.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Controls;
