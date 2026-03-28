'use client';

import { useEffect, useRef } from 'react';
import styles from './Historia.module.css';

const values = [
  {
    emoji: '🌿',
    title: 'Conocimiento experto',
    desc: 'Más de 60 años de experiencia guiando cada etapa del cultivo.',
  },
  {
    emoji: '🤝',
    title: 'Trato familiar',
    desc: 'Entendemos tus necesidades, entregamos una atencion cercana y personalizada en cada visita.',
  },
  {
    emoji: '🏆',
    title: 'Calidad garantizada',
    desc: 'Cultivamos nuestras plantas desde el origen, asegurando su desarrollo óptimo.',
  },
  {
    emoji: '🏔️',
    title: 'Raíces en Ocoa',
    desc: 'Producimos en un valle privilegiado, ideal para plantas sanas y fuertes.',
  },
];

const timeline = [
  { year: '1970', event: 'Fundación del vivero por Lucho Estay (el abuelo).' },
  { year: '1991', event: 'Nace Marcos Fabian Estay' },
  { year: '2000', event: 'Segunda generación toma las riendas con nuevas variedades.' },
  { year: '2020', event: 'Tercera generación continúa la tradición con visión moderna.' },
];

export default function Historia() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const targets = sectionRef.current?.querySelectorAll('.reveal');
    targets?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" className={styles.section} ref={sectionRef}>
      {/* Decorative bg */}
      <div className={styles.bgAccent} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── Header ── */}
        <div className={`${styles.header} reveal`}>
          <span className="section-tag">Nuestra Historia</span>
          <h2 className="section-title">
            Más de seis décadas<br />
            <em>con las manos en la tierra</em>
          </h2>
          <p className="section-intro" >
            Tradición familiar y producción propia de plantas ornamentales.
          </p>
        </div>

        {/* ── Two-column: story + timeline ── */}
        <div className={styles.storyGrid}>
          {/* Story text */}
          <div className={`${styles.storyText} reveal`}>
            <p>
              Hace más de 60 años comenzó la historia de Jardín Cordillera, fundada por Luis Estay, 
              jardinero de profesión y gran amante de las plantas.
            </p>
            <p>
              Con el tiempo, su hijo Marcos Estay continuó desarrollando el vivero, ayudando a 
              transformarlo en lo que es hoy. Actualmente la tradición sigue viva con una tercera 
              generación dedicada al mismo oficio.
            </p>
            <p>
              Hoy somos un vivero productor, donde cultivamos nuestras propias especies con 
              dedicación y experiencia en Ocoa, un valle reconocido por sus suelos fértiles y 
              excelentes condiciones para el cultivo.
            </p>
            <p>
              Más de 60 años cultivando plantas y tradición familiar.
            </p>

            <div className={styles.signatureBlock}>
              <div className={styles.signatureLine} />
              <p className={styles.signatureName}>La familia Cordillera</p>
              <p className={styles.signatureRole}>Vivero desde 1966 · Las Condes, Chile</p>
            </div>
          </div>

          {/* Timeline */}
          {/* Founder image */}
          <div className={`${styles.founderImageWrapper} reveal`}>
            <img
              src="/images/abuelo-jardin.png"
              alt="Luis Estay, fundador de Jardín Cordillera"
              className={styles.founderImage}
            />
            <p className={styles.founderCaption}>Luis Estay · Fundador · ~1966</p>
          </div>
        </div>

        {/* ── Values ── */}
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`${styles.valueCard} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className={styles.valueEmoji} role="img" aria-hidden="true">{v.emoji}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
