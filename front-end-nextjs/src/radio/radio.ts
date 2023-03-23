import { Status, Station, Stations } from "./schemas";

import { z } from "zod";

const radioUrl = (path: string) => new URL(path, "http://localhost:3001");

export type Station = z.infer<typeof Station>;
export type Status = z.infer<typeof Status>

export async function playStation(id: number) {
  return await fetch(radioUrl("/player/source"), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stationId: id }),
  });
}

export async function stop() {
  await fetch(radioUrl("/player/source"), { method: "DELETE" });
}

export async function getTags(): Promise<string[]> {
  const data = await fetch(radioUrl("/tags"));
  const json = await data.json();
  const tags = z.array(z.string()).parse(json);
  return tags;
}

export async function getStationsByTag(tag: string): Promise<Station[]> {
  const data = await fetch(radioUrl(`/stations?tag=${tag}`));
  const json = await data.json();
  const stations = Stations.parse(json);
  return stations;
}

export async function getStations(): Promise<Station[]> {
  const data = await fetch(radioUrl("/stations"));
  const json = await data.json();
  const stations = Stations.parse(json);
  return stations;
}

export async function getStatus(): Promise<Status> {
  const data = await fetch(radioUrl("/player/status"));
  const json = await data.json();
  const status = Status.parse(json);
  return status;
}
