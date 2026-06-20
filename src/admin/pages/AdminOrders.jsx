import { useState } from 'react'
import { Search, Eye, Truck, CheckCircle, XCircle, Package } from 'lucide-react'
import { db } from '../../data/database'
import { useCatalog } from '../../context/CatalogContext'

function AdminOrders() {
  const [orders, setOrders] = useState(db.orders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const { orderStatuses, shippingCarriers } = useCatalog()

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    setOrders(updated)
    db.orders = updated
  }

  const addTracking = (orderId, carrier, number) => {
    const updated = orders.map(o =>
      o.id === orderId ? { ...o, status: 'shipped', tracking: { carrier, number } } : o
    )
    setOrders(updated)
    db.orders = updated
    setSelectedOrder(null)
  }

  const getStatusBadge = (status) => {
    const colors = {
      pending: { bg: '#fff3cd', color: '#856404' },
      processing: { bg: '#d1ecf1', color: '#0c5460' },
      shipped: { bg: '#cce5ff', color: '#004085' },
      delivered: { bg: '#d4edda', color: '#155724' },
      cancelled: { bg: '#f8d7da', color: '#721c24' },
      returned: { bg: '#e2e3e5', color: '#383d41' },
    }
    const style = colors[status] || colors.pending
    return <span className="admin-badge" style={{ backgroundColor: style.bg, color: style.color }}>
      {orderStatuses.find(s => s.id === status)?.name || status}
    </span>
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div><h2>Gestión de pedidos</h2><p>Procesamiento, facturación, tracking y trazabilidad de cada venta.</p></div>
        <div className="admin-filters">
          <div className="admin-search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar por ID, cliente o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            {orderStatuses.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Orden</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Tracking</th>
              <th>Factura</th>
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
                <td>{order.invoice || 'Por emitir'}</td>
                <td>{order.date}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>
                  {order.tracking ? (
                    <span>{order.tracking.carrier}: {order.tracking.number}</span>
                  ) : (
                    <span style={{ color: '#999' }}>-</span>
                  )}
                </td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn-icon" onClick={() => setSelectedOrder(order)}>
                      <Eye size={18} />
                    </button>
                    {order.status === 'pending' && (
                      <button className="admin-btn-icon" title="Procesar" onClick={() => updateOrderStatus(order.id, 'processing')}>
                        <Package size={18} />
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button className="admin-btn-icon" title="Enviar" onClick={() => setSelectedOrder({ ...order, showTracking: true })}>
                        <Truck size={18} />
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <button className="admin-btn-icon success" title="Entregar" onClick={() => updateOrderStatus(order.id, 'delivered')}>
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {(order.status === 'pending' || order.status === 'processing') && (
                      <button className="admin-btn-icon danger" title="Cancelar" onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                        <XCircle size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalle */}
      {selectedOrder && !selectedOrder.showTracking && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '600px' }}>
            <h3>Detalle de Orden {selectedOrder.id}</h3>
            <div className="admin-order-detail">
              <div className="admin-order-section">
                <h4>Información del Cliente</h4>
                <p><strong>Nombre:</strong> {selectedOrder.customer.name}</p>
                <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                <p><strong>Teléfono:</strong> {selectedOrder.customer.phone}</p>
              </div>
              <div className="admin-order-section">
                <h4>Productos</h4>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="admin-order-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="admin-order-section">
                <h4>Resumen</h4>
                <div className="admin-order-summary">
                  <div><span>Subtotal:</span><span>${selectedOrder.subtotal.toFixed(2)}</span></div>
                  <div><span>Envío:</span><span>${selectedOrder.shipping.toFixed(2)}</span></div>
                  <div><span>Impuestos:</span><span>${selectedOrder.tax.toFixed(2)}</span></div>
                  <div className="total"><span>Total:</span><span>${selectedOrder.total.toFixed(2)}</span></div>
                </div>
              </div>
              {selectedOrder.tracking && (
                <div className="admin-order-section">
                  <h4>Información de Envío</h4>
                  <p><strong>Transportista:</strong> {selectedOrder.tracking.carrier}</p>
                  <p><strong>Número:</strong> {selectedOrder.tracking.number}</p>
                </div>
              )}
            </div>
            <div className="admin-modal-actions">
              <button className="admin-btn-secondary" onClick={() => setSelectedOrder(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Tracking */}
      {selectedOrder?.showTracking && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '400px' }}>
            <h3>Agregar Tracking</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              addTracking(selectedOrder.id, formData.get('carrier'), formData.get('number'))
            }}>
              <div className="admin-form-group">
                <label>Transportista</label>
                <select name="carrier" required>
                  <option value="">Seleccionar...</option>
                  {shippingCarriers.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="admin-form-group">
                <label>Número de Tracking</label>
                <input name="number" placeholder="Ej: 1234567890" required />
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setSelectedOrder(null)}>
                  Cancelar
                </button>
                <button type="submit" className="admin-btn-primary">
                  Guardar Tracking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrders
