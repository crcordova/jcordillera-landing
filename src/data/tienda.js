/**
 * tienda.js
 * ─────────────────────────────────────────────────────────────────
 * Fuente de datos del catálogo / tienda de Jardín Cordillera.
 *
 * CÓMO AGREGAR UN PRODUCTO:
 *  1. Copiar un objeto del array y modificar los campos.
 *  2. Agregar imagen en /public/images/tienda/<id>.jpg  (opcional — hay emoji de respaldo)
 *  3. Agregar la categoría en CATEGORIAS si es nueva.
 *
 * ESTRUCTURA DE CADA PRODUCTO:
 *  id              → slug único (sin espacios, sin tildes)
 *  nombre          → nombre comercial visible
 *  nombreCientifico→ nombre científico (itálica)
 *  categoria       → debe coincidir con una key de CATEGORIAS
 *  descripcion     → texto visible en vista mosaico (~80–130 chars)
 *  emoji           → respaldo visual si no hay imagen
 *  imagen          → ruta en /public/ (puede quedar '' si no hay foto aún)
 *  destacado       → aparece con badge "Destacado" y sube al tope
 *  variantes       → array de { tamaño, bolsa, precio }
 *  whatsappExtra   → texto adicional al mensaje WA (opcional)
 * ─────────────────────────────────────────────────────────────────
 */

export const CATEGORIAS = {
  all:       { label: 'Todas',      color: null },
  arbusto:   { label: 'Arbustos',   color: '#e0eed8', textColor: '#253d20' },
  perenne:   { label: 'Perennes',   color: '#dff0e8', textColor: '#1a5c35' },
  trepadora: { label: 'Trepadoras', color: '#f5ecd8', textColor: '#6b3a10' },
  suculenta: { label: 'Suculentas', color: '#fde8d0', textColor: '#7a3e10' },
  interior:  { label: 'Interior',   color: '#e8f0f5', textColor: '#1a3a5c' },
  aromatica: { label: 'Aromáticas', color: '#f0f0e0', textColor: '#4a4a10' },
};

/** Formatea precio CLP → "$14.500" */
export function formatPrecio(precio) {
  return '$' + precio.toLocaleString('es-CL');
}

/** Genera la URL de WhatsApp para un producto (y variante opcional) */
export function getWhatsAppUrl(producto, variante = null) {
  const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56987686499';
  let msg = `Hola, me interesa ${producto.nombre}`;
  if (variante) msg += ` (${variante.tamaño} · ${variante.bolsa})`;
  if (producto.whatsappExtra) msg += `. ${producto.whatsappExtra}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export const productos = [

  // ── ARBUSTOS ─────────────────────────────────────────────────────

  {
    id: 'abelia-enana',
    nombre: 'Abelia Enana',
    nombreCientifico: "Abelia grandiflora 'Nana'",
    categoria: 'arbusto',
    descripcion: 'Arbusto compacto de follaje brillante semi-caduco. Florece en verano con pequeñas flores blanco-rosadas. Muy resistente, ideal para bordes y jardines formales.',
    emoji: '🌸',
    imagen: '/images/tienda/abelia-enana.jpg',
    destacado: true,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 14500 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 19000 },
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 29000 },
    ],
  },

  {
    id: 'laurel-enano',
    nombre: 'Laurel Enano',
    nombreCientifico: 'Laurus nobilis compacta',
    categoria: 'arbusto',
    descripcion: 'Versión compacta del laurel con follaje aromático verde oscuro lustroso. Muy usado en topiario y jardines formales. Excelente para macetones de entrada.',
    emoji: '🌿',
    imagen: '/images/tienda/laurel-enano.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
    ],
  },

  {
    id: 'laurel-de-flor',
    nombre: 'Laurel de Flor',
    nombreCientifico: 'Nerium oleander',
    categoria: 'arbusto',
    descripcion: 'Arbusto de gran vigor con floración abundante en rosa, rojo o blanco. Muy resistente a calor y sequía. Ideal para cercos vivos y pantallas visuales.',
    emoji: '🌺',
    imagen: '/images/tienda/laurel-flor.jpg',
    destacado: true,
    variantes: [
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 16000 },
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 19000 },
    ],
  },

  {
    id: 'viburno-mascanta',
    nombre: 'Viburno Mascanta',
    nombreCientifico: 'Viburnum tinus',
    categoria: 'arbusto',
    descripcion: 'Arbusto siempreverde de porte redondeado con flores blancas en invierno y frutos azulados. Excelente para setos, bordes y jardines naturales.',
    emoji: '🌼',
    imagen: '/images/tienda/viburno.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 39000 },
    ],
  },

  {
    id: 'pitosporo-enano',
    nombre: 'Pitosporo Enano',
    nombreCientifico: "Pittosporum tobira 'Nanum'",
    categoria: 'arbusto',
    descripcion: 'Arbusto compacto de crecimiento lento, follaje verde oscuro lustroso. Sin poda frecuente, muy resistente. Perfecto para bordes bajos y macetones.',
    emoji: '🌱',
    imagen: '/images/tienda/pitosporo.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 4500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 29000 },
    ],
  },

  // ── PERENNES ─────────────────────────────────────────────────────

  {
    id: 'agapantos',
    nombre: 'Agapantos',
    nombreCientifico: 'Agapanthus africanus',
    categoria: 'perenne',
    descripcion: 'Planta perenne de gran impacto con flores azul-violeta en largos tallos. Ideal para bordes, macetones y jardines costeros. Tolera sequía y viento.',
    emoji: '💜',
    imagen: '/images/tienda/agapantos.jpg',
    destacado: true,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 4900 },
    ],
  },

  {
    id: 'dietes',
    nombre: 'Dietes',
    nombreCientifico: 'Dietes iridioides',
    categoria: 'perenne',
    descripcion: 'Perenne de follaje en abanico con flores blancas y amarillas. Versátil, resiste sol pleno y semisombra. Floración prolongada en primavera y verano.',
    emoji: '🌸',
    imagen: '/images/tienda/dietes.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
    ],
  },

  {
    id: 'lavanda',
    nombre: 'Lavanda',
    nombreCientifico: 'Lavandula angustifolia',
    categoria: 'perenne',
    descripcion: 'Icónica perenne aromática de flores violeta en espigas. Atrae polinizadores, repele insectos y perfuma el jardín. Seca bien para uso decorativo.',
    emoji: '💜',
    imagen: '/images/tienda/lavanda.jpg',
    destacado: true,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 5500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12000 },
    ],
  },

  // ── TREPADORAS ───────────────────────────────────────────────────

  {
    id: 'ficus-repens',
    nombre: 'Ficus Repens',
    nombreCientifico: 'Ficus pumila',
    categoria: 'trepadora',
    descripcion: 'Trepadora de hoja pequeña que tapiza muros y cercos con un manto verde uniforme. Se adhiere a superficies sin soporte. Perfecta para cercos y muros.',
    emoji: '🍃',
    imagen: '/images/tienda/ficus-repens.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
    ],
  },

  {
    id: 'jazmín-trepador',
    nombre: 'Jazmín Trepador',
    nombreCientifico: 'Trachelospermum jasminoides',
    categoria: 'trepadora',
    descripcion: 'Trepadora de hoja perenne con flores blancas estrelladas de intenso perfume. Cubre pérgolas y cercos con elegancia. Florece en primavera-verano.',
    emoji: '🤍',
    imagen: '/images/tienda/jazmin-trepador.jpg',
    destacado: true,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 7500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 15000 },
    ],
    whatsappExtra: '¿Tienen disponibilidad?',
  },

  // ── SUCULENTAS ───────────────────────────────────────────────────

  {
    id: 'echeveria',
    nombre: 'Echeveria',
    nombreCientifico: 'Echeveria spp.',
    categoria: 'suculenta',
    descripcion: 'Suculenta en forma de roseta con hojas carnosas de colores que van del verde al rosado. Ideal para macetones, jardines de rocas y terrazas soleadas.',
    emoji: '🌵',
    imagen: '/images/tienda/echeveria.jpg',
    destacado: true,
    variantes: [
      { tamaño: 'Pequeña', bolsa: 'maceta 10 cm', precio: 2500 },
      { tamaño: 'Mediana', bolsa: 'maceta 15 cm', precio: 4500 },
    ],
  },

  {
    id: 'aeonium',
    nombre: 'Aeonium',
    nombreCientifico: 'Aeonium arboreum',
    categoria: 'suculenta',
    descripcion: 'Suculenta arbustiva con rosetas terminales de hojas lustrosas. De crecimiento lento y muy ornamental. Tolera sequía prolongada una vez establecida.',
    emoji: '🌿',
    imagen: '/images/tienda/aeonium.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'Pequeña', bolsa: 'maceta 12 cm', precio: 3500 },
      { tamaño: 'Grande',  bolsa: 'maceta 20 cm', precio: 8500 },
    ],
  },

  // ── PLANTAS DE INTERIOR ──────────────────────────────────────────

  {
    id: 'pothos',
    nombre: 'Pothos',
    nombreCientifico: 'Epipremnum aureum',
    categoria: 'interior',
    descripcion: 'Una de las plantas de interior más resistentes y versátiles. Purifica el aire, crece en luz escasa y es perfecta para colgar o trepar. Cuida vivo.',
    emoji: '🌿',
    imagen: '/images/tienda/pothos.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'Pequeño', bolsa: 'maceta 12 cm', precio: 4500 },
      { tamaño: 'Mediano', bolsa: 'maceta 18 cm', precio: 8500 },
    ],
  },

  {
    id: 'monstera-deliciosa',
    nombre: 'Monstera',
    nombreCientifico: 'Monstera deliciosa',
    categoria: 'interior',
    descripcion: 'La planta tropical más icónica del diseño interior. Sus hojas perforadas de gran tamaño aportan presencia y drama a cualquier espacio. Fácil de cuidar.',
    emoji: '🌴',
    imagen: '/images/tienda/monstera.jpg',
    destacado: true,
    variantes: [
      { tamaño: 'Mediana', bolsa: 'maceta 18 cm', precio: 12000 },
      { tamaño: 'Grande',  bolsa: 'maceta 25 cm', precio: 24000 },
    ],
  },

  // ── AROMÁTICAS ───────────────────────────────────────────────────

  {
    id: 'romero',
    nombre: 'Romero',
    nombreCientifico: 'Rosmarinus officinalis',
    categoria: 'aromatica',
    descripcion: 'Arbusto aromático mediterráneo, ideal para bordes de jardín y macetones de cocina. Flores azuladas en invierno-primavera. Muy resistente a la sequía.',
    emoji: '🌿',
    imagen: '/images/tienda/romero.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 3500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 7500 },
    ],
  },

  {
    id: 'tomillo',
    nombre: 'Tomillo',
    nombreCientifico: 'Thymus vulgaris',
    categoria: 'aromatica',
    descripcion: 'Pequeña planta aromática de uso culinario y ornamental. Tapizante ideal para bordes de senderos. Florece en primavera con pequeñas flores lilas.',
    emoji: '🌱',
    imagen: '/images/tienda/tomillo.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 2900 },
    ],
  },
];

/** Retorna los productos filtrados por categoría */
export function getProductosByCategoria(cat) {
  if (!cat || cat === 'all') return productos;
  return productos.filter((p) => p.categoria === cat);
}

/** Retorna los productos destacados */
export function getDestacados() {
  return productos.filter((p) => p.destacado);
}
