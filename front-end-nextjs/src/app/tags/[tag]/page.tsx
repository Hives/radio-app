import { getStationsByTag } from "@/radio/radio";
import { PlayStationButton } from "@/components/PlayStationButton";

export default async function ({ params }) {
  const { tag } = params;
  const stations = await getStationsByTag(tag);
  return (
    <>
      <h2>Tagged with &quot;{tag}&quot;:</h2>
      <ul>
        {stations.map((station) => (
          <li key={station.id}>
            <PlayStationButton station={station} />
          </li>
        ))}
      </ul>
    </>
  );
}
