import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ productos, categorias }) {
  return (
    <div className={styles.grid}>
      {productos.map((producto, i) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          categorias={categorias}
          index={i}
        />
      ))}
    </div>
  );
}
