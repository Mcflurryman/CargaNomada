import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Carga Nómada", template: "%s | Carga Nómada" },
  description: "Guías, comparativas y orientación editorial para elegir una power station según tu forma de viajar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><SiteHeader />{children}</body></html>;
}
