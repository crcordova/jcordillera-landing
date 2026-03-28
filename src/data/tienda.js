/**
 * tienda.js
 * ─────────────────────────────────────────────────────────────────
 * Fuente de datos del catálogo / tienda de Jardín Cordillera.
 * Temporada 2025 — 119 especies / 161 variantes
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
  all:        { label: 'Todas',       color: null },
  arbusto:    { label: 'Arbustos',    color: '#e0eed8', textColor: '#253d20' },
  arbol:      { label: 'Árboles',     color: '#d4ecd4', textColor: '#1a4a1a' },
  trepadora:  { label: 'Trepadoras',  color: '#f5ecd8', textColor: '#6b3a10' },
  cubresuelo: { label: 'Cubresue­lo', color: '#e8f0f8', textColor: '#1a3a6b' },
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
    id: 'abelia-arbustiva',
    nombre: 'Abelia Arbustiva',
    nombreCientifico: 'Abelia grandiflora',
    categoria: 'arbusto',
    descripcion: 'Arbusto semi-caducifolio de porte erguido con flores blanco-rosadas en verano. Muy adaptable y resistente. Ideal para setos informales y jardines naturales.',
    emoji: '🌸',
    imagen: '/images/tienda/abelia-arbustiva.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 9500 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 16000 },
    ],
  },

  {
    id: 'abelia-enana',
    nombre: 'Abelia Enana',
    nombreCientifico: "Abelia grandiflora 'Nana'",
    categoria: 'arbusto',
    descripcion: 'Arbusto compacto de follaje brillante semi-caduco con pequeñas flores blanco-rosadas. Muy resistente, ideal para bordes y jardines formales.',
    emoji: '🌸',
    imagen: '/images/tienda/abelia-enana.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 14500 },
    ],
  },

  {
    id: 'abelia-enana-extra',
    nombre: 'Abelia Enana Extra',
    nombreCientifico: "Abelia grandiflora 'Nana' extra",
    categoria: 'arbusto',
    descripcion: 'Ejemplar de abelia enana de mayor desarrollo. Compacta y vigorosa, perfecta para borduras amplias y jardines de diseño.',
    emoji: '🌸',
    imagen: '/images/tienda/abelia-enana-extra.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 29000 },
    ],
  },

  {
    id: 'abelia-golden',
    nombre: 'Abelia Golden',
    nombreCientifico: "Abelia × grandiflora 'Golden'",
    categoria: 'arbusto',
    descripcion: 'Variedad de follaje dorado de alto impacto ornamental. Flores pequeñas blancas en verano. Excelente para contraste cromático en jardines.',
    emoji: '🌼',
    imagen: '/images/tienda/abelia-golden.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 9500 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 14500 },
    ],
  },

  {
    id: 'agapanto',
    nombre: 'Agapanto',
    nombreCientifico: 'Agapanthus africanus',
    categoria: 'arbusto',
    descripcion: 'Perenne de gran impacto con flores azul-violeta en largos tallos. Ideal para bordes, macetones y jardines costeros. Tolera sequía y viento.',
    emoji: '💜',
    imagen: '/images/tienda/agapanto.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 4900 },
    ],
  },

  {
    id: 'agapanto-enano-azul',
    nombre: 'Agapanto Enano Azul',
    nombreCientifico: "Agapanthus africanus 'Blue Baby'",
    categoria: 'arbusto',
    descripcion: 'Variedad enana con flores azul intenso. Perfecta para macetones y bordes estrechos. Floración estival abundante.',
    emoji: '💙',
    imagen: '/images/tienda/agapanto-enano-azul.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
    ],
  },

  {
    id: 'agapanto-enano-blanco',
    nombre: 'Agapanto Enano Blanco',
    nombreCientifico: "Agapanthus africanus 'Albus'",
    categoria: 'arbusto',
    descripcion: 'Variedad enana de flores blancas inmaculadas. Elegante y versátil. Resistente y de bajo mantenimiento.',
    emoji: '🤍',
    imagen: '/images/tienda/agapanto-enano-blanco.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 9500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
    ],
  },

  {
    id: 'allium',
    nombre: 'Allium',
    nombreCientifico: 'Allium spp.',
    categoria: 'arbusto',
    descripcion: 'Bulbosa ornamental con flores esféricas en tonos morados y violetas. Muy impactante en masa. Floración primaveral de larga duración.',
    emoji: '🟣',
    imagen: '/images/tienda/allium.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 4900 },
    ],
  },

  {
    id: 'anemonas',
    nombre: 'Anémonas',
    nombreCientifico: 'Anemone coronaria',
    categoria: 'arbusto',
    descripcion: 'Flores de gran belleza en tonos rojos, blancos y morados sobre tallos esbeltos. Floración primaveral de alto impacto.',
    emoji: '🌺',
    imagen: '/images/tienda/anemonas.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-17', bolsa: 'maceta 17 cm', precio: 7500 },
    ],
  },

  {
    id: 'arrayan-enano',
    nombre: 'Arrayán Enano',
    nombreCientifico: 'Myrtus communis compacta',
    categoria: 'arbusto',
    descripcion: 'Arbusto aromático siempreverde de hoja pequeña y brillante. Muy usado en topiari y borduras formales. Crece lento y requiere poca poda.',
    emoji: '🌿',
    imagen: '/images/tienda/arrayan-enano.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
    ],
  },

  {
    id: 'boj',
    nombre: 'Boj',
    nombreCientifico: 'Buxus sempervirens',
    categoria: 'arbusto',
    descripcion: 'Clásico arbusto siempreverde de hoja pequeña y textura fina. Referente del jardín formal y el topiari. De crecimiento lento y gran longevidad.',
    emoji: '🌱',
    imagen: '/images/tienda/boj.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-25', bolsa: 'bolsa 25 cm', precio: 19000 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 29000 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 39000 },
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 49000 },
    ],
  },

  {
    id: 'buddleja',
    nombre: 'Buddleja',
    nombreCientifico: 'Buddleja davidii',
    categoria: 'arbusto',
    descripcion: 'Arbusto de rápido crecimiento con largas espigas en lila, morado o blanco. Muy atractivo para mariposas. Florece en verano y otoño.',
    emoji: '🦋',
    imagen: '/images/tienda/buddleja.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 16000 },
    ],
  },

  {
    id: 'cala',
    nombre: 'Cala',
    nombreCientifico: 'Zantedeschia aethiopica',
    categoria: 'arbusto',
    descripcion: 'Planta de gran elegancia con espatas blancas sobre follaje verde brillante. Crece en suelos húmedos y semisombra. Muy usada en jardines y corte.',
    emoji: '🤍',
    imagen: '/images/tienda/cala.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 14500 },
    ],
  },

  {
    id: 'calibrachoa',
    nombre: 'Calibrachoa',
    nombreCientifico: 'Calibrachoa × hybrida',
    categoria: 'arbusto',
    descripcion: 'Planta colgante de abundante floración en múltiples colores. Ideal para macetones y jardineras. Florece desde primavera hasta otoño.',
    emoji: '🌸',
    imagen: '/images/tienda/calibrachoa.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-14', bolsa: 'maceta 14 cm', precio: 7500 },
    ],
  },

  {
    id: 'calle-calle',
    nombre: 'Calle Calle',
    nombreCientifico: 'Libertia grandiflora',
    categoria: 'arbusto',
    descripcion: 'Perenne chilena nativa de follaje en abanico con flores blancas delicadas. Muy resistente y adaptada al clima local.',
    emoji: '🌾',
    imagen: '/images/tienda/calle-calle.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
    ],
  },

  {
    id: 'ceanothus-arbustivo',
    nombre: 'Ceanothus Arbustivo',
    nombreCientifico: 'Ceanothus thyrsiflorus',
    categoria: 'arbusto',
    descripcion: 'Arbusto californiano de porte erguido con racimos de flores azul cielo en primavera. Muy vistoso y resistente a la sequía.',
    emoji: '💙',
    imagen: '/images/tienda/ceanothus-arbustivo.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
    ],
  },

  {
    id: 'ceanothus-rastrero',
    nombre: 'Ceanothus Rastrero',
    nombreCientifico: 'Ceanothus thyrsiflorus repens',
    categoria: 'arbusto',
    descripcion: 'Arbusto californiano rastrero con flores azul intenso en primavera. Excelente cobertura de taludes y bordes.',
    emoji: '💙',
    imagen: '/images/tienda/ceanothus-rastrero.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 16000 },
    ],
  },

  {
    id: 'choysia',
    nombre: 'Choysia',
    nombreCientifico: 'Choisya ternata',
    categoria: 'arbusto',
    descripcion: 'Arbusto aromático siempreverde con flores blancas estrelladas. Excelente para setos perfumados y jardines de bajo mantenimiento.',
    emoji: '🌿',
    imagen: '/images/tienda/choysia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 39000 },
    ],
  },

  {
    id: 'cola-de-zorro',
    nombre: 'Cola de Zorro',
    nombreCientifico: 'Pennisetum setaceum',
    categoria: 'arbusto',
    descripcion: 'Gramínea ornamental con espigas plumosas rojizas en verano. Gran movimiento y textura en el jardín. Resistente a calor y sequía.',
    emoji: '🌾',
    imagen: '/images/tienda/cola-de-zorro.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
    ],
  },

  {
    id: 'dietes',
    nombre: 'Dietes',
    nombreCientifico: 'Dietes iridioides',
    categoria: 'arbusto',
    descripcion: 'Perenne de follaje en abanico con flores blancas y amarillas. Versátil, resiste sol pleno y semisombra. Floración prolongada.',
    emoji: '🌸',
    imagen: '/images/tienda/dietes.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
    ],
  },

  {
    id: 'dietes-extra',
    nombre: 'Dietes Extra',
    nombreCientifico: 'Dietes iridioides extra',
    categoria: 'arbusto',
    descripcion: 'Ejemplar de dietes de mayor desarrollo con abundante floración blanca. Perfecta para bordes amplios y macetones grandes.',
    emoji: '🌸',
    imagen: '/images/tienda/dietes-extra.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
    ],
  },

  {
    id: 'diosma',
    nombre: 'Diosma',
    nombreCientifico: 'Coleonema pulchrum',
    categoria: 'arbusto',
    descripcion: 'Arbusto aromático de follaje fino y plumoso con pequeñas flores rosadas. Textura aérea y elegante. Ideal para bordes y jardines mediterráneos.',
    emoji: '🌸',
    imagen: '/images/tienda/diosma.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 14500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
      { tamaño: 'M-35', bolsa: 'maceta 35 cm', precio: 35000 },
    ],
  },

  {
    id: 'diosma-coleonema',
    nombre: 'Diosma Coleonema',
    nombreCientifico: 'Coleonema pulchrum',
    categoria: 'arbusto',
    descripcion: 'Arbusto aromático de follaje muy fino y plumoso muy perfumado. Textura aérea distinguida en macetones y bordes formales.',
    emoji: '🌸',
    imagen: '/images/tienda/diosma-coleonema.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-17', bolsa: 'maceta 17 cm', precio: 16000 },
      { tamaño: 'M-35', bolsa: 'maceta 35 cm', precio: 35000 },
    ],
  },

  {
    id: 'equisetum',
    nombre: 'Equisetum',
    nombreCientifico: 'Equisetum hyemale',
    categoria: 'arbusto',
    descripcion: 'Planta de tallos erectos verdes articulados de gran valor ornamental. Ideal para bordes de estanques y jardines zen.',
    emoji: '🎋',
    imagen: '/images/tienda/equisetum.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 14500 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 19000 },
    ],
  },

  {
    id: 'erysimum',
    nombre: 'Erysimum',
    nombreCientifico: 'Erysimum cheiri',
    categoria: 'arbusto',
    descripcion: 'Planta de floración vibrante en amarillos, naranjas y rojos. Muy perfumada y atractiva para polinizadores.',
    emoji: '🌼',
    imagen: '/images/tienda/erysimum.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
    ],
  },

  {
    id: 'fucsia',
    nombre: 'Fucsia',
    nombreCientifico: 'Fuchsia × hybrida',
    categoria: 'arbusto',
    descripcion: 'Planta de flores bicolores colgantes en fucsia, rojo y morado. Perfecta para semisombra. Floración primavera-otoño.',
    emoji: '🌺',
    imagen: '/images/tienda/fucsia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 4500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 9500 },
    ],
  },

  {
    id: 'gaura-blanca',
    nombre: 'Gaura Blanca',
    nombreCientifico: "Gaura lindheimeri 'Alba'",
    categoria: 'arbusto',
    descripcion: 'Perenne de tallos ondulantes con flores blancas tipo mariposa. Gran movimiento y ligereza en el jardín. Resiste calor y sequía.',
    emoji: '🤍',
    imagen: '/images/tienda/gaura-blanca.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
    ],
  },

  {
    id: 'gaura-roja',
    nombre: 'Gaura Roja',
    nombreCientifico: "Gaura lindheimeri 'Siskiyou Pink'",
    categoria: 'arbusto',
    descripcion: 'Variedad de gaura con flores en tonos rosa-rojizo sobre tallos esbeltos. Floración prolongada de primavera a otoño.',
    emoji: '🌸',
    imagen: '/images/tienda/gaura-roja.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 6500 },
    ],
  },

  {
    id: 'geranios',
    nombre: 'Geranios',
    nombreCientifico: 'Pelargonium × hortorum',
    categoria: 'arbusto',
    descripcion: 'Planta de floración exuberante en rojos, rosas y blancos. Resistente al calor y muy longeva. Clásico de jardines y macetones.',
    emoji: '🌺',
    imagen: '/images/tienda/geranios.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 4900 },
    ],
  },

  {
    id: 'gomero',
    nombre: 'Gomero',
    nombreCientifico: 'Ficus elastica',
    categoria: 'arbusto',
    descripcion: 'Planta de grandes hojas coriáceas verde oscuro brillante. Clásico de interiores luminosos. De crecimiento moderado y muy longevo.',
    emoji: '🌿',
    imagen: '/images/tienda/gomero.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-17', bolsa: 'maceta 17 cm', precio: 12500 },
    ],
  },

  {
    id: 'helecho-costilla-de-vaca',
    nombre: 'Helecho Costilla de Vaca',
    nombreCientifico: 'Blechnum chilense',
    categoria: 'arbusto',
    descripcion: 'Helecho nativo chileno de grandes frondes arqueadas verde brillante. Ideal para zonas de sombra húmeda. Muy resistente.',
    emoji: '🌿',
    imagen: '/images/tienda/helecho-costilla-de-vaca.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
    ],
  },

  {
    id: 'helecho-meyeri',
    nombre: 'Helecho Meyeri',
    nombreCientifico: "Asparagus densiflorus 'Myers'",
    categoria: 'arbusto',
    descripcion: 'Helecho espárrago de tallos erectos en forma de pluma muy decorativos. Ideal para macetones y bordes sombreados.',
    emoji: '🌿',
    imagen: '/images/tienda/helecho-meyeri.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-17', bolsa: 'maceta 17 cm', precio: 19000 },
    ],
  },

  {
    id: 'helecho-zanahora',
    nombre: 'Helecho Zanahora',
    nombreCientifico: "Asparagus densiflorus 'Sprengeri'",
    categoria: 'arbusto',
    descripcion: 'Helecho espárrago colgante de follaje fino y plumoso verde brillante. Perfecto para macetones colgantes y bordes.',
    emoji: '🌿',
    imagen: '/images/tienda/helecho-zanahora.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-17', bolsa: 'maceta 17 cm', precio: 19000 },
    ],
  },

  {
    id: 'hemerocalli',
    nombre: 'Hemerocalli',
    nombreCientifico: 'Hemerocallis spp.',
    categoria: 'arbusto',
    descripcion: 'Perenne de flores en amarillo, naranja y rojo que se renuevan constantemente. Muy rústica, tolera sol pleno y semisombra.',
    emoji: '🌼',
    imagen: '/images/tienda/hemerocalli.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 6500 },
    ],
  },

  {
    id: 'hierba',
    nombre: 'Hierba',
    nombreCientifico: 'Gramínea ornamental',
    categoria: 'arbusto',
    descripcion: 'Gramínea de bajo porte ideal para relleno de canteros y bordes. Textura fina y natural. Muy económica y de fácil mantención.',
    emoji: '🌾',
    imagen: '/images/tienda/hierba.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-14', bolsa: 'maceta 14 cm', precio: 1900 },
    ],
  },

  {
    id: 'hortensia',
    nombre: 'Hortensia',
    nombreCientifico: 'Hydrangea macrophylla',
    categoria: 'arbusto',
    descripcion: 'Arbusto de gran floración estival con cabezas florales en azul, rosa o blanco. Prefiere semisombra y suelos frescos.',
    emoji: '💙',
    imagen: '/images/tienda/hortensia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
    ],
  },

  {
    id: 'hortensia-quercifolia',
    nombre: 'Hortensia Quercifolia',
    nombreCientifico: 'Hydrangea quercifolia',
    categoria: 'arbusto',
    descripcion: 'Hortensia de hoja en forma de roble con espigas florales blancas y espectacular follaje rojizo en otoño.',
    emoji: '🍂',
    imagen: '/images/tienda/hortensia-quercifolia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-45', bolsa: 'bolsa 45 cm', precio: 26000 },
    ],
  },

  {
    id: 'jazmin-del-cabo',
    nombre: 'Jazmín del Cabo',
    nombreCientifico: 'Gardenia jasminoides',
    categoria: 'arbusto',
    descripcion: 'Arbusto de flores blancas muy perfumadas y follaje verde oscuro lustroso. Fragancia inigualable en primavera-verano.',
    emoji: '🤍',
    imagen: '/images/tienda/jazmin-del-cabo.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 26000 },
    ],
  },

  {
    id: 'laurel-de-comer',
    nombre: 'Laurel de Comer',
    nombreCientifico: 'Laurus nobilis',
    categoria: 'arbusto',
    descripcion: 'Árbol aromático siempreverde de hoja culinaria. Follaje verde oscuro lustroso con fragancia característica. Excelente para topiari.',
    emoji: '🌿',
    imagen: '/images/tienda/laurel-de-comer.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-45', bolsa: 'bolsa 45 cm', precio: 75000 },
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 95000 },
    ],
  },

  {
    id: 'laurel-enano',
    nombre: 'Laurel Enano',
    nombreCientifico: 'Laurus nobilis compacta',
    categoria: 'arbusto',
    descripcion: 'Versión compacta del laurel, con follaje aromático verde oscuro lustroso. Muy usado en topiari y jardines formales.',
    emoji: '🌿',
    imagen: '/images/tienda/laurel-enano.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 19000 },
    ],
  },

  {
    id: 'laurel-flor',
    nombre: 'Laurel Flor',
    nombreCientifico: 'Nerium oleander',
    categoria: 'arbusto',
    descripcion: 'Arbusto de gran vigor con floración abundante en rosa, rojo o blanco. Muy resistente a calor y sequía. Ideal para cercos vivos.',
    emoji: '🌺',
    imagen: '/images/tienda/laurel-flor.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 16000 },
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 19000 },
    ],
  },

  {
    id: 'laurel-flor-blanco',
    nombre: 'Laurel Flor Blanco',
    nombreCientifico: "Nerium oleander 'Album'",
    categoria: 'arbusto',
    descripcion: 'Variedad de laurel de flor con flores blancas puras. Muy resistente y de floración exuberante. Ideal para cercos y pantallas.',
    emoji: '🤍',
    imagen: '/images/tienda/laurel-flor-blanco.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
    ],
  },

  {
    id: 'laurentinas',
    nombre: 'Laurentinas',
    nombreCientifico: 'Viburnum tinus',
    categoria: 'arbusto',
    descripcion: 'Arbusto siempreverde con flores blancas invernales y frutos azul-negro. Muy usado como seto alto y pantalla visual. Gran resistencia.',
    emoji: '🌼',
    imagen: '/images/tienda/laurentinas.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 19000 },
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 39000 },
      { tamaño: 'B-45', bolsa: 'bolsa 45 cm', precio: 49000 },
    ],
  },

  {
    id: 'lavanda-francesa',
    nombre: 'Lavanda Francesa',
    nombreCientifico: 'Lavandula dentata',
    categoria: 'arbusto',
    descripcion: 'Lavanda de hoja dentada con floración casi continua. Más tolerante a humedad que la inglesa. Aroma intenso y muy atractiva para abejas.',
    emoji: '💜',
    imagen: '/images/tienda/lavanda-francesa.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 9500 },
    ],
  },

  {
    id: 'lavanda-inglesa',
    nombre: 'Lavanda Inglesa',
    nombreCientifico: 'Lavandula angustifolia',
    categoria: 'arbusto',
    descripcion: 'Variedad clásica de lavanda con espigas de color violeta intenso y porte compacto. Muy aromática y resistente.',
    emoji: '💜',
    imagen: '/images/tienda/lavanda-inglesa.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
    ],
  },

  {
    id: 'lavanda-stoecha',
    nombre: 'Lavanda Stoecha',
    nombreCientifico: 'Lavandula stoechas',
    categoria: 'arbusto',
    descripcion: 'Lavanda de flores con brácteas aladas en violeta y púrpura. Muy decorativa y aromática. Resistente a sequía y calor.',
    emoji: '💜',
    imagen: '/images/tienda/lavanda-stoecha.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-14', bolsa: 'maceta 14 cm', precio: 12500 },
    ],
  },

  {
    id: 'lavatera',
    nombre: 'Lavatera',
    nombreCientifico: 'Lavatera trimestris',
    categoria: 'arbusto',
    descripcion: 'Arbusto de rápido crecimiento con grandes flores en rosa o blanco durante todo el verano. Muy vistoso y fácil de cultivar.',
    emoji: '🌸',
    imagen: '/images/tienda/lavatera.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 9500 },
    ],
  },

  {
    id: 'ligustro-compacto',
    nombre: 'Ligustro Compacto',
    nombreCientifico: 'Ligustrum japonicum compactum',
    categoria: 'arbusto',
    descripcion: 'Arbusto siempreverde de hoja pequeña y crecimiento compacto. Muy usado para setos formales y topiari. Tolera poda intensa.',
    emoji: '🌿',
    imagen: '/images/tienda/ligustro-compacto.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-45', bolsa: 'bolsa 45 cm', precio: 49000 },
    ],
  },

  {
    id: 'liriope',
    nombre: 'Liriope',
    nombreCientifico: 'Liriope muscari',
    categoria: 'arbusto',
    descripcion: 'Perenne tapizante de follaje acintado con espigas de flores moradas. Muy resistente a sombra y sequía. Ideal para bordes bajo árboles.',
    emoji: '💜',
    imagen: '/images/tienda/liriope.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 4900 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 6500 },
    ],
  },

  {
    id: 'madrono',
    nombre: 'Madroño',
    nombreCientifico: 'Arbutus unedo',
    categoria: 'arbusto',
    descripcion: 'Árbol mediterráneo siempreverde con flores campanuladas blancas y frutos rojos esféricos simultáneos. Muy ornamental y resistente.',
    emoji: '🍒',
    imagen: '/images/tienda/madrono.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 75000 },
    ],
  },

  {
    id: 'manto-de-eva',
    nombre: 'Manto de Eva',
    nombreCientifico: 'Glechoma hederacea',
    categoria: 'arbusto',
    descripcion: 'Tapizante colgante de follaje redondeado verde plateado. Ideal para macetones altos y taludes. Crecimiento rápido y muy decorativo.',
    emoji: '🍃',
    imagen: '/images/tienda/manto-de-eva.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 60000 },
    ],
  },

  {
    id: 'mirto-hamburgues',
    nombre: 'Mirto Hamburgués',
    nombreCientifico: "Myrtus communis 'Hamburg'",
    categoria: 'arbusto',
    descripcion: 'Variedad de mirto de follaje oscuro brillante y aroma intenso. Flores blancas en verano. Muy usado en setos formales y topiari.',
    emoji: '🌿',
    imagen: '/images/tienda/mirto-hamburgues.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 14500 },
    ],
  },

  {
    id: 'nandina',
    nombre: 'Nandina',
    nombreCientifico: 'Nandina domestica',
    categoria: 'arbusto',
    descripcion: 'Arbusto de follaje tipo bambú con tonos rojos en otoño-invierno y frutos decorativos. Muy versátil, tolera sol y sombra.',
    emoji: '🍂',
    imagen: '/images/tienda/nandina.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 9500 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 12500 },
    ],
  },

  {
    id: 'nandina-extra',
    nombre: 'Nandina Extra',
    nombreCientifico: 'Nandina domestica extra',
    categoria: 'arbusto',
    descripcion: 'Ejemplar de nandina de mayor tamaño. Follaje colorido todo el año con intensos rojos invernales. Ideal para jardines de diseño.',
    emoji: '🍂',
    imagen: '/images/tienda/nandina-extra.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 19000 },
    ],
  },

  {
    id: 'nigricans',
    nombre: 'Nigricans',
    nombreCientifico: 'Melaleuca nesophila',
    categoria: 'arbusto',
    descripcion: 'Arbusto australiano de follaje oscuro con flores rosadas tipo pompón. Muy resistente a sequía, viento y suelos pobres.',
    emoji: '🌸',
    imagen: '/images/tienda/nigricans.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
    ],
  },

  {
    id: 'palmera-kentia',
    nombre: 'Palmera Kentia',
    nombreCientifico: 'Howea forsteriana',
    categoria: 'arbusto',
    descripcion: 'Palmera elegante de frondes arqueadas verde oscuro. Ideal para exteriores protegidos e interiores luminosos. Una de las más cultivadas.',
    emoji: '🌴',
    imagen: '/images/tienda/palmera-kentia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-45', bolsa: 'maceta 45 cm', precio: 150000 },
    ],
  },

  {
    id: 'paquerette-californiano',
    nombre: 'Paquerette Californiano',
    nombreCientifico: 'Osteospermum ecklonis',
    categoria: 'arbusto',
    descripcion: 'Perenne tapizante con flores tipo margarita en blanco, rosa y morado. Floración abundante en primavera. Muy resistente al sol.',
    emoji: '🌸',
    imagen: '/images/tienda/paquerette-californiano.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 19000 },
    ],
  },

  {
    id: 'pennisetum',
    nombre: 'Pennisetum',
    nombreCientifico: 'Pennisetum alopecuroides',
    categoria: 'arbusto',
    descripcion: 'Gramínea ornamental con espigas plumosas que oscilan con el viento. Aporta textura y movimiento. Resistente al calor y sequía.',
    emoji: '🌾',
    imagen: '/images/tienda/pennisetum.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
    ],
  },

  {
    id: 'perovskia',
    nombre: 'Perovskia',
    nombreCientifico: 'Perovskia atriplicifolia',
    categoria: 'arbusto',
    descripcion: 'Subarbusto aromático con finas espigas azul-lavanda sobre tallos blanquecinos. Muy resistente a calor y sequía. Jardines mediterráneos.',
    emoji: '💜',
    imagen: '/images/tienda/perovskia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
    ],
  },

  {
    id: 'phillica',
    nombre: 'Phillica',
    nombreCientifico: 'Phylica pubescens',
    categoria: 'arbusto',
    descripcion: 'Arbusto sudafricano de follaje plumoso plateado-verdoso con pequeñas flores blancas. Textura muy decorativa. Resistente a condiciones secas.',
    emoji: '🌿',
    imagen: '/images/tienda/phillica.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
    ],
  },

  {
    id: 'philodendro-longifolio',
    nombre: 'Philodendro Longifolio',
    nombreCientifico: 'Philodendron bipennifolium',
    categoria: 'arbusto',
    descripcion: 'Planta tropical de grandes hojas alargadas y brillantes. Ideal para interiores luminosos y exteriores con sombra.',
    emoji: '🌿',
    imagen: '/images/tienda/philodendro-longifolio.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-17', bolsa: 'maceta 17 cm', precio: 12500 },
    ],
  },

  {
    id: 'philodendro-monstera',
    nombre: 'Philodendro Monstera',
    nombreCientifico: 'Monstera deliciosa',
    categoria: 'arbusto',
    descripcion: 'Icónica planta tropical de hojas perforadas. Muy popular en interiores y jardines con sombra. Aporta aspecto exótico.',
    emoji: '🌴',
    imagen: '/images/tienda/philodendro-monstera.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-17', bolsa: 'maceta 17 cm', precio: 12500 },
    ],
  },

  {
    id: 'philodendro-paraguayo',
    nombre: 'Philodendro Paraguayo',
    nombreCientifico: 'Philodendron bipinnatifidum',
    categoria: 'arbusto',
    descripcion: 'Philodendro de grandes hojas recortadas de origen sudamericano. Excelente para interiores amplios y exteriores tropicales.',
    emoji: '🌿',
    imagen: '/images/tienda/philodendro-paraguayo.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-17', bolsa: 'maceta 17 cm', precio: 12500 },
    ],
  },

  {
    id: 'photinia',
    nombre: 'Photinia',
    nombreCientifico: 'Photinia × fraseri',
    categoria: 'arbusto',
    descripcion: 'Arbusto con llamativos brotes rojos en primavera que contrastan con el verde maduro. Muy usado como seto ornamental.',
    emoji: '🍂',
    imagen: '/images/tienda/photinia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 49000 },
    ],
  },

  {
    id: 'pita',
    nombre: 'Pita',
    nombreCientifico: 'Agave americana',
    categoria: 'arbusto',
    descripcion: 'Suculenta de gran porte con hojas carnosas en roseta. Muy resistente a sequía y calor. Elemento escultórico de gran impacto.',
    emoji: '🌵',
    imagen: '/images/tienda/pita.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 58000 },
    ],
  },

  {
    id: 'pita-variegada',
    nombre: 'Pita Variegada',
    nombreCientifico: "Agave americana 'Variegata'",
    categoria: 'arbusto',
    descripcion: 'Variedad de agave con hojas bordeadas en amarillo-crema. Escultura vegetal para jardines de diseño. Muy resistente y longeva.',
    emoji: '🌵',
    imagen: '/images/tienda/pita-variegada.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 29000 },
    ],
  },

  {
    id: 'pitosporo-argentivo-var',
    nombre: 'Pitosporo Argentivo Var',
    nombreCientifico: 'Pittosporum tenuifolium variegatum',
    categoria: 'arbusto',
    descripcion: 'Pitosporo de follaje variegado en verde y crema. Porte erguido y elegante. Excelente para contraste cromático en jardines.',
    emoji: '🌿',
    imagen: '/images/tienda/pitosporo-argentivo-var.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 16000 },
    ],
  },

  {
    id: 'pitosporo-enano',
    nombre: 'Pitosporo Enano',
    nombreCientifico: "Pittosporum tobira 'Nanum'",
    categoria: 'arbusto',
    descripcion: 'Arbusto compacto de crecimiento lento, follaje verde oscuro lustroso. Sin poda frecuente, muy resistente. Perfecto para bordes bajos.',
    emoji: '🌱',
    imagen: '/images/tienda/pitosporo-enano.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 4500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 29000 },
    ],
  },

  {
    id: 'pitosporo-tobira',
    nombre: 'Pitosporo Tobira',
    nombreCientifico: 'Pittosporum tobira',
    categoria: 'arbusto',
    descripcion: 'Arbusto siempreverde de follaje verde oscuro lustroso con flores blancas muy perfumadas en primavera. Clásico en jardines mediterráneos.',
    emoji: '🌿',
    imagen: '/images/tienda/pitosporo-tobira.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 29000 },
      { tamaño: 'B-45', bolsa: 'bolsa 45 cm', precio: 39000 },
    ],
  },

  {
    id: 'plumbago-celeste',
    nombre: 'Plumbago Celeste',
    nombreCientifico: 'Plumbago auriculata',
    categoria: 'arbusto',
    descripcion: 'Arbusto semi-trepador con abundantes flores azul-celeste durante casi todo el año. Muy resistente al calor. Ideal para cercos y pérgolas.',
    emoji: '💙',
    imagen: '/images/tienda/plumbago-celeste.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 26000 },
    ],
  },

  {
    id: 'polygala',
    nombre: 'Polygala',
    nombreCientifico: 'Polygala myrtifolia',
    categoria: 'arbusto',
    descripcion: 'Arbusto de floración casi continua con flores en tonos violeta y magenta. Muy resistente. Atractivo para mariposas y polinizadores.',
    emoji: '💜',
    imagen: '/images/tienda/polygala.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-25', bolsa: 'bolsa 25 cm', precio: 9500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 14500 },
    ],
  },

  {
    id: 'rhus',
    nombre: 'Rhus',
    nombreCientifico: 'Rhus lancea',
    categoria: 'arbusto',
    descripcion: 'Árbol o arbusto de follaje colgante fino y elegante. Muy resistente a la sequía y el calor. Crecimiento rápido. Ideal para jardines xéricos.',
    emoji: '🌿',
    imagen: '/images/tienda/rhus.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 3500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 7500 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 12500 },
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 19000 },
    ],
  },

  {
    id: 'romero-rastrero',
    nombre: 'Romero Rastrero',
    nombreCientifico: 'Rosmarinus officinalis prostratus',
    categoria: 'arbusto',
    descripcion: 'Variedad rastrera del romero con tallos colgantes muy decorativos. Aromático y resistente a sequía. Ideal para taludes y muros.',
    emoji: '🌿',
    imagen: '/images/tienda/romero-rastrero.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 4500 },
    ],
  },

  {
    id: 'romero-tuscani-blue',
    nombre: 'Romero Tuscani Blue',
    nombreCientifico: "Rosmarinus officinalis 'Tuscani Blue'",
    categoria: 'arbusto',
    descripcion: 'Variedad de romero erguido con flores azul intenso muy vistosas. Muy aromático y resistente. Excelente para setos bajos mediterráneos.',
    emoji: '💙',
    imagen: '/images/tienda/romero-tuscani-blue.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 9500 },
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 26000 },
    ],
  },

  {
    id: 'rosa-iceberg',
    nombre: 'Rosa Iceberg',
    nombreCientifico: "Rosa floribunda 'Iceberg'",
    categoria: 'arbusto',
    descripcion: 'Rosa de floración abundante con racimos de flores blancas puras. Una de las rosas más cultivadas por su resistencia y larga floración.',
    emoji: '🌹',
    imagen: '/images/tienda/rosa-iceberg.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 7500 },
    ],
  },

  {
    id: 'salvia-blue',
    nombre: 'Salvia Blue',
    nombreCientifico: "Salvia farinacea 'Victoria Blue'",
    categoria: 'arbusto',
    descripcion: 'Salvia de espigas azul-violeta intenso. Floración prolongada y muy atractiva para polinizadores. Resistente al calor.',
    emoji: '💙',
    imagen: '/images/tienda/salvia-blue.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
    ],
  },

  {
    id: 'salvia-leucantha',
    nombre: 'Salvia Leucantha',
    nombreCientifico: 'Salvia leucantha',
    categoria: 'arbusto',
    descripcion: 'Salvia arbustiva con largas espigas de flores violetas y brácteas blancas aterciopeladas. Gran impacto visual en otoño.',
    emoji: '💜',
    imagen: '/images/tienda/salvia-leucantha.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
    ],
  },

  {
    id: 'salvia-love-and-wish',
    nombre: 'Salvia Love and Wish',
    nombreCientifico: "Salvia × 'Love and Wishes'",
    categoria: 'arbusto',
    descripcion: 'Salvia híbrida de flores rojo-violeta intenso en largas espigas. Floración excepcional de primavera a otoño.',
    emoji: '💜',
    imagen: '/images/tienda/salvia-love-and-wish.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 16000 },
    ],
  },

  {
    id: 'salvia-microphylla-roja',
    nombre: 'Salvia Microphylla Roja',
    nombreCientifico: "Salvia microphylla 'Hot Lips'",
    categoria: 'arbusto',
    descripcion: 'Salvia arbustiva con flores bicolores rojo y blanco de larga floración. Muy resistente y de bajo mantenimiento.',
    emoji: '❤️',
    imagen: '/images/tienda/salvia-microphylla-roja.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 9500 },
    ],
  },

  {
    id: 'salvia-nemorosa',
    nombre: 'Salvia Nemorosa',
    nombreCientifico: 'Salvia nemorosa',
    categoria: 'arbusto',
    descripcion: 'Salvia herbácea con densas espigas violeta-azuladas en primavera. Muy resistente y compacta. Perfecta para bordes formales.',
    emoji: '💜',
    imagen: '/images/tienda/salvia-nemorosa.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-14', bolsa: 'maceta 14 cm', precio: 12500 },
    ],
  },

  {
    id: 'sansevieria',
    nombre: 'Sansevieria',
    nombreCientifico: 'Dracaena trifasciata',
    categoria: 'arbusto',
    descripcion: 'Planta de interior de hojas erectas con bandas verdes y amarillas. Muy resistente a la falta de luz y riego. Muy popular para interiores.',
    emoji: '🌿',
    imagen: '/images/tienda/sansevieria.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-14', bolsa: 'maceta 14 cm', precio: 29000 },
    ],
  },

  {
    id: 'sarcococa',
    nombre: 'Sarcococa',
    nombreCientifico: 'Sarcococca confusa',
    categoria: 'arbusto',
    descripcion: 'Arbusto siempreverde de sombra con flores blancas de perfume intenso en invierno y frutos negros decorativos.',
    emoji: '🌿',
    imagen: '/images/tienda/sarcococa.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 29000 },
    ],
  },

  {
    id: 'schefflera',
    nombre: 'Schefflera',
    nombreCientifico: 'Schefflera arboricola',
    categoria: 'arbusto',
    descripcion: 'Planta tropical de hojas palmeadas brillantes muy usada en interiores y exteriores con sombra. De rápido crecimiento.',
    emoji: '🌿',
    imagen: '/images/tienda/schefflera.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-26', bolsa: 'maceta 26 cm', precio: 29000 },
    ],
  },

  {
    id: 'spirea-bumalda-goldflame',
    nombre: 'Spirea Bumalda Goldflame',
    nombreCientifico: "Spiraea × bumalda 'Goldflame'",
    categoria: 'arbusto',
    descripcion: 'Arbusto caducifolio de follaje dorado-anaranjado en primavera y flores rosas en verano. Gran colorido estacional.',
    emoji: '🍁',
    imagen: '/images/tienda/spirea-bumalda-goldflame.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
    ],
  },

  {
    id: 'spirea-thumbergi',
    nombre: 'Spirea Thumbergi',
    nombreCientifico: 'Spiraea thunbergii',
    categoria: 'arbusto',
    descripcion: 'Arbusto de follaje fino y arqueado con profusa floración blanca en primavera y coloración amarilla en otoño. Muy elegante.',
    emoji: '🌸',
    imagen: '/images/tienda/spirea-thumbergi.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 16000 },
    ],
  },

  {
    id: 'stenocarpus',
    nombre: 'Stenocarpus',
    nombreCientifico: 'Stenocarpus sinuatus',
    categoria: 'arbusto',
    descripcion: 'Árbol australiano de follaje grande brillante con espectaculares flores en rojo y naranja. Muy exótico y ornamental.',
    emoji: '🌺',
    imagen: '/images/tienda/stenocarpus.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 19000 },
    ],
  },

  {
    id: 'tierra',
    nombre: 'Tierra (Sustrato)',
    nombreCientifico: 'Sustrato preparado',
    categoria: 'arbusto',
    descripcion: 'Tierra de calidad preparada con nutrientes para el desarrollo óptimo de plantas en macetones y jardines.',
    emoji: '🪴',
    imagen: '',
    destacado: false,
    variantes: [
      { tamaño: '—', bolsa: 'unidad', precio: 9500 },
    ],
  },

  {
    id: 'veronica-buxifolia',
    nombre: 'Veronica Buxifolia',
    nombreCientifico: 'Hebe buxifolia',
    categoria: 'arbusto',
    descripcion: 'Arbusto compacto de hoja pequeña y densa con floración blanca. Muy resistente al frío y viento costero.',
    emoji: '🌿',
    imagen: '/images/tienda/veronica-buxifolia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 7500 },
    ],
  },

  {
    id: 'veronica-colombiana',
    nombre: 'Veronica Colombiana',
    nombreCientifico: 'Hebe speciosa',
    categoria: 'arbusto',
    descripcion: 'Arbusto de follaje brillante con flores en espigas moradas o rosas. Resistente al viento marino. Muy decorativo en jardines costeros.',
    emoji: '💜',
    imagen: '/images/tienda/veronica-colombiana.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 5500 },
    ],
  },

  {
    id: 'veronica-gemm',
    nombre: 'Veronica Gemm',
    nombreCientifico: "Hebe 'Green Globe'",
    categoria: 'arbusto',
    descripcion: 'Hebe de porte esférico compacto con follaje verde brillante y pequeñas flores blancas. Perfecta para jardines formales y bordes.',
    emoji: '🌿',
    imagen: '/images/tienda/veronica-gemm.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
    ],
  },

  {
    id: 'viburno-lucidum',
    nombre: 'Viburno Lucidum',
    nombreCientifico: 'Viburnum lucidum',
    categoria: 'arbusto',
    descripcion: 'Arbusto siempreverde de gran porte y follaje verde lustroso con flores blancas perfumadas. Excelente pantalla alta o seto.',
    emoji: '🌼',
    imagen: '/images/tienda/viburno-lucidum.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-45', bolsa: 'bolsa 45 cm', precio: 49000 },
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 58000 },
    ],
  },

  {
    id: 'viburno-mascanta',
    nombre: 'Viburno Mascanta',
    nombreCientifico: "Viburnum tinus 'Lucidum'",
    categoria: 'arbusto',
    descripcion: 'Arbusto siempreverde de gran porte con flores blancas y frutos azul-negro. Muy usado como pantalla y seto alto.',
    emoji: '🌼',
    imagen: '/images/tienda/viburno-mascanta.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 39000 },
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 58000 },
    ],
  },

  {
    id: 'viburno-rotundifolia',
    nombre: 'Viburno Rotundifolia',
    nombreCientifico: 'Viburnum davidii',
    categoria: 'arbusto',
    descripcion: 'Arbusto compacto de hoja redondeada con nervios marcados. Flores blancas y frutos azul metálico muy decorativos.',
    emoji: '🌼',
    imagen: '/images/tienda/viburno-rotundifolia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 39000 },
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 75000 },
    ],
  },

  {
    id: 'violeta-de-persia',
    nombre: 'Violeta de Persia',
    nombreCientifico: 'Cyclamen persicum',
    categoria: 'arbusto',
    descripcion: 'Planta de temporada con flores elegantes en rosa, rojo y blanco sobre follaje marmoleado. Floración invernal de alto impacto.',
    emoji: '🌸',
    imagen: '/images/tienda/violeta-de-persia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-17', bolsa: 'maceta 17 cm', precio: 7500 },
    ],
  },

  {
    id: 'westringia',
    nombre: 'Westringia',
    nombreCientifico: 'Westringia fruticosa',
    categoria: 'arbusto',
    descripcion: 'Arbusto australiano de follaje gris-verdoso con pequeñas flores blancas. Muy resistente a viento, sequía y suelos pobres.',
    emoji: '🌿',
    imagen: '/images/tienda/westringia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 10500 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 14500 },
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 19000 },
    ],
  },

  // ── ÁRBOLES ──────────────────────────────────────────────────────

  {
    id: 'acer-japonico',
    nombre: 'Acer Japonico',
    nombreCientifico: 'Acer palmatum',
    categoria: 'arbol',
    descripcion: 'Árbol ornamental de follaje palmeado con espectacular coloración otoñal en rojos y naranjas. Planta premium para jardines de diseño.',
    emoji: '🍁',
    imagen: '/images/tienda/acer-japonico.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 120000 },
    ],
  },

  {
    id: 'alcanfor',
    nombre: 'Alcanfor',
    nombreCientifico: 'Cinnamomum camphora',
    categoria: 'arbol',
    descripcion: 'Árbol de follaje perenne verde brillante con aroma característico. De rápido crecimiento. Excelente como árbol de sombra y pantalla visual.',
    emoji: '🌳',
    imagen: '/images/tienda/alcanfor.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-55', bolsa: 'bolsa 55 cm', precio: 95000 },
      { tamaño: 'B-60', bolsa: 'bolsa 60 cm', precio: 120000 },
    ],
  },

  {
    id: 'crespon',
    nombre: 'Crespón',
    nombreCientifico: 'Lagerstroemia indica',
    categoria: 'arbol',
    descripcion: 'Árbol de floración estival espectacular en rosas, rojos y blancos. Corteza decorativa en invierno. Resistente al calor.',
    emoji: '🌸',
    imagen: '/images/tienda/crespon.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-60', bolsa: 'bolsa 60 cm', precio: 75000 },
    ],
  },

  {
    id: 'jacaranda',
    nombre: 'Jacaranda',
    nombreCientifico: 'Jacaranda mimosifolia',
    categoria: 'arbol',
    descripcion: 'Árbol de floración espectacular en azul-violeta que cubre toda la copa en primavera. Uno de los más impactantes del jardín.',
    emoji: '💜',
    imagen: '/images/tienda/jacaranda.jpg',
    destacado: true,
    variantes: [
      { tamaño: 'B-45', bolsa: 'bolsa 45 cm', precio: 75000 },
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 120000 },
    ],
  },

  {
    id: 'liquidambar',
    nombre: 'Liquidambar',
    nombreCientifico: 'Liquidambar styraciflua',
    categoria: 'arbol',
    descripcion: 'Árbol de follaje palmeado con espectacular coloración otoñal en rojos, naranjas y amarillos. Uno de los más destacados en otoño.',
    emoji: '🍂',
    imagen: '/images/tienda/liquidambar.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 75000 },
    ],
  },

  {
    id: 'olivo',
    nombre: 'Olivo',
    nombreCientifico: 'Olea europaea',
    categoria: 'arbol',
    descripcion: 'Árbol mediterráneo icónico de follaje gris plateado y tronco retorcido. Muy longevo y resistente a la sequía. Ornamental y productivo.',
    emoji: '🫒',
    imagen: '/images/tienda/olivo.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-40', bolsa: 'bolsa 40 cm', precio: 19000 },
    ],
  },

  {
    id: 'quillay',
    nombre: 'Quillay',
    nombreCientifico: 'Quillaja saponaria',
    categoria: 'arbol',
    descripcion: 'Árbol nativo chileno siempreverde de gran valor ecológico. Follaje coriáceo verde brillante. Muy resistente a sequía y adaptado al clima local.',
    emoji: '🌳',
    imagen: '/images/tienda/quillay.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 58000 },
    ],
  },

  {
    id: 'tulipero',
    nombre: 'Tulipero',
    nombreCientifico: 'Liriodendron tulipifera',
    categoria: 'arbol',
    descripcion: 'Árbol de gran porte con hojas en forma de tulipán y flores amarillo-verdosas. Espectacular coloración amarilla en otoño.',
    emoji: '🌳',
    imagen: '/images/tienda/tulipero.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-50', bolsa: 'bolsa 50 cm', precio: 49000 },
    ],
  },

  // ── TREPADORAS ───────────────────────────────────────────────────

  {
    id: 'ampelopsis',
    nombre: 'Ampelopsis',
    nombreCientifico: 'Ampelopsis glandulosa',
    categoria: 'trepadora',
    descripcion: 'Trepadora vigorosa de follaje caduco con frutos decorativos azul-turquesa en otoño. Ideal para pérgolas y muros con soporte.',
    emoji: '🍃',
    imagen: '/images/tienda/ampelopsis.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-15', bolsa: 'bolsa 15 cm', precio: 2900 },
    ],
  },

  {
    id: 'bougainvillea',
    nombre: 'Bougainvillea',
    nombreCientifico: 'Bougainvillea spectabilis',
    categoria: 'trepadora',
    descripcion: 'Trepadora de brácteas vibrantes en rosa, magenta o naranja. Floración exuberante en primavera-verano. Muy decorativa en muros y pérgolas.',
    emoji: '🌸',
    imagen: '/images/tienda/bougainvillea.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-14', bolsa: 'maceta 14 cm', precio: 12500 },
    ],
  },

  {
    id: 'cissus-rhombifolia',
    nombre: 'Cissus Rhombifolia',
    nombreCientifico: 'Cissus rhombifolia',
    categoria: 'trepadora',
    descripcion: 'Trepadora de follaje trifoliado verde brillante. Muy usada en interiores y exteriores con semisombra. Crece rápido.',
    emoji: '🍃',
    imagen: '/images/tienda/cissus-rhombifolia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-14', bolsa: 'maceta 14 cm', precio: 12500 },
    ],
  },

  {
    id: 'cissus-striata',
    nombre: 'Cissus Striata',
    nombreCientifico: 'Cissus striata',
    categoria: 'trepadora',
    descripcion: 'Trepadora nativa de hoja pequeña y textura fina para cubrir muros y cercos. Resistente a heladas y sombra.',
    emoji: '🍃',
    imagen: '/images/tienda/cissus-striata.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 6500 },
      { tamaño: 'B-30', bolsa: 'bolsa 30 cm', precio: 12500 },
    ],
  },

  {
    id: 'displademia',
    nombre: 'Displademia',
    nombreCientifico: 'Mandevilla sanderi',
    categoria: 'trepadora',
    descripcion: 'Trepadora tropical de flores tubulares en rosa intenso o rojo. Floración prolongada en primavera-verano. Excelente para muros y pérgolas.',
    emoji: '🌺',
    imagen: '/images/tienda/displademia.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-15', bolsa: 'maceta 15 cm', precio: 12500 },
    ],
  },

  {
    id: 'ficus-repens',
    nombre: 'Ficus Repens',
    nombreCientifico: 'Ficus pumila',
    categoria: 'trepadora',
    descripcion: 'Trepadora de hoja pequeña que tapiza muros y cercos con un manto verde uniforme. Se adhiere a superficies sin soporte.',
    emoji: '🍃',
    imagen: '/images/tienda/ficus-repens.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-14', bolsa: 'maceta 14 cm', precio: 6500 },
    ],
  },

  {
    id: 'flor-de-la-pluma',
    nombre: 'Flor de la Pluma',
    nombreCientifico: 'Leptospermum scoparium',
    categoria: 'trepadora',
    descripcion: 'Arbusto de floración abundante con pequeñas flores en tonos rosa o blanco que cubren toda la planta. Follaje fino y aromático.',
    emoji: '🌸',
    imagen: '/images/tienda/flor-de-la-pluma.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 35000 },
    ],
  },

  {
    id: 'hiedra-mini',
    nombre: 'Hiedra Mini',
    nombreCientifico: "Hedera helix 'Minor'",
    categoria: 'trepadora',
    descripcion: 'Variedad miniatura de hiedra de hoja pequeña y crecimiento denso. Perfecta para cubrir muros y macetones colgantes. Tolera sombra.',
    emoji: '🍃',
    imagen: '/images/tienda/hiedra-mini.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 2900 },
    ],
  },

  {
    id: 'jazmin-helice',
    nombre: 'Jazmín Helice',
    nombreCientifico: 'Trachelospermum jasminoides',
    categoria: 'trepadora',
    descripcion: 'Trepadora siempreverde con flores blancas estrelladas de intenso perfume. Muy resistente. Perfecta para pérgolas y muros.',
    emoji: '🤍',
    imagen: '/images/tienda/jazmin-helice.jpg',
    destacado: true,
    variantes: [
      { tamaño: 'M-23', bolsa: 'maceta 23 cm', precio: 49000 },
    ],
  },

  {
    id: 'jazmin-poleanthus',
    nombre: 'Jazmín Poleanthus',
    nombreCientifico: 'Jasminum polyanthum',
    categoria: 'trepadora',
    descripcion: 'Trepadora de rápido crecimiento con racimos de flores blanco-rosadas muy perfumadas. Floración exuberante en invierno-primavera.',
    emoji: '🤍',
    imagen: '/images/tienda/jazmin-poleanthus.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-22', bolsa: 'bolsa 22 cm', precio: 8500 },
      { tamaño: 'B-35', bolsa: 'bolsa 35 cm', precio: 12500 },
    ],
  },

  {
    id: 'singonio',
    nombre: 'Singonio',
    nombreCientifico: 'Syngonium podophyllum',
    categoria: 'trepadora',
    descripcion: 'Trepadora de interior con hojas en forma de flecha en tonos verdes y blancos. Muy fácil de cultivar y adaptable a baja luminosidad.',
    emoji: '🍃',
    imagen: '/images/tienda/singonio.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'M-17', bolsa: 'maceta 17 cm', precio: 9500 },
    ],
  },

  // ── CUBRESUE­LOS ─────────────────────────────────────────────────

  {
    id: 'cotula',
    nombre: 'Cotula',
    nombreCientifico: 'Cotula coronopifolia',
    categoria: 'cubresuelo',
    descripcion: 'Tapizante de hoja fina y flores amarillas tipo botón. Ideal para cubrir suelos húmedos y bordes de estanques. Muy decorativa.',
    emoji: '🌼',
    imagen: '/images/tienda/cotula.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-15', bolsa: 'bolsa 15 cm', precio: 1200 },
    ],
  },

  {
    id: 'hipericum',
    nombre: 'Hipericum',
    nombreCientifico: 'Hypericum calycinum',
    categoria: 'cubresuelo',
    descripcion: 'Tapizante semi-perenne con grandes flores amarillas de estambres vistosos. Excelente cobertura de suelo en sol y semisombra.',
    emoji: '🌼',
    imagen: '/images/tienda/hipericum.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-15', bolsa: 'bolsa 15 cm', precio: 1200 },
    ],
  },

  {
    id: 'vinca-minor',
    nombre: 'Vinca Minor',
    nombreCientifico: 'Vinca minor',
    categoria: 'cubresuelo',
    descripcion: 'Tapizante rastrero siempreverde con pequeñas flores azul-violeta. Excelente cobertura bajo árboles y en taludes sombreados.',
    emoji: '💜',
    imagen: '/images/tienda/vinca-minor.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-15', bolsa: 'bolsa 15 cm', precio: 1200 },
    ],
  },

  {
    id: 'vitadineas',
    nombre: 'Vitadineas',
    nombreCientifico: 'Aptenia cordifolia',
    categoria: 'cubresuelo',
    descripcion: 'Tapizante rastrera de hojas suculentas con pequeñas flores rosas. Excelente cobertura de suelo en pleno sol. Muy resistente a sequía.',
    emoji: '🌸',
    imagen: '/images/tienda/vitadineas.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-15', bolsa: 'bolsa 15 cm', precio: 1200 },
    ],
  },

  {
    id: 'zephyrantes',
    nombre: 'Zephyrantes',
    nombreCientifico: 'Zephyranthes candida',
    categoria: 'cubresuelo',
    descripcion: 'Bulbosa de pequeñas flores blancas en forma de estrella que emergen en otoño. Muy fácil de cultivar, naturaliza sola en el jardín.',
    emoji: '🤍',
    imagen: '/images/tienda/zephyrantes.jpg',
    destacado: false,
    variantes: [
      { tamaño: 'B-15', bolsa: 'bolsa 15 cm', precio: 1200 },
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