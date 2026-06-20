import { useState } from 'react'
import { DollarSign, Search, Plus, CheckCircle, AlertTriangle } from 'lucide-react'
import { db } from '../../data/database'

const money = value => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
const labels = { paid: 'Pagada', pending: 'Pendiente', refunded: 'Reembolsada' }

export default function AdminBilling() {
  const [query, setQuery] = useState('')
  const rows = db.invoices.filter(x => JSON.stringify(x).toLowerCase().includes(query.toLowerCase()))
  const collected = db.invoices.filter(x => x.status === 'paid').reduce((a, x) => a + x.total, 0)
  return <div className="admin-page">
    <div className="admin-page-header"><div><h2>Facturación</h2><p>Documentos, recaudo y reembolsos asociados a cada pedido.</p></div><button className="admin-primary-btn"><Plus size={17}/> Crear factura</button></div>
    <div className="admin-summary-strip"><article><DollarSign size={20}/><span>Total recaudado</span><strong>{money(collected)}</strong></article><article><CheckCircle size={20}/><span>Facturas pagadas</span><strong>{db.invoices.filter(x => x.status === 'paid').length}</strong></article><article><AlertTriangle size={20}/><span>Reembolsos</span><strong>{db.invoices.filter(x => x.status === 'refunded').length}</strong></article></div>
    <div className="admin-toolbar"><h3>Documentos emitidos</h3><label className="admin-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar factura, orden o cliente" /></label></div>
    <div className="admin-table-container"><table className="admin-table"><thead><tr><th>Factura</th><th>Orden</th><th>Cliente</th><th>Emisión</th><th>Método</th><th>Total</th><th>Estado</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><td><strong>{row.id}</strong></td><td>{row.orderId}</td><td>{row.customer}</td><td>{row.issuedAt}</td><td>{row.method}</td><td><strong>{money(row.total)}</strong></td><td><span className={`admin-status ${row.status}`}>{labels[row.status]}</span></td></tr>)}</tbody></table></div>
  </div>
}
