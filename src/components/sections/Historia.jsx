'use client';

import { useEffect, useRef } from 'react';
import styles from './Historia.module.css';

const values = [
  {
    emoji: '🌿',
    title: 'Conocimiento experto',
    desc: 'Más de 70 años nos avalan. Te asesoramos con honestidad y experiencia real de campo.',
  },
  {
    emoji: '🤝',
    title: 'Trato familiar',
    desc: 'Cada cliente es parte de nuestra historia. Te conocemos por tu nombre, no por tu número.',
  },
  {
    emoji: '🏆',
    title: 'Calidad garantizada',
    desc: 'Seleccionamos nuestras plantas con criterio artesanal. Si no es buena, no sale del vivero.',
  },
  {
    emoji: '🏔️',
    title: 'Raíces en Ocoa',
    desc: 'Desde la montaña nacen las mejores plantas para Santiago. Ese origen es nuestro orgullo.',
  },
];

const timeline = [
  { year: '1955', event: 'Fundación del vivero en Ocoa por la familia Cordillera.' },
  { year: '1980', event: 'Apertura de nuestra sede en Las Condes, Santiago.' },
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
            Más de siete décadas<br />
            <em>con las manos en la tierra</em>
          </h2>
          <p className="section-intro">
            Lo que comenzó como un sueño en las faldas de los Andes se convirtió en el vivero
            de referencia de Santiago. Tres generaciones, una misma pasión: cultivar vida.
          </p>
        </div>

        {/* ── Two-column: story + timeline ── */}
        <div className={styles.storyGrid}>
          {/* Story text */}
          <div className={`${styles.storyText} reveal`}>
            <p>
              En 1955, el abuelo Ramón plantó la primera semilla en Ocoa con una convicción simple:
              que una planta bien cultivada tiene el poder de transformar un espacio y el ánimo de
              quien la cuida. De ese humilde comienzo nació Jardín Cordillera.
            </p>
            <p>
              Con los años, la familia fue creciendo junto al vivero. Cada hijo aprendió a leer la
              tierra, a reconocer cuándo una planta necesita sol o sombra, agua o descanso. Ese
              saber, que no se estudia en ninguna universidad, es el verdadero tesoro que
              heredamos y que hoy compartimos contigo.
            </p>
            <p>
              Hoy somos tres generaciones trabajando juntas en Las Condes. Aquí encontrarás ese
              trato cercano, esa honestidad que solo da el tiempo, y plantas que llegan a tu hogar
              desde la misma montaña que les vio nacer.
            </p>

            <div className={styles.signatureBlock}>
              <div className={styles.signatureLine} />
              <p className={styles.signatureName}>La familia Cordillera</p>
              <p className={styles.signatureRole}>Vivero desde 1955 · Ocoa, Chile</p>
            </div>
          </div>

          {/* Timeline */}
          <div className={`${styles.timeline} reveal`}>
            {timeline.map((item, i) => (
              <div key={item.year} className={styles.timelineItem} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <p className={styles.timelineEvent}>{item.event}</p>
                </div>
              </div>
            ))}
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
