/**
 * galeria.js
 * ──────────────────────────────────────────────────────────
 * Fuente de datos para el carrusel de la galería.
 * Para agregar o editar imágenes, modifica este array.
 *
 * Campos:
 *  id          → identificador único
 *  nombre      → título que se muestra sobre la imagen
 *  descripcion → texto descriptivo (máx ~120 caracteres recomendado)
 *  imagen      → ruta de la imagen en /public/images/ o URL externa
 *  categoria   → etiqueta de categoría (badge)
 *  emoji       → emoji decorativo de respaldo si no hay imagen
 */

export const galeriaItems = [
  {
    id: 1,
    nombre: "Arbustos",
    descripcion:
      "Plantas leñosas de porte medio que estructuran el jardín, crean setos y pantallas visuales, y aportan floración y follaje durante todo el año para delimitar espacios y reducir el viento.",
    imagen: "/images/arbusto_galeria.png",
    categoria: "Arbustos",
    emoji: "🌿",
  },
  {
    id: 3,
    nombre: "Árboles",
    descripcion:
      "Plantas de gran porte que aportan sombra, estructura y escala al jardín; sus copas moderan el clima, definen caminos y plazas, y ofrecen floración, color otoñal o interés estacional según la especie.",
    imagen: "/images/arbol_galeria.jpg",
    categoria: "Árboles",
    emoji: "🌳",
  },
  {
    id: 4,
    nombre: "Trepadoras",
    descripcion:
      "Plantas que escalan muros, pérgolas y enrejados para cubrir superficies verticales, crear privacidad y añadir perfume o interés ornamental; además estabilizan taludes y pueden servir de soporte para fauna.",
    imagen: "/images/trepadora_galeria.jpg",
    categoria: "Trepadoras",
    emoji: "🏡",
  },
  {
    id: 5,
    nombre: "Cubresuelos",
    descripcion:
      "Plantas bajas y rastreras que cubren el suelo para controlar la erosión, suprimir malas hierbas y unir parterres; además mejoran la retención de humedad y crean alfombras florales o de follaje.",
    imagen: "/images/cubresuelo_galeria.jpg",
    categoria: "Cubresue­lo",
    emoji: "🌱",
  },
];
