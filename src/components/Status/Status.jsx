import React, {useState} from 'react';
import useInterval from '../../utils/event.util';
import * as api from '../../api';

const Status = () => {
  const [status, setStatus] = useState();

  useInterval(() => {
    api.getStatus().then(newStatus => setStatus(newStatus));
  }, 2000);

  if (status) {
    return (
      <div>
        <h2>
          {status.isPlaying ? `Playing ${status.station.name}` : '~silencio~'}
        </h2>
      </div>
    );
  }
  return <div>loadin...</div>;
};

export default Status;
