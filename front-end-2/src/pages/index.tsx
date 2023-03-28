import { InferGetServerSidePropsType } from "next";
import { getStations, getStatus, getTags } from "@/radio/radio";
import { Status } from "@/components/Status";
import { useState } from "react";
import { Menu } from "@/components/Menu";
import { AllTags } from "@/components/tags/AllTags";
import { StationsByTag } from "@/components/tags/StationsByTag";
import { AllStations } from "@/components/AllStations";
import {StationList} from "@/components/StationList";
import {Tags} from "@/components/tags/Tags";

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

type State =
  | {
      view: "stations";
    }
  | {
      view: "all-tags";
    }
  | {
      view: "selected-tag";
      tag: string;
    };

export default function Stations({
  initialStatus,
  stations,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedTag, setSelectedTag] = useState<string>();
  const [state, setState] = useState<State>({ view: "stations" });

  const viewStations = () => setState({ view: "stations" });
  const viewAllTags = () => setState({ view: "all-tags" });
  const viewTag = (tag: string) => setState({ view: "selected-tag", tag });

  // const selectedStations = (tag: string) =>
  //   stations.filter((station) => station.tags.includes(tag));

  const selectedStations = selectedTag
    ? stations.filter((station) => station.tags.includes(selectedTag))
    : stations;

  return (
    <>
      <div
        className="
          flex h-screen flex-col gap-2 bg-indigo-300 p-2
          [&>*]:rounded-lg [&>*]:border-2 [&>*]:border-indigo-600 [&>*]:bg-white [&>*]:p-2 [&>*]:drop-shadow"
      >
        <header>
          <h1>Pauly&apos;s Radio</h1>
        </header>
        <div className="h-40 shrink-0">
          <Status initialStatus={initialStatus} />
        </div>
        <div>
          <Tags tags={tags} setSelectedTag={setSelectedTag} />
        </div>
        <div className="overflow-auto">
          <StationList stations={selectedStations} />
        </div>
      </div>
    </>
  );
}
