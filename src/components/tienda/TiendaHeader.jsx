import Link from 'next/link';
import styles from './TiendaHeader.module.css';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56987686499';
const WA_MESSAGE = 'Hola, quiero asesoría para elegir plantas de su catálogo';

const categoriasLinks = [
  { href: '/tienda/arbusto',    label: 'Arbustos' },
  { href: '/tienda/arbol',      label: 'Árboles' },
  { href: '/tienda/trepadora',  label: 'Trepadoras' },
  { href: '/tienda/cubresuelo', label: 'Cubresuelos' },
];

export default function TiendaHeader({ totalProductos }) {
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <header className={styles.header}>
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.meta}>
          <span className={styles.metaLine}>
            <span className={styles.metaDot} />
            Vivero productor · Temporada 2025
          </span>
          <Link href="/" className={styles.backLink}>
            ← Volver al inicio
          </Link>
        </div>

        <p className={styles.tagline}>🌿 Catálogo Oficial</p>

        <h1 className={styles.title}>Nuestras Plantas</h1>

        <p className={styles.intro}>
          Catálogo del vivero productor familiar Jardín Cordillera: {totalProductos} especies
          cultivadas en Ocoa — arbustos, árboles, trepadoras y cubresuelos — disponibles en
          distintas bolsas y tamaños, con precios claros y asesoría directa por WhatsApp.
          Retiro en nuestro vivero de Las Condes, Santiago.
        </p>

        <div className={styles.pills}>
          <span className={styles.pill}>{totalProductos} Especies</span>
          <span className={styles.pill}>Retiro en Las Condes</span>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <WhatsAppIcon />
          Asesoría por WhatsApp
        </a>

        <nav className={styles.otras} aria-label="Nuestras categorías de plantas">
          <span className={styles.otrasLabel}>Nuestras categorías:</span>
          <div className={styles.otrasLinks}>
            {categoriasLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.otraLink}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className={styles.ornament} aria-hidden="true">
        <span>🌿</span>
      </div>
    </header>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
