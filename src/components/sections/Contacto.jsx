'use client';

import { useEffect, useRef } from 'react';
import styles from './Contacto.module.css';

const WA_NUMBER  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER  || '56987686499';
const WA_MESSAGE = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20Jard%C3%ADn%20Cordillera';
const EMAIL      = process.env.NEXT_PUBLIC_EMAIL            || 'contacto@jardincordillera.cl';
const PHONE_FIJO = process.env.NEXT_PUBLIC_PHONE_FIJO       || '+562 2217 8386';
const MAPS_EMBED = process.env.NEXT_PUBLIC_MAPS_EMBED       || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.8!2d-70.5!3d-33.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf3b3a5e5b3f%3A0x0!2sCamino+La+Posada+11900%2C+Las+Condes%2C+Santiago!5e0!3m2!1ses!2scl!4v1710000000000';
const MAPS_LINK  = process.env.NEXT_PUBLIC_MAPS_LINK        || 'https://maps.google.com/?q=Camino+La+Posada+11900,+Las+Condes,+Santiago';

// Three distinct WhatsApp intents
const WA_VISIT   = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const WA_CONSULT = `https://wa.me/${WA_NUMBER}?text=Hola%2C%20necesito%20asesor%C3%ADa%20sobre%20plantas%20para%20mi%20espacio%20`;
const WA_ORDER   = `https://wa.me/${WA_NUMBER}?text=Hola%2C%20quisiera%20hacer%20un%20pedido%20de%20plantas`;


const infoItems = [
  {
    icon: '📍',
    title: 'Dirección',
    lines: ['Camino La Posada 11.900', 'Las Condes, Santiago'],
    link: { href: MAPS_LINK, label: 'Ver en Google Maps →', external: true },
  },
  {
    icon: '🕐',
    title: 'Horarios',
    lines: [
      'Lun – Jue: 9:00 – 18:00',
      'Viernes: 9:00 – 17:00',
      'Sábado: 9:00 – 14:00',
      'Domingo: Cerrado',
    ],
  },
  {
    icon: '📞',
    title: 'Teléfonos',
    lines: [],
    link: { href: `https://wa.me/${WA_NUMBER}`, label: `+56 ${WA_NUMBER.slice(2)}`, external: true },
    extraLink: { href: `tel:${PHONE_FIJO.replace(/\s/g, '')}`, label: PHONE_FIJO },
  },
  {
    icon: '✉️',
    title: 'Email',
    lines: [],
    link: { href: `mailto:${EMAIL}`, label: EMAIL },
  },
];

export default function Contacto() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contacto" className={styles.section} ref={ref}>
      {/* Decorative bg */}
      <div className={styles.bgDecor} aria-hidden="true" />

      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={`${styles.header} reveal`}>
          <span className={styles.tag}>Contáctanos</span>
          <h2 className={styles.title}>
            Ven a <em>visitarnos</em>
          </h2>

        </div>


        {/* ── Info + Map row ── */}
        <div className={styles.infoMapRow}>
          {/* Info grid */}
          <div className={`${styles.infoGrid} reveal`}>
            {infoItems.map((item) => (
              <div key={item.title} className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">{item.icon}</span>
                <div>
                  <p className={styles.infoLabel}>{item.title}</p>
                  {item.lines.map((line) => (
                    <p key={line} className={styles.infoText}>{line}</p>
                  ))}
                  {item.link && (
                    <a
                      href={item.link.href}
                      target={item.link.external ? '_blank' : undefined}
                      rel={item.link.external ? 'noopener noreferrer' : undefined}
                      className={styles.infoLink}
                    >
                      {item.link.label}
                    </a>
                  )}
                  {item.extraLink && (
                    <a href={item.extraLink.href} className={styles.infoLink}>
                      {item.extraLink.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className={`${styles.mapBlock} reveal`}>
            <p className={styles.mapLabel}>📍 Cómo llegar</p>
            <div className={styles.mapFrame}>
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Jardín Cordillera"
              />
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapsLink}
            >
              Abrir en Google Maps →
            </a>
          </div>
        </div>

        {/* ── Bottom WhatsApp banner ── */}
        <div className={`${styles.waBanner} reveal`}>
          <div className={styles.waBannerText}>
            <p className={styles.waBannerTitle}>¿Tienes alguna duda?</p>
            <p className={styles.waBannerSub}>
              Escríbenos y te respondemos a la brevedad. ¡Estamos para ayudarte!
            </p>
          </div>
          <a
            href={WA_VISIT}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waBannerBtn}
          >
            <WhatsAppIcon size={22} />
            Escríbenos por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
