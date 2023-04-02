import { TagButton } from "@/components/tags/TagButton";

type Props = {
  tags: string[];
  setSelectedTag: (tag: string | undefined) => void;
};

export function Tags({ tags, setSelectedTag }: Props) {
  return (
    <>
      <span className="mr-1 text-white font-bold text-shadow">Tags:</span>
      <ul className="inline">
        {tags.map((tag) => (
          <li key={tag} className="inline">
            <TagButton
              className="bg-green-200 text-green-700"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </TagButton>
          </li>
        ))}
      </ul>
      <TagButton
        className="bg-pink-200 text-pink-700"
        onClick={() => setSelectedTag(undefined)}
      >
        Show all stations
      </TagButton>
    </>
  );
}
