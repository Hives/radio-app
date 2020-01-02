import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../../api';

const Controls = ({stations}) => {
  return (
    <>
      <ul>
        {stations.map(station => (
          <li>
            <button key={station} onClick={e => api.playStation(station)}>
              {station}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={e => api.stopPlaying()}>Stop</button>
    </>
  );
};

Controls.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Controls;
