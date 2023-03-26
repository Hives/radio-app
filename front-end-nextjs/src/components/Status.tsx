"use client";

import { stop, Status } from "@/radio/radio";
import { useInvalidateStatus } from "@/hooks/useInvalidateStatus";
import { useStatusQuery } from "@/hooks/useStatusQuery";
import { Volume } from "@/components/Volume";

type Props = {
  initialStatus: Status;
};

export function Status({ initialStatus }: Props) {
  const { isLoading, data: status } = useStatusQuery(initialStatus);
  const invalidateStatus = useInvalidateStatus();
  const stopAndInvalidate = () => stop().then(invalidateStatus);

  if (isLoading) return null;

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
      <button onClick={stopAndInvalidate} disabled={!status.isPlaying}>
        Stop
      </button>
    </div>
  ) : null;
}
