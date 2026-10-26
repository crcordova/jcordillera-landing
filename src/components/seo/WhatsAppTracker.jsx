'use client';

/**
 * WhatsAppTracker.jsx
 * ─────────────────────────────────────────────────────────────────
 * Medición de clicks en TODOS los CTAs de WhatsApp del sitio.
 *
 * El negocio no tiene e-commerce: el "conversion event" real es la
 * conversación de WhatsApp. Este componente captura cada click en
 * cualquier link `wa.me` (Navbar, Footer, tarjetas de producto, botón
 * flotante) mediante delegación de eventos — sin tocar ningún otro
 * componente.
 *
 * Emite el evento GA4 `click_whatsapp` con:
 *  - link_text       → texto visible del botón
 *  - whatsapp_message→ mensaje preescrito (incluye el nombre de la
 *                      planta/producto que generó el interés)
 *  - page_location   → ruta donde ocurrió el click
 *
 * Si GA4 no está configurado (sin NEXT_PUBLIC_GA_ID), no hace nada.
 * Para marcarlo como "key event" (conversión) en GA4: Admin → Events →
 * toggle "Mark as key event" (ver agents/03-analytics-ga4.md).
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect } from 'react';

export default function WhatsAppTracker() {
  useEffect(() => {
    const handleClick = (e) => {
      // Solo si GA4 está activo
      if (typeof window.gtag !== 'function') return;

      // Busca el <a href*="wa.me"> más cercano al elemento clickeado
      // (funciona aunque el click parta en un SVG/icono interno)
      const link = e.target?.closest?.('a[href*="wa.me"]');
      if (!link) return;

      try {
        const href = link.getAttribute('href') || '';
        const params = new URLSearchParams(href.split('?')[1] || '');
        const message = params.get('text') || '';

        window.gtag('event', 'click_whatsapp', {
          link_text: (link.textContent || '').trim().slice(0, 80),
          whatsapp_message: message.slice(0, 120),
          page_location: window.location.pathname,
        });
      } catch {
        //nunca romper la UX por analytics
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
