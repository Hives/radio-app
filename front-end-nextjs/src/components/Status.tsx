"use client";

import { stop, getStatus, Status } from "@/radio/radio";
import { useQuery } from "@tanstack/react-query";
import { useInvalidateStatus } from "@/hooks/useInvalidateStatus";

type Props = {
  initialStatus: Status;
};

export function Status({ initialStatus }: Props) {
  const { isLoading, data: status } = useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
    initialData: initialStatus,
    refetchInterval: 1_000,
  });

  const { invalidateStatus } = useInvalidateStatus();
  const stopAndInvalidate = () => stop().then(invalidateStatus);

  if (isLoading) return null;

  return (
    <div>
      <h2>{status.isPlaying ? status.source.station.name : "..."}</h2>
      <p>Volume: {status.volume}</p>
      {
        <button onClick={stopAndInvalidate} disabled={!status.isPlaying}>
          Stop
        </button>
      }
    </div>
  );
}
