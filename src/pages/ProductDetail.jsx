import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw, Shield, ShoppingBag, Truck, X } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { db, getProductById } from '../data/database'
import { useCart } from '../context/CartContext'

const sizeChart = [
  { size: 'S', waistIn: '28–30', waistCm: '71–76', hipCm: '86–91' },
  { size: 'M', waistIn: '32–33', waistCm: '81–86', hipCm: '97–102' },
  { size: 'L', waistIn: '36–38', waistCm: '91–97', hipCm: '107–112' },
  { size: 'XL', waistIn: '40–42', waistCm: '102–107', hipCm: '117–122' },
]

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = getProductById(id)
  const gallery = useMemo(() => (product?.images?.length ? product.images : [product?.image]).filter(Boolean).slice(0, 6), [product])
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '')
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  useEffect(() => {
    setActiveImage(0)
    setSelectedSize(product?.sizes?.[0] || '')
    setSelectedColor(product?.colors?.[0]?.name || '')
    setQuantity(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [product])

  useEffect(() => {
    if (!showSizeGuide) return undefined
    const closeOnEscape = event => event.key === 'Escape' && setShowSizeGuide(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [showSizeGuide])

  if (!product) {
    return (
      <div className="viaro-product-not-found">
        <span>404</span>
        <h1>Producto no encontrado</h1>
        <Link to="/products">Volver a la tienda</Link>
      </div>
    )
  }

  const benefits = product.line === 'urban'
    ? ['Modal de tacto suave', 'Costuras planas y discretas', 'Soporte sin rigidez', 'Elasticidad en cuatro direcciones']
    : ['Tejido Supplex flexible', 'Libertad de movimiento', 'Ajuste que conserva su forma', 'Costuras suaves sobre la piel']

  const suggestedProducts = db.products.filter(item => item.id !== product.id).slice(0, 3)

  const cartProduct = {
    ...product,
    selectedSize,
    selectedColor,
  }

  const handleAddToCart = () => addToCart(cartProduct, quantity)

  const handleBuyNow = () => {
    addToCart(cartProduct, quantity)
    navigate('/checkout')
  }

  return (
    <div className="viaro-detail-page">
      <Link to="/products" className="viaro-detail-back"><ArrowLeft size={16} /> Volver a la tienda</Link>

      <div className="viaro-detail-layout">
        <section className="viaro-gallery" aria-label="Galería de producto">
          <div className="viaro-main-image">
            <img src={gallery[activeImage]} alt={`${product.name} VIARO, vista ${activeImage + 1}`} />
            <span>{activeImage + 1} / {gallery.length}</span>
          </div>

          {gallery.length > 1 && (
            <div className={`viaro-thumbnails thumbnails-${gallery.length}`}>
              {gallery.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className={activeImage === index ? 'active' : ''}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Mostrar imagen ${index + 1}`}
                  aria-pressed={activeImage === index}
                >
                  <img src={image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="viaro-detail-info">
          <div className="viaro-detail-brand">
            <span className="viaro-detail-diamond" />
            VIARO
          </div>
          <p className="viaro-detail-line">{product.sku} · VIARO {product.line.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <p className="viaro-detail-fit">{product.fit}</p>
          <strong className="viaro-detail-price">${product.price.toFixed(2)} USD</strong>
          <p className="viaro-tax-note">Impuestos incluidos. El envío se calcula al finalizar la compra.</p>
          <p className="viaro-detail-description">{product.description}</p>

          <div className="viaro-variant-block">
            <div className="viaro-option-heading">
              <span>Color</span>
              <strong>{selectedColor}</strong>
            </div>
            <div className="viaro-detail-colors">
              {product.colors.map(color => (
                <button
                  type="button"
                  key={color.name}
                  className={selectedColor === color.name ? 'active' : ''}
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={`Color ${color.name}`}
                  aria-pressed={selectedColor === color.name}
                >
                  <i style={{ backgroundColor: color.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div className="viaro-variant-block">
            <div className="viaro-option-heading">
              <span>Talla</span>
              <button type="button" onClick={() => setShowSizeGuide(true)}>Guía de tallas</button>
            </div>
            <div className="viaro-detail-sizes">
              {product.sizes.map(size => (
                <button
                  type="button"
                  key={size}
                  className={selectedSize === size ? 'active' : ''}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                >{size}</button>
              ))}
            </div>
          </div>

          <div className="viaro-purchase-row">
            <div className="viaro-quantity" aria-label="Cantidad">
              <button type="button" onClick={() => setQuantity(value => Math.max(1, value - 1))} aria-label="Reducir cantidad">−</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity(value => Math.min(10, value + 1))} aria-label="Aumentar cantidad">+</button>
            </div>
            <button type="button" className="viaro-detail-add" onClick={handleAddToCart}>
              <ShoppingBag size={18} /> Añadir al carrito
            </button>
          </div>
          <button type="button" className="viaro-buy-now" onClick={handleBuyNow}>Comprar ahora</button>

          <div className="viaro-delivery-points">
            <div><Truck size={19} /><span><strong>Envío internacional</strong>Calculado al finalizar la compra</span></div>
            <div><RotateCcw size={19} /><span><strong>Devoluciones simples</strong>Hasta 30 días desde la entrega</span></div>
          </div>
        </aside>
      </div>

      <section className="viaro-product-essentials" aria-labelledby="product-essentials-title">
        <div>
          <span>Conoce tu VIARO</span>
          <h2 id="product-essentials-title">Diseñado para sentirse bien.</h2>
          <p>{product.material}. Fabricado en Medellín, Colombia.</p>
        </div>

        <div className="viaro-detail-accordions">
          <details open>
            <summary>Beneficios del producto <span>+</span></summary>
            <ul>{benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
          </details>
          <details>
            <summary>Instrucciones de cuidado <span>+</span></summary>
            <p>Lavar a máquina en ciclo delicado y agua fría. Usar colores similares. No usar blanqueador, no planchar y secar a la sombra.</p>
          </details>
          <details>
            <summary>Garantía y devoluciones <span>+</span></summary>
            <p>Revisamos cada prenda antes de enviarla. Aceptamos devoluciones durante 30 días si conserva etiquetas, empaque y no presenta señales de uso.</p>
          </details>
        </div>
      </section>

      <section className="viaro-recommendations" aria-labelledby="recommendations-title">
        <div className="viaro-recommendations-heading">
          <span>Completa tu look</span>
          <h2 id="recommendations-title">También te puede gustar</h2>
          <Link to="/products">Ver toda la colección <ArrowRight size={17} /></Link>
        </div>

        <div className="viaro-recommendation-grid">
          {suggestedProducts.map(item => (
            <Link to={`/product/${item.id}`} key={item.id} className="viaro-recommendation-card">
              <div><img src={item.image} alt={item.name} loading="lazy" /></div>
              <span>VIARO {item.line.toUpperCase()}</span>
              <h3>{item.name}</h3>
              <strong>${item.price.toFixed(2)} USD</strong>
            </Link>
          ))}
        </div>
      </section>

      {showSizeGuide && (
        <div className="viaro-size-modal" role="dialog" aria-modal="true" aria-labelledby="size-guide-title" onMouseDown={event => event.target === event.currentTarget && setShowSizeGuide(false)}>
          <div className="viaro-size-modal-content">
            <button type="button" className="viaro-size-modal-close" onClick={() => setShowSizeGuide(false)} aria-label="Cerrar guía"><X size={22} /></button>
            <span>Encuentra tu ajuste</span>
            <h2 id="size-guide-title">Guía de tallas</h2>
            <p>Mide alrededor de tu cintura sin apretar. Si estás entre dos tallas, elige la mayor para un ajuste más relajado.</p>
            <div className="viaro-size-table-wrap">
              <table>
                <thead><tr><th>Talla</th><th>Cintura (pulg)</th><th>Cintura (cm)</th><th>Cadera (cm)</th></tr></thead>
                <tbody>{sizeChart.map(row => <tr key={row.size}><th>{row.size}</th><td>{row.waistIn}</td><td>{row.waistCm}</td><td>{row.hipCm}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="viaro-size-help"><Shield size={19} /><span>¿Necesitas ayuda? Escríbenos a hello@viaro.co.</span></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
