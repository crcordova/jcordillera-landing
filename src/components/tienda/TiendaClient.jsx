'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import TiendaHeader from './TiendaHeader';
import FiltroBar from './FiltroBar';
import ProductGrid from './ProductGrid';
import ProductList from './ProductList';
import styles from './TiendaClient.module.css';

export default function TiendaClient({ productos, categorias, categoriaInicial = 'all', mostrarHeader = true }) {
  const [vista, setVista]         = useState('lista'); // 'mosaico' | 'lista'
  const searchParams = useSearchParams();

  // ── Leer ?categoria= de la URL o la prop inicial (lazy init — sin effect) ──
  const [categoria, setCategoria] = useState(() => {
    const cat = searchParams.get('categoria') || categoriaInicial;
    if (!cat) return 'all';
    // Primero intentar por slug (categoriaInicial es el slug real de /tienda/[categoria])
    if (categorias[cat]) return cat;
    // Fallback por label (URLs antiguas tipo ?categoria=Arbustos)
    const match = Object.entries(categorias).find(
      ([, v]) => v.label.toLowerCase() === cat.toLowerCase()
    );
    return match ? match[0] : 'all';
  });
  const [busqueda, setBusqueda]   = useState('');

  // ── Filtrar productos ──
  const filtrados = useMemo(() => {
    let result = productos;

    if (categoria !== 'all') {
      result = result.filter((p) => p.categoria === categoria);
    }

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.nombreCientifico.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q)
      );
    }

    return [...result].sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
  }, [productos, categoria, busqueda]);

  const totalVisible = filtrados.length;

  return (
    <div className={styles.wrapper}>
      {/* Header hero (en /tienda/[categoria] lo reemplaza CategoriaIntro) */}
      {mostrarHeader && <TiendaHeader totalProductos={productos.length} />}

      {/* Búsqueda + filtros (sticky) — mantiene el mismo comportamiento de /tienda */}
      <FiltroBar
        categorias={categorias}
        categoriaActiva={categoria}
        onCategoria={setCategoria}
        vista={vista}
        onVista={setVista}
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        totalVisible={totalVisible}
      />

      {/* Product display */}
      <div className={styles.content}>
        {filtrados.length === 0 ? (
          <EmptyState
            busqueda={busqueda}
            categoria={categoria}
            onReset={() => { setCategoria('all'); setBusqueda(''); }}
          />
        ) : vista === 'lista' ? (
          <ProductList productos={filtrados} categorias={categorias} />
        ) : (
          <ProductGrid productos={filtrados} categorias={categorias} />
        )}
      </div>
    </div>
  );
}

function EmptyState({ busqueda, categoria, onReset }) {
  return (
    <div className={styles.empty}>
      <span className={styles.emptyEmoji}>🌱</span>
      <h3 className={styles.emptyTitle}>No encontramos plantas</h3>
      <p className={styles.emptyDesc}>
        {busqueda
          ? `No hay resultados para "${busqueda}".`
          : `No hay plantas en esa categoría por ahora.`}
      </p>
      <button className={styles.emptyReset} onClick={onReset}>
        Ver todas las plantas →
      </button>
    </div>
  );
}