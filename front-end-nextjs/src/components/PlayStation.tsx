"use client";

import { playStation, Station } from "@/radio/radio";
import { useInvalidateStatus } from "@/hooks/useInvalidateStatus";

type Props = {
  station: Station;
};

export function PlayStation({ station }: Props) {
  const invalidateStatus = useInvalidateStatus();
  const play = () => playStation(station.id).then(invalidateStatus);

  return <button onClick={play}>{station.name}</button>;
}
