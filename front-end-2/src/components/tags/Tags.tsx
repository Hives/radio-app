import { Station } from "@/radio/radio";
import { useState } from "react";
import { AllTags } from "@/components/tags/AllTags";
import { StationsByTag } from "@/components/tags/StationsByTag";

type Props = {
  tags: string[];
  stations: Station[];
};

export function Tags({ tags, stations }: Props) {
  const [selectedTag, setSelectedTag] = useState<string>();

  if (!selectedTag) {
    return <AllTags tags={tags} setSelectedTag={setSelectedTag} />;
  }

  return (
    <StationsByTag
      stations={stations.filter((station) =>
        station.tags.includes(selectedTag)
      )}
      tag={selectedTag}
    />
  );
}
