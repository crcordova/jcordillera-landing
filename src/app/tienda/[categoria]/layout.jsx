/**
 * Layout de /tienda/[categoria] — la metadata dinámica (title, description,
 * canonical) se genera en page.jsx vía generateMetadata. Este layout solo
 * envuelve y evita heredar el title/description estático de /tienda/layout.jsx.
 */

export default function CategoriaLayout({ children }) {
  return children;
}
