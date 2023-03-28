import { stop, Status, getStatus, Station } from "@/radio/radio";
import { Volume } from "@/components/Volume";
import { useState } from "react";
import { useInterval } from "@/utils/useInterval";
import { useStatusQuery } from "@/hooks/useStatusQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useInvalidateStatus } from "@/hooks/useInvalidateStatus";

type Props = {
  initialStatus: Status;
};

export function Status({ initialStatus }: Props) {
  const statusQuery = useStatusQuery(initialStatus);
  const invalidateStatus = useInvalidateStatus();

  if (statusQuery.isError) return <h1>Oh no</h1>;

  const { data: status } = statusQuery;

  const stopAndRefresh = () => stop().then(invalidateStatus);

  return (
    <div>
      {status.isPlaying && (
        <StatusInner
          stationName={status.source.station.name}
          stationWebsite={status.source.station.website}
          volume={status.volume}
          stop={stopAndRefresh}
        />
      )}
    </div>
  );
}

function StatusInner({
  stationName,
  stationWebsite,
  volume,
  stop,
}: {
  stationName: string;
  stationWebsite: string;
  volume: number;
  stop: () => void;
}) {
  return (
    <div>
      <h2>{stationName}</h2>
      <p>
        <a href={stationWebsite}>{stationWebsite}</a>
      </p>
      <div>
        <Volume level={volume} />
      </div>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
