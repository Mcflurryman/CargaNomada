import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: { default: "Carga Nómada", template: "%s | Carga Nómada" },
  description: "Orientación editorial sobre estaciones de energía portátiles.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><SiteHeader />{children}</body></html>;
}
