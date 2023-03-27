import { Station } from "@/radio/radio";
import {StationList} from "@/components/StationList";

type Props = {
  stations: Station[];
  tag: string;
};

export function StationsByTag({ stations, tag }: Props) {
  return <>
    <h2>Tagged with &quot;{tag}&quot;:</h2>
    <StationList stations={stations} />
  </>
}
