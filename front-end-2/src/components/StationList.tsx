import {playStation, Station} from "@/radio/radio";

type Props = {
  stations: Station[]
}

export function StationList({stations}: Props) {
  return <ul>
    {stations.map((station) => (
      <li key={station.id}>
        <button onClick={() => playStation(station.id)}>{station.name}</button>
      </li>
    ))}
  </ul>
}
