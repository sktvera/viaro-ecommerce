import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Shield, ShoppingBag, Truck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const shippingOptions = [
  { id: 'standard', carrier: 'Coordinadora', name: 'Envío estándar', days: '4–6 días hábiles', price: 8.90 },
  { id: 'priority', carrier: 'Servientrega', name: 'Envío prioritario', days: '3–4 días hábiles', price: 12.90 },
  { id: 'express', carrier: 'DHL Express', name: 'Envío express', days: '1–2 días hábiles', price: 19.90 },
]

const paymentMethods = [
  { id: 'card', name: 'Tarjeta crédito o débito', label: 'VISA · Mastercard · Amex' },
  { id: 'pse', name: 'PSE', label: 'Débito desde tu banco' },
  { id: 'mercado-pago', name: 'Mercado Pago', label: 'Continúa en Mercado Pago' },
  { id: 'wallet', name: 'Wallet', label: 'Apple Pay · Google Pay' },
  { id: 'paypal', name: 'PayPal', label: 'Continúa en PayPal' },
]

function CheckoutField({ label, name, value, onChange, type = 'text', placeholder, required = true, autoComplete }) {
  return (
    <label className="viaro-checkout-field">
      <span>{label}{required && ' *'}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
    </label>
  )
}

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loginNotice, setLoginNotice] = useState('')
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [sameBillingAddress, setSameBillingAddress] = useState(true)
  const [formData, setFormData] = useState({
    email: '', accountEmail: '', accountPassword: '', country: 'Colombia', firstName: '', lastName: '',
    document: '', address: '', addressExtra: '', city: '', province: '', postalCode: '', phone: '',
    cardName: '', cardNumber: '', cardExpiry: '', cardCvv: '', bank: '', billingAddress: '', billingCity: '',
    saveInfo: false, emailMarketing: false, mobileMarketing: false,
  })

  const selectedShipping = shippingOptions.find(option => option.id === shippingMethod)
  const tax = useMemo(() => cartTotal - (cartTotal / 1.1), [cartTotal])
  const total = cartTotal + selectedShipping.price

  const handleChange = event => {
    const { name, value, type, checked } = event.target
    setFormData(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleLogin = () => {
    if (!formData.accountEmail || !formData.accountPassword) {
      setLoginNotice('Ingresa correo y contraseña para continuar.')
      return
    }
    setLoginNotice('Cuenta reconocida en modo demostración. Los descuentos disponibles se mostrarán aquí.')
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1400))
    window.alert('Pedido de demostración confirmado. No se realizó ningún cargo real.')
    clearCart()
    navigate('/')
  }

  if (cart.length === 0) {
    return (
      <div className="viaro-checkout-empty">
        <ShoppingBag size={42} strokeWidth={1.2} />
        <span>Checkout VIARO</span>
        <h1>No hay productos para pagar.</h1>
        <p>Agrega un corte a tu carrito antes de continuar con el pago.</p>
        <Link to="/products">Ir a la tienda <ArrowRight size={17} /></Link>
      </div>
    )
  }

  return (
    <div className="viaro-checkout-page">
      <header className="viaro-checkout-header">
        <Link to="/cart"><ArrowLeft size={16} /> Volver al carrito</Link>
        <div><span>Checkout seguro</span><h1>Finaliza tu compra</h1></div>
        <p><Shield size={17} /> Tus datos están protegidos</p>
      </header>

      <form className="viaro-checkout-layout" onSubmit={handleSubmit}>
        <main className="viaro-checkout-sections">
          <section className="viaro-checkout-section">
            <div className="viaro-checkout-section-title">
              <span>01</span><div><h2>Contacto</h2><p>Recibe la confirmación y las actualizaciones de tu pedido.</p></div>
              <button type="button" onClick={() => setShowLogin(value => !value)}>¿Ya tienes cuenta? Inicia sesión</button>
            </div>

            {showLogin && (
              <div className="viaro-login-box">
                <CheckoutField label="Correo de tu cuenta" name="accountEmail" type="email" value={formData.accountEmail} onChange={handleChange} required={false} />
                <CheckoutField label="Contraseña" name="accountPassword" type="password" value={formData.accountPassword} onChange={handleChange} required={false} />
                <button type="button" onClick={handleLogin}>Acceder</button>
                {loginNotice && <p>{loginNotice}</p>}
              </div>
            )}

            <CheckoutField label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" />
            <label className="viaro-check-option">
              <input type="checkbox" name="emailMarketing" checked={formData.emailMarketing} onChange={handleChange} />
              <span /> Quiero recibir novedades, lanzamientos y ofertas por correo electrónico.
            </label>
            <div className="viaro-member-callout">
              <strong>Más beneficios al iniciar sesión</strong>
              <p>Los miembros pueden acceder a descuentos exclusivos, guardar sus datos y consultar el historial de pedidos.</p>
            </div>
          </section>

          <section className="viaro-checkout-section">
            <div className="viaro-checkout-section-title"><span>02</span><div><h2>Entrega</h2><p>¿Dónde debemos entregar tu pedido?</p></div></div>
            <label className="viaro-checkout-field full"><span>País o región *</span><select name="country" value={formData.country} onChange={handleChange} required><option>Colombia</option><option>Estados Unidos</option><option>México</option><option>Panamá</option><option>Otro</option></select></label>
            <div className="viaro-checkout-form-grid">
              <CheckoutField label="Nombre" name="firstName" value={formData.firstName} onChange={handleChange} autoComplete="given-name" />
              <CheckoutField label="Apellido" name="lastName" value={formData.lastName} onChange={handleChange} autoComplete="family-name" />
              <CheckoutField label="CC / NIT / DNI" name="document" value={formData.document} onChange={handleChange} autoComplete="off" />
              <CheckoutField label="Teléfono" name="phone" type="tel" value={formData.phone} onChange={handleChange} autoComplete="tel" />
              <div className="full"><CheckoutField label="Dirección" name="address" value={formData.address} onChange={handleChange} autoComplete="street-address" /></div>
              <div className="full"><CheckoutField label="Apartamento, oficina o referencia" name="addressExtra" value={formData.addressExtra} onChange={handleChange} required={false} /></div>
              <CheckoutField label="Ciudad" name="city" value={formData.city} onChange={handleChange} autoComplete="address-level2" />
              <CheckoutField label="Provincia / Departamento" name="province" value={formData.province} onChange={handleChange} autoComplete="address-level1" />
              <CheckoutField label="Código postal" name="postalCode" value={formData.postalCode} onChange={handleChange} autoComplete="postal-code" />
            </div>
            <label className="viaro-check-option"><input type="checkbox" name="saveInfo" checked={formData.saveInfo} onChange={handleChange} /><span /> Guardar mi información para pagar más rápido la próxima vez.</label>
            <label className="viaro-check-option"><input type="checkbox" name="mobileMarketing" checked={formData.mobileMarketing} onChange={handleChange} /><span /> Envíame ofertas y novedades por SMS o WhatsApp.</label>
          </section>

          <section className="viaro-checkout-section">
            <div className="viaro-checkout-section-title"><span>03</span><div><h2>Método de entrega</h2><p>Selecciona la empresa y el tiempo de entrega.</p></div></div>
            <div className="viaro-shipping-options">
              {shippingOptions.map(option => (
                <label key={option.id} className={shippingMethod === option.id ? 'active' : ''}>
                  <input type="radio" name="shippingMethod" value={option.id} checked={shippingMethod === option.id} onChange={() => setShippingMethod(option.id)} />
                  <span className="viaro-radio-dot" />
                  <Truck size={20} />
                  <span><strong>{option.name}</strong><small>{option.carrier} · {option.days}</small></span>
                  <b>${option.price.toFixed(2)}</b>
                </label>
              ))}
            </div>
          </section>

          <section className="viaro-checkout-section">
            <div className="viaro-checkout-section-title"><span>04</span><div><h2>Pago</h2><p>Todas las transacciones deben procesarse mediante conexiones seguras y encriptadas.</p></div></div>
            <div className="viaro-secure-payment-note"><Shield size={19} /><span><strong>Transacción segura</strong>Esta demostración no almacena ni envía información financiera.</span></div>
            <div className="viaro-payment-methods">
              {paymentMethods.map(method => (
                <div key={method.id} className={`viaro-payment-method ${paymentMethod === method.id ? 'active' : ''}`}>
                  <label>
                    <input type="radio" name="paymentMethod" value={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} />
                    <span className="viaro-radio-dot" />
                    <strong>{method.name}</strong><small>{method.label}</small>
                  </label>
                  {paymentMethod === method.id && method.id === 'card' && (
                    <div className="viaro-payment-panel">
                      <CheckoutField label="Nombre en la tarjeta" name="cardName" value={formData.cardName} onChange={handleChange} autoComplete="cc-name" />
                      <CheckoutField label="Número de tarjeta" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" autoComplete="cc-number" />
                      <div className="viaro-checkout-form-grid"><CheckoutField label="Vencimiento" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange} placeholder="MM/AA" autoComplete="cc-exp" /><CheckoutField label="Código de seguridad" name="cardCvv" value={formData.cardCvv} onChange={handleChange} placeholder="CVV" autoComplete="cc-csc" /></div>
                      <p>Si existen intereses o cargos adicionales, serán determinados y cobrados directamente por tu banco.</p>
                    </div>
                  )}
                  {paymentMethod === method.id && method.id === 'pse' && (
                    <div className="viaro-payment-panel"><label className="viaro-checkout-field"><span>Banco *</span><select name="bank" value={formData.bank} onChange={handleChange} required><option value="">Selecciona tu banco</option><option>Bancolombia</option><option>Banco de Bogotá</option><option>Davivienda</option><option>Banco de Occidente</option><option>Otro banco</option></select></label><p>Serás dirigido al portal seguro de tu entidad bancaria.</p></div>
                  )}
                  {paymentMethod === method.id && !['card', 'pse'].includes(method.id) && <div className="viaro-payment-panel"><p>Al confirmar el pedido continuarás en {method.name} para autorizar el pago.</p></div>}
                </div>
              ))}
            </div>

            <label className="viaro-check-option billing"><input type="checkbox" checked={sameBillingAddress} onChange={event => setSameBillingAddress(event.target.checked)} /><span /> Usar la dirección de envío como dirección de facturación.</label>
            {!sameBillingAddress && <div className="viaro-billing-fields"><CheckoutField label="Dirección de facturación" name="billingAddress" value={formData.billingAddress} onChange={handleChange} /><CheckoutField label="Ciudad de facturación" name="billingCity" value={formData.billingCity} onChange={handleChange} /></div>}
          </section>
        </main>

        <aside className="viaro-checkout-summary">
          <span>Tu pedido</span><h2>Resumen</h2>
          <div className="viaro-checkout-items">
            {cart.map(item => (
              <div key={item.cartKey || item.id} className="viaro-checkout-item">
                <div><img src={item.image} alt={item.name} /><b>{item.quantity}</b></div>
                <span><strong>{item.name}</strong><small>{item.selectedColor || 'Color principal'} · Talla {item.selectedSize || 'S'}</small></span>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <div className="viaro-checkout-totals">
            <div><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div>
            <div><span>Envío · {selectedShipping.carrier}</span><strong>${selectedShipping.price.toFixed(2)}</strong></div>
            <div><span>Impuestos incluidos</span><strong>${tax.toFixed(2)}</strong></div>
            <div className="total"><span>Total</span><strong>${total.toFixed(2)} USD</strong></div>
          </div>
          <button type="submit" className="viaro-pay-button" disabled={isSubmitting}>{isSubmitting ? 'Procesando…' : `Pagar ahora · $${total.toFixed(2)}`}<ArrowRight size={18} /></button>
          <p className="viaro-checkout-legal"><Shield size={16} /> Al pagar aceptas los términos, la política de privacidad y la política de devoluciones de VIARO.</p>
        </aside>
      </form>
    </div>
  )
}

export default Checkout
