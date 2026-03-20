import styles from './TiendaHeader.module.css';

export default function TiendaHeader({ totalProductos }) {
  return (
    <header className={styles.header}>
      {/* Decorative blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.meta}>
          <span className={styles.metaLine}>
            <span className={styles.metaDot} />
            Catálogo Oficial · Temporada 2025
          </span>
          <a href="/" className={styles.backLink}>
            ← Volver al inicio
          </a>
        </div>

        <h1 className={styles.title}>
          Nuestras<br />
          <em>Plantas</em>
        </h1>

        <p className={styles.subtitle}>
          Selección de arbustos ornamentales, plantas perennes, suculentas,
          trepadoras e interiores para proyectos de paisajismo y hogares.
        </p>

        <div className={styles.pills}>
          <span className={styles.pill}>{totalProductos} Especies</span>
          <span className={styles.pill}>Precios en CLP</span>
          <span className={styles.pill}>Consulta por WhatsApp</span>
          <span className={styles.pill}>Retiro en vivero</span>
        </div>
      </div>

      {/* Decorative botanical ornament */}
      <div className={styles.ornament} aria-hidden="true">
        <span>🌿</span>
      </div>
    </header>
  );
}
