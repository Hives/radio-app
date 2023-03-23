import { getTags } from "@/radio/radio";
import Link from "next/link";

export default async function () {
  const tags = await getTags();
  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/tags/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
}
