import { stop, Status, getStatus } from "@/radio/radio";
import { Volume } from "@/components/Volume";
import { useState } from "react";
import { useInterval } from "@/utils/useInterval";

type Props = {
  initialStatus: Status;
};

export function Status({ initialStatus }: Props) {
  const [status, setStatus] = useState<Status>(initialStatus);

  console.log(status);

  const updateStatus = () => getStatus().then((status) => setStatus(status));

  useInterval(updateStatus, 2_000);

  const stopAndUpdate = () => {
    stop().then(updateStatus)
  };

  return status.isPlaying ? (
    <div>
      <h2>{status.source.station.name}</h2>
      <p>
        <a href={status.source.station.website}>
          {status.source.station.website}
        </a>
      </p>
      <div>
        <Volume level={status.volume} />
      </div>
      <button onClick={stopAndUpdate} disabled={!status.isPlaying}>
        Stop
      </button>
    </div>
  ) : null;
}
