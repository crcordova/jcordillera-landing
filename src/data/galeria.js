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
    nombre: "Plantas de Interior",
    descripcion:
      "Transforma tus espacios con vida. Tenemos una amplia selección de plantas que prosperan bajo techo, perfectas para departamentos y oficinas.",
    imagen: "",
    categoria: "Interior",
    emoji: "🌿",
  },
  // {
  //   id: 2,
  //   nombre: "Flores de Temporada",
  //   descripcion:
  //     "El color que le faltaba a tu jardín. Cada temporada trae nuevas variedades llenas de color y fragancia, cultivadas con cuidado artesanal.",
  //   imagen: "",
  //   categoria: "Flores",
  //   emoji: "🌸",
  // },
  {
    id: 3,
    nombre: "Suculentas y Cactus",
    descripcion:
      "Belleza que resiste. Nuestra colección de suculentas y cactus es ideal para quienes buscan plantas de bajo mantenimiento pero alto impacto visual.",
    imagen: "",
    categoria: "Suculentas",
    emoji: "🌵",
  },
  {
    id: 4,
    nombre: "Árboles y Arbustos",
    descripcion:
      "Las bases de un jardín memorable. Desde frondosos árboles nativos hasta arbustos ornamentales, tenemos lo que tu espacio exterior necesita.",
    imagen: "",
    categoria: "Exterior",
    emoji: "🌳",
  },
  {
    id: 5,
    nombre: "Jardín y Exterior",
    descripcion:
      "Creamos jardines desde Ocoa hasta Santiago. Asesoría personalizada para diseñar el espacio verde de tus sueños con plantas de calidad garantizada.",
    imagen: "",
    categoria: "Jardín",
    emoji: "🏡",
  },
  {
    id: 6,
    nombre: "Hierbas Aromáticas",
    descripcion:
      "Lleva el aroma de la huerta a tu cocina. Albahaca, romero, lavanda y muchas más. Cultivadas orgánicamente en nuestro vivero de Ocoa.",
    imagen: "",
    categoria: "Aromáticas",
    emoji: "🌱",
  },
];
