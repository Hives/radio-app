type Props = {
  viewStations: () => void;
  viewAllTags: () => void;
};

export function Menu({ viewStations, viewAllTags }: Props) {
  return (
    <nav>
      <button onClick={viewStations}>View all stations</button>
      <button onClick={viewAllTags}>View all tags</button>
    </nav>
  );
}
