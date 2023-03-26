"use client";

import { playStation, Station } from "@/radio/radio";

type Props = {
  station: Station;
};

export function PlayStation({ station }: Props) {
  return (
    <button onClick={() => playStation(station.id)}>{station.name}</button>
  );
}
