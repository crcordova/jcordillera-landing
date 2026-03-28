import styles from './Footer.module.css';

const WA_NUMBER  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER  || '56987686499';
const WA_MESSAGE = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20Jard%C3%ADn%20Cordillera';
const EMAIL      = process.env.NEXT_PUBLIC_EMAIL            || 'contacto@jardincordillera.cl';
const INSTAGRAM  = process.env.NEXT_PUBLIC_INSTAGRAM        || 'jardincordillera';

const navLinks = [
  { href: '/#hero',     label: 'Inicio' },
  { href: '/#nosotros', label: 'Historia' },
  { href: '/#galeria',  label: 'Galería' },
  { href: '/tienda',    label: 'Tienda' },
  { href: '/#contacto', label: 'Contacto' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Decorative top border */}
      <div className={styles.topBorder} aria-hidden="true">
        <span>✦</span>
      </div>

      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <span className={styles.brandLeaf}>🌿</span>
            <div>
              <p className={styles.brandName}>Jardín Cordillera</p>
              <p className={styles.brandTag}>Vivero Productor · Santiago, Chile</p>
            </div>
          </div>
          <p className={styles.brandDesc}>
            Más de 60 años cultivando plantas con amor y dedicación desde Ocoa hasta tu hogar.
          </p>
        </div>

        {/* Navigation */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Navegación</p>
          <ul className={styles.colLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.colLink}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Contacto</p>
          <ul className={styles.colLinks}>
            <li>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.colLink}
              >
                📱 WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={styles.colLink}>
                ✉️ {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.colLink}
              >
                📷 @{INSTAGRAM}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className={styles.col}>
          <p className={styles.colTitle}>Horarios</p>
          <ul className={styles.colLinks}>
            <li className={styles.colText}>Lun – Jue: 9:00 – 18:00</li>
            <li className={styles.colText}>Viernes: 9:00 – 17:00</li>
            <li className={styles.colText}>Sábado: 9:00 – 14:00</li>
            <li className={styles.colText}>Domingo: Cerrado</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {year} Jardín Cordillera · Todos los derechos reservados
        </p>
        <p className={styles.byline}>
          Camino La Posada 11.900, Las Condes, Santiago
        </p>
      </div>
    </footer>
  );
}
