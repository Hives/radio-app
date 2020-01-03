import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../../api';

const Controls = ({stations}) => {
  return (
    <div>
      <ul>
        {stations.map(station => (
          <li key={station.id}>
            <button onClick={e => api.playStation(station.id)}>
              {station.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Controls.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Controls;
