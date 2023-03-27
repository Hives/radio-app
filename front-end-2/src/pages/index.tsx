import { InferGetServerSidePropsType } from "next";
import { getStations, getStatus, getTags } from "@/radio/radio";
import { StationList } from "@/components/StationList";
import { Status } from "@/components/Status";
import { useState } from "react";
import { Tags } from "@/components/tags/Tags";
import { Menu } from "@/components/Menu";
import { AllTags } from "@/components/tags/AllTags";
import { StationsByTag } from "@/components/tags/StationsByTag";

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
  const [state, setState] = useState<State>({ view: "stations" });

  const viewStations = () => setState({ view: "stations" });
  const viewAllTags = () => setState({ view: "all-tags" });
  const viewTag = (tag: string) => setState({ view: "selected-tag", tag });

  const selectedStations = (tag: string) =>
    stations.filter((station) => station.tags.includes(tag));

  return (
    <>
      <Status initialStatus={initialStatus} />
      <Menu viewStations={viewStations} viewAllTags={viewAllTags} />
      {state.view === "stations" && <StationList stations={stations} />}
      {state.view === "all-tags" &&
        <AllTags tags={tags} setSelectedTag={viewTag} />
      }
      {state.view === "selected-tag" && (
        <StationsByTag stations={selectedStations(state.tag)} tag={state.tag} />
      )}
    </>
  );
}
