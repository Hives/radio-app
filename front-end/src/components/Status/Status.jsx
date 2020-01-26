import React, {useState} from 'react';
import useInterval from '../../utils/event.util';
import * as api from '../../api';

const Status = () => {
  const [status, setStatus] = useState();

  useInterval(() => {
    api.getStatus().then(newStatus => setStatus(newStatus));
  }, 2000);

  if (!status) {
    return <section>loadin...</section>;
  }

  if (!status.isPlaying) {
    return (
      <section>
        <h2>~silencio~</h2>
      </section>
    );
  }

  const details = status.source.station;

  return (
    <section>
      <h2>Playing {details.name}</h2>
      <p>
        <a href={details.website} target="_blank">
          {details.website}
        </a>
      </p>
      <div>
        <button onClick={e => api.decreaseVolume()}>Vol -</button>
        {status.volume && <span>{status.volume}</span>}
        <button onClick={e => api.increaseVolume()}>Vol +</button>
      </div>
      <button onClick={e => api.stopPlaying()}>Stop</button>
    </section>
  );
};

export default Status;
