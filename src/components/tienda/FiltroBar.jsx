'use client';

import styles from './FiltroBar.module.css';

export default function FiltroBar({
  categorias,
  categoriaActiva,
  onCategoria,
  vista,
  onVista,
  busqueda,
  onBusqueda,
  totalVisible,
}) {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>

        {/* ── Search ── */}
        <div className={styles.searchWrap}>
          <SearchIcon />
          <input
            type="search"
            placeholder="Buscar planta…"
            value={busqueda}
            onChange={(e) => onBusqueda(e.target.value)}
            className={styles.searchInput}
            aria-label="Buscar plantas"
          />
          {busqueda && (
            <button
              className={styles.searchClear}
              onClick={() => onBusqueda('')}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>

        {/* ── Category filters ── */}
        <div className={styles.filters} role="group" aria-label="Filtrar por categoría">
          {Object.entries(categorias).map(([key, cat]) => (
            <button
              key={key}
              className={`${styles.filterBtn} ${categoriaActiva === key ? styles.filterActive : ''}`}
              onClick={() => onCategoria(key)}
              aria-pressed={categoriaActiva === key}
              style={
                categoriaActiva === key && cat.color
                  ? { background: cat.color, color: cat.textColor, borderColor: cat.color }
                  : {}
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Right side: count + view toggle ── */}
        <div className={styles.right}>
          <span className={styles.count}>
            {totalVisible} {totalVisible === 1 ? 'planta' : 'plantas'}
          </span>

          <div className={styles.viewToggle} role="group" aria-label="Modo de vista">
            <button
              className={`${styles.viewBtn} ${vista === 'mosaico' ? styles.viewActive : ''}`}
              onClick={() => onVista('mosaico')}
              aria-pressed={vista === 'mosaico'}
              aria-label="Vista mosaico"
              title="Vista mosaico"
            >
              <GridIcon />
            </button>
            <button
              className={`${styles.viewBtn} ${vista === 'lista' ? styles.viewActive : ''}`}
              onClick={() => onVista('lista')}
              aria-pressed={vista === 'lista'}
              aria-label="Vista lista"
              title="Vista lista"
            >
              <ListIcon />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
}
