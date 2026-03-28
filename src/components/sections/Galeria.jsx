'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './Galeria.module.css';
import Link from 'next/link'

export default function Galeria({ items }) {
  const [current, setCurrent]       = useState(0);
  const [direction, setDirection]   = useState('next'); // 'next' | 'prev'
  const [animating, setAnimating]   = useState(false);
  const autoRef                     = useRef(null);
  const total                       = items.length;

  const goTo = useCallback(
    (index, dir = 'next') => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setCurrent((index + total) % total);
      setTimeout(() => setAnimating(false), 520);
    },
    [animating, total]
  );

  const next = useCallback(() => goTo(current + 1, 'next'), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, 'prev'), [current, goTo]);

  // Auto-advance every 5.5s
  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 5500);
  }, [next]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [startAuto]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { prev(); startAuto(); }
      if (e.key === 'ArrowRight') { next(); startAuto(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, startAuto]);

  const item = items[current];

  return (
    <section id="galeria" className={styles.section}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <span className="section-tag">Galería</span>
        <h2 className="section-title">
          Nuestro <em>mundo verde</em>
        </h2>
        <p className="section-intro">
          Un vistazo a lo que encontrarás en Jardín Cordillera: plantas, espacios
          y la magia de la naturaleza en cada rincón.
        </p>
      </div>

      {/* ── Carousel ── */}
      <div
        className={styles.carouselOuter}
        onMouseEnter={() => clearInterval(autoRef.current)}
        onMouseLeave={startAuto}
      >
        <div className={styles.carouselInner}>
          {/* Slide */}
          <div
            className={`${styles.slide} ${animating ? (direction === 'next' ? styles.slideOutLeft : styles.slideOutRight) : styles.slideIn}`}
            key={current}
          >
            {/* Image panel */}
            <div className={styles.imagePanel}>
              <div className={styles.imagePanelInner}>
                {item.imagen ? (
                  <Image
                    src={item.imagen}
                    alt={item.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className={styles.img}
                    priority={current === 0}
                  />
                ) : (
                  <div className={styles.emojiFallback} aria-hidden="true">
                    {item.emoji}
                  </div>
                )}
                <div className={styles.imageOverlay} aria-hidden="true" />
              </div>

              {/* Category badge */}
              <span className={styles.badge}>{item.categoria}</span>

              {/* Progress bar */}
              <div className={styles.progressBar} aria-hidden="true">
                <div
                  className={styles.progressFill}
                  style={{ animationDuration: '5.5s' }}
                />
              </div>
            </div>

            {/* Content panel */}
            <div className={styles.contentPanel}>
              <p className={styles.counter}>
                <span className={styles.counterCurrent}>
                  {String(current + 1).padStart(2, '0')}
                </span>
                <span className={styles.counterTotal}>
                  {' '}/ {String(total).padStart(2, '0')}
                </span>
              </p>

              <h3 className={styles.itemName}>{item.nombre}</h3>

              <div className={styles.dividerLine} aria-hidden="true" />

              <p className={styles.itemDesc}>{item.descripcion}</p>
              <Link
                href={`/tienda?categoria=${encodeURIComponent(item.categoria)}`}
                className={styles.ctaBtn}
              >
                Ver {item.nombre} en tienda →
              </Link>
              {/* Dot navigation */}
              <div className={styles.dots} role="tablist" aria-label="Navegación de galería">
                {items.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Ver ${items[i].nombre}`}
                    className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                    onClick={() => { goTo(i, i > current ? 'next' : 'prev'); startAuto(); }}
                  />
                ))}
              </div>

              {/* Arrow controls */}
              <div className={styles.controls}>
                <button
                  className={styles.arrowBtn}
                  onClick={() => { prev(); startAuto(); }}
                  aria-label="Planta anterior"
                >
                  <ArrowLeftIcon />
                </button>
                <button
                  className={styles.arrowBtn}
                  onClick={() => { next(); startAuto(); }}
                  aria-label="Planta siguiente"
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className={styles.thumbStrip} role="list">
        {items.map((thumb, i) => (
          <button
            key={i}
            role="listitem"
            className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
            onClick={() => { goTo(i, i > current ? 'next' : 'prev'); startAuto(); }}
            aria-label={`Ver ${thumb.nombre}`}
            aria-current={i === current ? 'true' : undefined}
          >
            <span className={styles.thumbEmoji} aria-hidden="true">
              {thumb.emoji}
            </span>
            <span className={styles.thumbLabel}>{thumb.nombre}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
