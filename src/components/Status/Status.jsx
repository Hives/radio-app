import React, {useState} from 'react';
import useInterval from '../../utils/event.util';
import * as api from '../../api';

const Status = () => {
  const [status, setStatus] = useState();

  useInterval(() => {
    api.getStatus().then(newStatus => setStatus(newStatus));
  }, 2000);

  if (!status) {
    return <div>loadin...</div>;
  }

  if (!status.isPlaying) {
    return <h2>~silencio~</h2>;
  }

  return (
    <div>
      <h2>Playing {status.station.name}</h2>
      <a href={status.station.website} target="_blank">
        Station website
      </a>
    </div>
  );
};

export default Status;
