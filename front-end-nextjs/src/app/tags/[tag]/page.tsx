import { getStationsByTag } from "@/radio/radio";
import { PlayStation } from "@/components/PlayStation";

export default async function ({ params }) {
  const { tag } = params;
  const stations = await getStationsByTag(tag);
  return (
    <>
      <h2>Tagged with &quot;{tag}&quot;:</h2>
      <ul>
        {stations.map((station) => (
          <li key={station.id}>
            <PlayStation station={station} />
          </li>
        ))}
      </ul>
    </>
  );
}
