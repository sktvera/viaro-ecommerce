import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function Footer() {
  return (
    <footer className="footer viaro-footer" id="viaro-footer">
      <div className="viaro-footer-lead">
        <div>
          <span className="footer-kicker">VIARO Menswear</span>
          <h2>Wear your freedom.</h2>
        </div>
        <p>Diseñada en Colombia para hombres que viven entre lo urbano y lo natural, sin perder su esencia.</p>
      </div>

      <div className="footer-content viaro-footer-grid">
        <div className="footer-section footer-brand-column">
          <strong className="footer-wordmark">VIARO</strong>
          <p>Ropa interior y esenciales masculinos. Fabricada en Medellín, Colombia. Creada para el mundo.</p>
          <span>Colombia · United States</span>
        </div>

        <div className="footer-section">
          <h3>Comprar</h3>
          <Link to="/products">Todos los productos</Link>
          <a href="/#collections">VIARO Urban</a>
          <a href="/#collections">VIARO Wild</a>
          <Link to="/cart">Carrito</Link>
        </div>

        <div className="footer-section">
          <h3>Información</h3>
          <Link to="/inspiracion">Inspiración</Link>
          <a href="/#reviews">Comunidad</a>
          <a href="#viaro-footer">Nuestra historia</a>
          <span>Guía de tallas</span>
          <span>Envíos y devoluciones</span>
        </div>

        <div className="footer-section">
          <h3>Conecta</h3>
          <a href="mailto:hello@viaro.co">hello@viaro.co</a>
          <a href="#instagram" className="footer-social">
            Instagram <ArrowUpRight size={14} />
          </a>
          <span>Atención bilingüe</span>
        </div>
      </div>

      <div className="footer-bottom viaro-footer-bottom">
        <p>© 2026 VIARO. Todos los derechos reservados.</p>
        <div><span>Privacidad</span><span>Términos</span></div>
      </div>
    </footer>
  )
}

export default Footer
