import { InferGetServerSidePropsType } from "next";
import { getStations, getStatus, getTags } from "@/radio/radio";
import { Status } from "@/components/Status/Status";
import { useState } from "react";
import { StationList } from "@/components/Stations/StationList";
import { Tags } from "@/components/tags/Tags";

export const getServerSideProps = async () => {
  const [initialStatus, stations, tags] = await Promise.all([
    getStatus(),
    getStations(),
    getTags(),
  ]);

  return {
    props: {
      initialStatus,
      stations,
      tags,
    },
  };
};

export default function Stations({
  initialStatus,
  stations,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedTag, setSelectedTag] = useState<string>();

  const selectedStations = selectedTag
    ? stations.filter((station) => station.tags.includes(selectedTag))
    : stations;

  return (
    <>
      <div className="flex h-screen flex-col stripy-background">
        <header className="shadow-md">
          <h1 className="bg-green-500 p-1 text-center text-xl font-extrabold text-white text-shadow">
            Pauly&apos;s Radio
          </h1>
        </header>
        <div className="flex flex-col shrink overflow-hidden">
          <div className="min-h-[12rem] shrink-0 m-2">
            <Status initialStatus={initialStatus} />
          </div>
          <div className="mx-2">
            <Tags tags={tags} setSelectedTag={setSelectedTag} />
          </div>
          <div className="shrink p-2 overflow-auto">
            <StationList stations={selectedStations} />
          </div>
        </div>
      </div>
    </>
  );
}
