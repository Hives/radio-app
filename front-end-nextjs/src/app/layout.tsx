import { Menu } from "@/components/Menu";
import { Status } from "@/components/Status";
import { getStatus } from "@/radio/radio";
import { ReactNode } from "react";
import { Providers } from "@/components/Providers";

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
        <Providers>
          <Status initialStatus={status} />
          <Menu />
          {children}
        </Providers>
      </body>
    </html>
  );
}
