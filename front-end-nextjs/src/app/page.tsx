import {getStations} from "@/radio/radio";

export default async function Home() {
  const stations = await getStations();
  return (
    <main>
      <pre>{JSON.stringify(stations, null, 2)}</pre>
    </main>
  )
}
