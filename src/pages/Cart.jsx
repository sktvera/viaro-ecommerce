import { ArrowLeft, ArrowRight, Shield, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cart, cartTotal, cartCount, clearCart } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="viaro-empty-cart-page">
        <ShoppingBag size={42} strokeWidth={1.2} />
        <span>Tu selección VIARO</span>
        <h1>Tu carrito está vacío.</h1>
        <p>Explora nuestros cortes Urban y Wild para encontrar el ajuste que te acompaña.</p>
        <Link to="/products">Ir a la tienda <ArrowRight size={17} /></Link>
      </div>
    )
  }

  return (
    <div className="viaro-cart-page">
      <header className="viaro-cart-header">
        <div>
          <span>Tu selección</span>
          <h1>Carrito</h1>
        </div>
        <p>{cartCount} {cartCount === 1 ? 'producto' : 'productos'}</p>
      </header>

      <div className="viaro-cart-layout">
        <section className="viaro-cart-products" aria-label="Productos en el carrito">
          <div className="viaro-cart-products-heading">
            <span>Producto</span><span>Cantidad</span><span>Total</span>
          </div>
          {cart.map(item => <CartItem key={item.cartKey || item.id} item={item} />)}
          <div className="viaro-cart-list-footer">
            <Link to="/products"><ArrowLeft size={16} /> Seguir comprando</Link>
            <button type="button" onClick={clearCart}>Vaciar carrito</button>
          </div>
        </section>

        <aside className="viaro-cart-summary">
          <span>Resumen</span>
          <h2>Total estimado</h2>
          <div className="viaro-cart-summary-row"><span>Subtotal</span><strong>${cartTotal.toFixed(2)} USD</strong></div>
          <div className="viaro-cart-summary-row muted"><span>Envío</span><span>Calculado después</span></div>
          <div className="viaro-cart-estimated-total"><span>Total estimado</span><strong>${cartTotal.toFixed(2)} USD</strong></div>
          <p>Impuestos incluidos. Envío y descuentos calculados al finalizar la compra.</p>
          <button type="button" className="viaro-checkout-button" onClick={() => navigate('/checkout')}>
            Ir a pagar <ArrowRight size={18} />
          </button>
          <Link to="/products" className="viaro-continue-button">Seguir comprando</Link>
          <div className="viaro-secure-note"><Shield size={17} /><span>Compra protegida y pago seguro</span></div>
        </aside>
      </div>
    </div>
  )
}

export default Cart
