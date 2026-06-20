import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

function BrandMark() {
  return (
    <span className="viaro-brand" aria-label="VIARO">
      <span className="viaro-brand-symbol" aria-hidden="true">
        <i />
      </span>
      <span className="viaro-brand-name">VIARO</span>
    </span>
  )
}

function Header() {
  const { cartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname, location.hash])

  return (
    <header className="header viaro-header">
      <div className="header-content viaro-header-inner">
        <Link to="/" className="logo viaro-logo-link">
          <BrandMark />
        </Link>

        <nav className={`nav-links viaro-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
          <Link to="/">Inicio</Link>
          <a href="/#collections">Colecciones</a>
          <Link to="/products">Tienda</Link>
          <Link to="/inspiracion">Inspiración</Link>
          <a href="#viaro-footer">Nosotros</a>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-icon viaro-cart" aria-label={`Carrito con ${cartCount} productos`}>
            <ShoppingBag size={21} aria-hidden="true" />
            <span className="cart-label">Carrito</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
