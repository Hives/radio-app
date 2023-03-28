import { Station } from "@/radio/radio";
import { PlayStation } from "@/components/PlayStation";

type Props = {
  stations: Station[];
};

export function StationList({ stations }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {stations.map((station) => (
        <li
          key={station.id}
          className="flex h-16 items-center justify-center rounded border-2 border-indigo-200 bg-indigo-100 p-2"
        >
          <PlayStation station={station} />
        </li>
      ))}
    </ul>
  );
}
