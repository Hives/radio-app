import React, { useState } from "react";
import useInterval from "../../utils/event.util";
import * as api from "../../api";

import classes from "./Status.module.css";

const Status = () => {
  const [status, setStatus] = useState();

  useInterval(() => {
    api.getStatus().then(newStatus => setStatus(newStatus));
  }, 2000);

  const increaseVolume = async () =>
    api
      .increaseVolume()
      .then(res => setStatus({ ...status, volume: res.volume }));

  const decreaseVolume = async () =>
    api
      .decreaseVolume()
      .then(res => setStatus({ ...status, volume: res.volume }));

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
        <a href={details.website} target="_blank" rel="noopener noreferrer">
          {details.website}
        </a>
      </p>
      <div className={classes.volume}>
        <button onClick={decreaseVolume}>Vol -</button>
        {status.volume !== undefined && <span>{status.volume}</span>}
        <button onClick={increaseVolume}>Vol +</button>
      </div>
      <button onClick={e => api.stopPlaying()}>Stop</button>
    </section>
  );
};

export default Status;
