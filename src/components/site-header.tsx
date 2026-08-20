import Link from "next/link";

const navigation = [
  ["Reviews", "/reviews"],
  ["Comparativas", "/comparativas"],
  ["Guías", "/guias"],
  ["Metodología", "/sobre-carga-nomada"],
] as const;

export function SiteHeader() {
  return <header className="site-header"><nav className="container site-header__nav" aria-label="Navegación principal">
        <Link className="site-header__brand" href="/">Carga <span>Nómada</span></Link>
        <ul>
          {navigation.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
        </ul>
        <Link className="site-header__cta" href="/guias">Aprende lo básico <span aria-hidden="true">→</span></Link>
      </nav></header>;
}
