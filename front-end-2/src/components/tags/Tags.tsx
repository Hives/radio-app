import { TagButton } from "@/components/tags/TagButton";

type Props = {
  tags: string[];
  setSelectedTag: (tag: string | undefined) => void;
};

export function Tags({ tags, setSelectedTag }: Props) {
  return (
    <>
      <span className="mr-1">Tags:</span>
      <ul className="inline">
        {tags.map((tag) => (
          <li key={tag} className="inline">
            <TagButton
              className="bg-indigo-200"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </TagButton>
          </li>
        ))}
      </ul>
      <TagButton
        className="bg-pink-200"
        onClick={() => setSelectedTag(undefined)}
      >
        Show all stations
      </TagButton>
    </>
  );
}
