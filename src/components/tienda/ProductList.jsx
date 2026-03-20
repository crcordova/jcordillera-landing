import { formatPrecio, getWhatsAppUrl } from '@/data/tienda';
import styles from './ProductList.module.css';

export default function ProductList({ productos, categorias }) {
  return (
    <div className={styles.list}>
      {/* Table header */}
      <div className={styles.tableHeader}>
        <span className={styles.colNombre}>Planta</span>
        <span className={styles.colCategoria}>Categoría</span>
        <span className={styles.colTamaño}>Tamaño</span>
        <span className={styles.colBolsa}>Bolsa</span>
        <span className={styles.colPrecio}>Precio</span>
        <span className={styles.colAccion}>Consultar</span>
      </div>

      {/* Rows grouped by product */}
      <div className={styles.rows}>
        {productos.map((producto, pi) => {
          const cat = categorias[producto.categoria];
          return producto.variantes.map((variante, vi) => (
            <div
              key={`${producto.id}-${variante.tamaño}`}
              className={`${styles.row} ${vi === 0 ? styles.rowFirst : styles.rowCont}`}
              style={{ animationDelay: `${Math.min(pi * 0.04, 0.4)}s` }}
            >
              {/* Nombre + sci (only on first variant) */}
              <div className={styles.colNombre}>
                {vi === 0 ? (
                  <>
                    {producto.destacado && (
                      <span className={styles.starIcon} title="Destacado" aria-label="Destacado">✦</span>
                    )}
                    <div>
                      <p className={styles.rowNombre}>{producto.nombre}</p>
                      <p className={styles.rowSci}>{producto.nombreCientifico}</p>
                    </div>
                  </>
                ) : (
                  /* Continuation rows just show indent */
                  <span className={styles.rowContinuation} aria-hidden="true">└</span>
                )}
              </div>

              {/* Category (only on first variant) */}
              <div className={styles.colCategoria}>
                {vi === 0 && cat ? (
                  <span
                    className={styles.rowCatBadge}
                    style={{ background: cat.color, color: cat.textColor }}
                  >
                    {cat.label}
                  </span>
                ) : null}
              </div>

              {/* Tamaño */}
              <div className={styles.colTamaño}>
                <span className={styles.rowTamaño}>{variante.tamaño}</span>
              </div>

              {/* Bolsa */}
              <div className={styles.colBolsa}>
                <span className={styles.rowBolsa}>{variante.bolsa}</span>
              </div>

              {/* Precio */}
              <div className={styles.colPrecio}>
                <span className={styles.rowPrecio}>{formatPrecio(variante.precio)}</span>
              </div>

              {/* WhatsApp CTA */}
              <div className={styles.colAccion}>
                <a
                  href={getWhatsAppUrl(producto, variante)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.rowWaBtn}
                  aria-label={`Consultar ${producto.nombre} ${variante.tamaño} por WhatsApp`}
                >
                  <WhatsAppIcon />
                  <span className={styles.rowWaBtnLabel}>Consultar</span>
                </a>
              </div>
            </div>
          ));
        })}
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
