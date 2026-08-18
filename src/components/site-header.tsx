import Link from "next/link";

const navigation = [
  ["Perfiles", "/perfiles"],
  ["Reviews", "/reviews"],
  ["Comparativas", "/comparativas"],
  ["Guías", "/guias"],
] as const;

export function SiteHeader() {
  return <header className="site-header"><nav className="container site-header__nav" aria-label="Navegación principal">
        <Link className="site-header__brand" href="/">Carga <span>Nómada</span></Link>
        <ul>
          {navigation.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
        </ul>
        <Link className="site-header__cta" href="/encontrar-power-station">Encuentra la tuya <span aria-hidden="true">→</span></Link>
      </nav></header>;
}
