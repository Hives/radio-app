type Props = {
  tags: string[];
  setSelectedTag: (tag: string) => void;
};

export function AllTags({ tags, setSelectedTag }: Props) {
  return (
    <>
      <h2>Tags:</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <button onClick={() => setSelectedTag(tag)}>{tag}</button>
          </li>
        ))}
      </ul>
    </>
  );
}
