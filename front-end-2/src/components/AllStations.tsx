import {Station} from "@/radio/radio";
import {StationList} from "@/components/StationList";

type Props = {
  stations: Station[]
}

export function AllStations({stations}: Props) {
  return <>
    <h2>All stations</h2>
    <StationList stations={stations} />
  </>
}
