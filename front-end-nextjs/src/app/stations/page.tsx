import { PlayStation } from "@/components/PlayStation";
import { getStations } from "@/radio/radio";

export default async function Home() {
  const stations = await getStations();
  return (
    <ul>
      {stations.map((station) => (
        <li key={station.id}>
          <PlayStation station={station} />
        </li>
      ))}
    </ul>
  );
}
