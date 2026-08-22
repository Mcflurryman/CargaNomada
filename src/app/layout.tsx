import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://carganomada.com"),
  title: { default: "Carga Nómada", template: "%s | Carga Nómada" },
  description: "Guías, comparativas y orientación editorial para elegir una power station según tu forma de viajar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://carganomada.com";
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": `${siteUrl}#organization`, name: "Carga Nómada", url: siteUrl, description: "Publicación editorial especializada en power stations y energía portátil para viajar." },
    { "@type": "WebSite", "@id": `${siteUrl}#website`, url: siteUrl, name: "Carga Nómada", inLanguage: "es", publisher: { "@id": `${siteUrl}#organization` } },
  ] };
  return <html lang="es"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><SiteHeader />{children}</body></html>;
}
