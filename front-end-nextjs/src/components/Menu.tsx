import Link from "next/link";

export function Menu() {
  return (
    <nav>
      <Link href="/stations">All stations</Link>
      <Link href="/tags">Tags</Link>
    </nav>
  );
}
