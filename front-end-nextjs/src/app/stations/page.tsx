import { PlayStationButton } from "@/components/PlayStationButton";
import { getStations } from "@/radio/radio";

export default async function Home() {
  const stations = await getStations();
  return (
    <ul>
      {stations.map((station) => (
        <li key={station.id}>
          <PlayStationButton station={station} />
        </li>
      ))}
    </ul>
  );
}
