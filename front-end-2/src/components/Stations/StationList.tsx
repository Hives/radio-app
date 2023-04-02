import { Station } from "@/radio/radio";
import { PlayStation } from "@/components/Stations/PlayStation";

type Props = {
  stations: Station[];
};

export function StationList({ stations }: Props) {
  return (
    <ul className="h-full bg-white grid grid-cols-2 gap-2 rounded-xl p-3 overflow-auto shadow-md">
      {stations.map((station) => (
        <li
          key={station.id}
        >
          <PlayStation station={station} />
        </li>
      ))}
    </ul>
  );
}
