import { useState } from 'react'
import { RotateCcw, CheckCircle, XCircle, Search, Eye, DollarSign } from 'lucide-react'
import { db } from '../../data/database'
import { useCatalog } from '../../context/CatalogContext'

function AdminReturns() {
  const [returns, setReturns] = useState(db.returns)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedReturn, setSelectedReturn] = useState(null)
  const { returnReasons } = useCatalog()

  const filteredReturns = returns.filter(ret => {
    const matchesSearch = ret.id.toLowerCase().includes(search.toLowerCase()) ||
                         ret.customer.toLowerCase().includes(search.toLowerCase()) ||
                         ret.orderId.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ret.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateReturnStatus = (id, status) => {
    const updated = returns.map(r => r.id === id ? { ...r, status } : r)
    setReturns(updated)
    db.returns = updated
    setSelectedReturn(null)
  }

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: '#fff3cd', color: '#856404', label: 'Pendiente' },
      approved: { bg: '#d4edda', color: '#155724', label: 'Aprobada' },
      rejected: { bg: '#f8d7da', color: '#721c24', label: 'Rechazada' },
      completed: { bg: '#cce5ff', color: '#004085', label: 'Completada' }
    }
    const style = styles[status]
    return <span className="admin-badge" style={{ backgroundColor: style.bg, color: style.color }}>{style.label}</span>
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div><h2>Devoluciones</h2><p>Solicitudes, órdenes de devolución, resolución y reembolso.</p></div>
        <div className="admin-filters">
          <div className="admin-search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar devolución..."
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
            <option value="pending">Pendientes</option>
            <option value="approved">Aprobadas</option>
            <option value="rejected">Rechazadas</option>
            <option value="completed">Completadas</option>
          </select>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Orden</th>
              <th>Orden devolución</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Motivo</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReturns.map(ret => (
              <tr key={ret.id}>
                <td><strong>{ret.id}</strong></td>
                <td>{ret.orderId}</td>
                <td><strong>{ret.returnOrder}</strong><small className="admin-cell-note">{ret.resolution}</small></td>
                <td>{ret.customer}</td>
                <td>{ret.product}</td>
                <td>{ret.reason}</td>
                <td>${ret.amount.toFixed(2)}</td>
                <td>{getStatusBadge(ret.status)}</td>
                <td>
                  <button className="admin-btn-secondary" onClick={() => setSelectedReturn(ret)}>
                    <Eye size={18} />
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReturn && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '500px' }}>
            <h3>Detalle de Devolución</h3>
            <div className="admin-return-detail">
              <div className="admin-return-info">
                <p><strong>ID:</strong> {selectedReturn.id}</p>
                <p><strong>Orden:</strong> {selectedReturn.orderId}</p>
                <p><strong>Orden de devolución:</strong> {selectedReturn.returnOrder}</p>
                <p><strong>Resolución:</strong> {selectedReturn.resolution}</p>
                <p><strong>Cliente:</strong> {selectedReturn.customer}</p>
                <p><strong>Producto:</strong> {selectedReturn.product}</p>
                <p><strong>Motivo:</strong> {selectedReturn.reason}</p>
                <p><strong>Monto a Reembolsar:</strong> ${selectedReturn.amount.toFixed(2)}</p>
                <p><strong>Fecha:</strong> {selectedReturn.date}</p>
                <p><strong>Estado:</strong> {getStatusBadge(selectedReturn.status)}</p>
              </div>

              {selectedReturn.status === 'pending' && (
                <div className="admin-return-actions">
                  <p>¿Deseas aprobar o rechazar esta devolución?</p>
                  <div className="admin-modal-actions">
                    <button
                      className="admin-btn-danger"
                      onClick={() => updateReturnStatus(selectedReturn.id, 'rejected')}
                    >
                      <XCircle size={18} />
                      Rechazar
                    </button>
                    <button
                      className="admin-btn-success"
                      onClick={() => updateReturnStatus(selectedReturn.id, 'approved')}
                    >
                      <CheckCircle size={18} />
                      Aprobar
                    </button>
                  </div>
                </div>
              )}

              {selectedReturn.status === 'approved' && (
                <div className="admin-return-actions">
                  <p>Devolución aprobada. ¿Marcar como completada?</p>
                  <div className="admin-modal-actions">
                    <button
                      className="admin-btn-primary"
                      onClick={() => updateReturnStatus(selectedReturn.id, 'completed')}
                    >
                      <DollarSign size={18} />
                      Marcar como Reembolsada
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="admin-modal-actions">
              <button className="admin-btn-secondary" onClick={() => setSelectedReturn(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminReturns
