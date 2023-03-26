import { Menu } from "@/app/Menu";
import { Status } from "@/components/Status";
import { getStatus } from "@/radio/radio";
import { ReactNode } from "react";

export const metadata = {
  title: "Pauly's Radio",
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const status = await getStatus();
  return (
    <html lang="en">
      <body>
        <Status initialStatus={status} />
        <Menu />
        {children}
      </body>
    </html>
  );
}
