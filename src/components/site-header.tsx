import Link from "next/link";

const navigation = [
  ["Encontrar una power station", "/encontrar-power-station"],
  ["Perfiles", "/perfiles"],
  ["Reviews", "/reviews"],
  ["Comparativas", "/comparativas"],
  ["Guías", "/guias"],
] as const;

export function SiteHeader() {
  return (
    <header>
      <nav aria-label="Navegación principal">
        <Link href="/">Carga Nómada</Link>
        <ul>
          {navigation.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
        </ul>
      </nav>
    </header>
  );
}
