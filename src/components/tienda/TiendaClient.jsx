'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import TiendaHeader from './TiendaHeader';
import FiltroBar from './FiltroBar';
import ProductGrid from './ProductGrid';
import ProductList from './ProductList';
import styles from './TiendaClient.module.css';

export default function TiendaClient({ productos, categorias }) {
  const [vista, setVista]         = useState('lista'); // 'mosaico' | 'lista'
  const [categoria, setCategoria] = useState('all');
  const [busqueda, setBusqueda]   = useState('');

  // ── Leer ?categoria= de la URL al montar ──
  const searchParams = useSearchParams();
  useEffect(() => {
    const cat = searchParams.get('categoria');
     console.log('📌 param URL:', cat);
     console.log('📌 keys disponibles:', Object.entries(categorias).map(([k, v]) => ({ key: k, label: v.label })));

    if (cat) {
      const match = Object.entries(categorias).find(
        ([, v]) => v.label.toLowerCase() === cat.toLowerCase()
      );
      if (match) setCategoria(match[0]);
    }
  }, []);

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
      {/* Header hero */}
      <TiendaHeader totalProductos={productos.length} />

      {/* Sticky filter + view toggle bar */}
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