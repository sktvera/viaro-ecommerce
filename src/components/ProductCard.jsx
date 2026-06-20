import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize: product.sizes?.[0], selectedColor: product.colors?.[0]?.name })
  }

  return (
    <article className="viaro-product-card">
      <Link to={`/product/${product.id}`} className="viaro-product-visual" aria-label={`Ver ${product.name}`}>
        <img src={product.image} alt={`${product.name} de VIARO en ${product.colors?.[0]?.name || 'color principal'}`} loading="lazy" />
        {product.badge && <span className="viaro-product-badge">{product.badge}</span>}
        <span className="viaro-product-view">Ver producto <ArrowRight size={15} /></span>
      </Link>

      <div className="viaro-product-info">
        <div className="viaro-product-meta">
          <span>{product.sku}</span>
          <span>VIARO {product.line.toUpperCase()}</span>
        </div>

        <div className="viaro-product-title-row">
          <Link to={`/product/${product.id}`}>
            <span className="viaro-card-wordmark">VIARO</span>
            <h3>{product.name}</h3>
          </Link>
          <strong>${product.price.toFixed(2)}</strong>
        </div>

        <p className="viaro-product-fit">{product.fit}</p>

        <div className="viaro-card-options">
          <div className="viaro-color-list" aria-label="Colores disponibles">
            {product.colors.map(color => (
              <span key={color.name} title={color.name} style={{ backgroundColor: color.hex }} />
            ))}
          </div>
          <div className="viaro-size-list" aria-label="Tallas disponibles">
            {product.sizes.map(size => <span key={size}>{size}</span>)}
          </div>
        </div>

        <button type="button" className="viaro-add-button" onClick={handleAddToCart}>
          <ShoppingBag size={17} />
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}

export default ProductCard
