import { useState } from 'react'
import { Truck, Package, CheckCircle, Search, ExternalLink, Mail } from 'lucide-react'
import { db } from '../../data/database'
import { useCatalog } from '../../context/CatalogContext'

function AdminShipping() {
  const [orders, setOrders] = useState(db.orders.filter(o => o.tracking))
  const [search, setSearch] = useState('')
  const { shippingCarriers } = useCatalog()

  const filteredOrders = orders.filter(order =>
    order.tracking?.number.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(search.toLowerCase())
  )

  const sendTrackingEmail = (order) => {
    alert(`Email enviado a ${order.customer.email} con el tracking: ${order.tracking.number}`)
  }

  const openTrackingUrl = (carrier, number) => {
    const carrierInfo = shippingCarriers.find(c => c.name === carrier)
    if (carrierInfo) {
      window.open(`${carrierInfo.trackingUrl}?tracking=${number}`, '_blank')
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div><h2>Envíos y tracking</h2><p>Transportadora, guía, fecha estimada y comunicación con el cliente.</p></div>
        <div className="admin-filters">
          <div className="admin-search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar por tracking, orden o cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="admin-shipping-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
            <Package size={24} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{orders.filter(o => o.status === 'shipped').length}</span>
            <span className="admin-stat-label">Enviados</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ backgroundColor: '#e8f5e9', color: '#388e3c' }}>
            <CheckCircle size={24} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{orders.filter(o => o.status === 'delivered').length}</span>
            <span className="admin-stat-label">Entregados</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
            <Truck size={24} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{orders.length}</span>
            <span className="admin-stat-label">Con Tracking</span>
          </div>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Orden</th>
              <th>Cliente</th>
              <th>Transportista</th>
              <th>Número de Tracking</th>
              <th>Estado</th>
              <th>Entrega estimada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td><strong>{order.id}</strong></td>
                <td>
                  <div>
                    <div>{order.customer.name}</div>
                    <small style={{ color: '#666' }}>{order.customer.email}</small>
                  </div>
                </td>
                <td>{order.tracking.eta || 'Por confirmar'}</td>
                <td>{order.tracking.carrier}</td>
                <td>
                  <code>{order.tracking.number}</code>
                </td>
                <td>
                  <span className={`admin-badge ${order.status === 'delivered' ? 'success' : 'info'}`}>
                    {order.status === 'delivered' ? 'Entregado' : 'Enviado'}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <button
                      className="admin-btn-icon"
                      onClick={() => openTrackingUrl(order.tracking.carrier, order.tracking.number)}
                      title="Ver en transportista"
                    >
                      <ExternalLink size={18} />
                    </button>
                    <button
                      className="admin-btn-icon"
                      onClick={() => sendTrackingEmail(order)}
                      title="Enviar por email"
                    >
                      <Mail size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Configuración de transportistas */}
      <div className="admin-section" style={{ marginTop: '2rem' }}>
        <h3>Transportistas Configurados</h3>
        <div className="admin-carriers-grid">
          {shippingCarriers.map(carrier => (
            <div key={carrier.id} className="admin-carrier-card">
              <Truck size={32} />
              <div>
                <strong>{carrier.name}</strong>
                <small>{carrier.trackingUrl}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminShipping
