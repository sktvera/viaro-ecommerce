import { useState } from 'react'
import { Database, DollarSign, Plus, Search } from 'lucide-react'
import { db } from '../../data/database'

const statusLabel = { draft: 'Borrador', approved: 'Aprobada', in_transit: 'En tránsito', sent: 'Enviado', negotiation: 'Negociación' }
const money = value => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

export default function AdminProcurement() {
  const [tab, setTab] = useState('purchases')
  const [query, setQuery] = useState('')
  const rows = tab === 'purchases' ? db.purchaseOrders : db.budgets
  const filtered = rows.filter(row => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()))

  return <div className="admin-page">
    <div className="admin-page-header">
      <div><h2>Compras y presupuestos</h2><p>Abastecimiento, costos y propuestas comerciales en un solo flujo.</p></div>
      <button className="admin-primary-btn"><Plus size={17} /> {tab === 'purchases' ? 'Nueva orden' : 'Nuevo presupuesto'}</button>
    </div>
    <div className="admin-summary-strip">
      <article><Database size={20}/><span>Compras abiertas</span><strong>{db.purchaseOrders.filter(x => x.status !== 'closed').length}</strong></article>
      <article><DollarSign size={20}/><span>Capital comprometido</span><strong>{money(db.purchaseOrders.reduce((a, x) => a + x.total, 0))}</strong></article>
      <article><DollarSign size={20}/><span>Pipeline presupuestado</span><strong>{money(db.budgets.reduce((a, x) => a + x.total, 0))}</strong></article>
    </div>
    <div className="admin-toolbar">
      <div className="admin-tabs"><button className={tab === 'purchases' ? 'active' : ''} onClick={() => setTab('purchases')}>Órdenes de compra</button><button className={tab === 'budgets' ? 'active' : ''} onClick={() => setTab('budgets')}>Presupuestos</button></div>
      <label className="admin-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar proveedor o cliente" /></label>
    </div>
    <div className="admin-table-container"><table className="admin-table"><thead><tr>
      <th>{tab === 'purchases' ? 'Orden / proveedor' : 'Presupuesto / cliente'}</th><th>Alcance</th><th>Responsable</th><th>{tab === 'purchases' ? 'Entrega estimada' : 'Vigencia'}</th><th>Total</th><th>Estado</th>
    </tr></thead><tbody>{filtered.map(row => <tr key={row.id}>
      <td><strong>{row.id}</strong><small className="admin-cell-note">{row.supplier || row.customer} · {row.line || row.segment}</small></td>
      <td>{row.items}</td><td>{row.owner}</td><td>{row.eta || row.validUntil}</td><td><strong>{money(row.total)}</strong></td><td><span className={`admin-status ${row.status}`}>{statusLabel[row.status] || row.status}</span></td>
    </tr>)}</tbody></table></div>
  </div>
}
