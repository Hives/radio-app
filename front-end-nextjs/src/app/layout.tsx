import {Menu} from "@/components/Menu";
import {Status} from "@/components/Status";
import {getStatus} from "@/radio/radio";
import {Providers} from "@/components/Providers";

export const metadata = {
  title: "Pauly's Radio",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
