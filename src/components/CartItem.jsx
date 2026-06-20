import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const itemKey = item.cartKey || item.id

  return (
    <article className="viaro-cart-item">
      <Link to={`/product/${item.id}`} className="viaro-cart-item-image">
        <img src={item.image} alt={item.name} />
      </Link>

      <div className="viaro-cart-item-info">
        <span className="viaro-cart-item-brand">VIARO {item.line?.toUpperCase()}</span>
        <Link to={`/product/${item.id}`}><h2>{item.name}</h2></Link>
        <p>{item.sku}</p>
        <div className="viaro-cart-variant">
          {item.selectedColor && <span>Color: <strong>{item.selectedColor}</strong></span>}
          {item.selectedSize && <span>Talla: <strong>{item.selectedSize}</strong></span>}
        </div>
        <span className="viaro-cart-unit-price">${item.price.toFixed(2)} USD</span>
      </div>

      <div className="viaro-cart-item-actions">
        <div className="viaro-cart-quantity" aria-label={`Cantidad de ${item.name}`}>
          <button type="button" onClick={() => updateQuantity(itemKey, item.quantity - 1)} aria-label="Reducir cantidad">−</button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => updateQuantity(itemKey, Math.min(10, item.quantity + 1))} aria-label="Aumentar cantidad">+</button>
        </div>
        <button type="button" className="viaro-cart-remove" onClick={() => removeFromCart(itemKey)}>
          <Trash2 size={15} /> Eliminar
        </button>
      </div>

      <strong className="viaro-cart-line-total">${(item.price * item.quantity).toFixed(2)}</strong>
    </article>
  )
}

export default CartItem
