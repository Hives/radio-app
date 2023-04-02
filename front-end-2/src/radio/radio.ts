import { Station, Stations, Status } from "./schemas";

import { z } from "zod";

export type Station = z.infer<typeof Station>;
export type Status = z.infer<typeof Status>;

export async function playStation(stationId: number) {
  await fetchRadio("/player/source", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stationId }),
  });
}

export async function setVolume(level: number) {
  await fetchRadio(`/player/commands?cmd=volume&volume=${level}`);
}

export async function stop() {
  await fetchRadio("/player/source", { method: "DELETE" });
}

export async function getTags(): Promise<string[]> {
  const data = await fetchRadio("/tags");
  const json = await data.json();
  const tags = z.array(z.string()).parse(json);
  return tags;
}

export async function getStationsByTag(tag: string): Promise<Station[]> {
  const data = await fetchRadio(`/stations?tag=${tag}`);
  const json = await data.json();
  const stations = Stations.parse(json);
  return stations;
}

export async function getStations(): Promise<Station[]> {
  const data = await fetchRadio("/stations");
  const json = await data.json();
  const stations = Stations.parse(json);
  return stations;
}

export async function getStatus(): Promise<Status> {
  const data = await fetchRadio("/player/status");
  const json = await data.json();
  const status = Status.parse(json);
  return status;
}

async function fetchRadio(path: string, init?: RequestInit): Promise<Response> {
  return await fetch(new URL(path, "http://localhost:3001"), {
    cache: "no-cache",
    ...init,
  });
}
