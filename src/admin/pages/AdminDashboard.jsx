import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, RotateCcw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { db, getLowStockProducts, getPendingReturns } from '../../data/database'

export default function AdminDashboard() {
  const month = db.analytics.salesByMonth.at(-1)
  const openOrders = db.orders.filter(x => ['pending', 'processing', 'shipped'].includes(x.status)).length
  const cards = [
    { icon: TrendingUp, label: 'Ventas del mes', value: `$${month.sales.toLocaleString()}`, note: '+12.3% vs. mayo' },
    { icon: ShoppingCart, label: 'Pedidos por gestionar', value: openOrders, note: `${db.orders.length} pedidos recientes` },
    { icon: Package, label: 'Unidades en inventario', value: db.products.reduce((a,x) => a+x.stock, 0), note: `${db.products.length} diseños publicados` },
    { icon: Users, label: 'Pipeline comercial', value: `$${db.opportunities.reduce((a,x) => a+x.value,0).toLocaleString()}`, note: `${db.prospects.length} prospectos priorizados` },
  ]
  return <div className="admin-dashboard">
    <section className="admin-welcome"><div><span>VISIÓN GENERAL</span><h2>La operación de hoy, en contexto.</h2><p>Inventario, comercio y relaciones comerciales de VIARO.</p></div><strong>20 JUN<br/><small>2026</small></strong></section>
    {(getLowStockProducts().length > 0 || getPendingReturns().length > 0) && <div className="admin-alerts"><div className="admin-alert warning"><AlertTriangle size={18}/>{getLowStockProducts().length} alertas de inventario</div><div className="admin-alert info"><RotateCcw size={18}/>{getPendingReturns().length} devolución pendiente</div></div>}
    <div className="admin-stats-grid">{cards.map(({icon:Icon,...card}) => <article className="admin-stat-card" key={card.label}><div className="admin-stat-icon"><Icon size={21}/></div><div className="admin-stat-info"><span className="admin-stat-label">{card.label}</span><strong className="admin-stat-value">{card.value}</strong><small>{card.note}</small></div></article>)}</div>
    <div className="admin-charts-grid"><div className="admin-chart-card"><div className="admin-chart-heading"><h3>Evolución comercial</h3><span>Ventas mensuales</span></div><ResponsiveContainer width="100%" height={300}><BarChart data={db.analytics.salesByMonth}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month"/><YAxis/><Tooltip formatter={v => `$${v.toLocaleString()}`}/><Bar dataKey="sales" fill="#7c1f3a" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div><div className="admin-chart-card admin-priority-list"><div className="admin-chart-heading"><h3>Prioridades comerciales</h3><span>Próximas acciones</span></div>{db.prospects.slice(0,4).map(x => <article key={x.id}><span className="admin-score">{x.score}</span><div><strong>{x.name}</strong><small>{x.nextAction} · {x.owner}</small></div><b>${x.value.toLocaleString()}</b></article>)}</div></div>
    <div className="admin-section"><div className="admin-chart-heading"><h3>Pedidos recientes</h3><span>Vista de operación</span></div><div className="admin-table-container"><table className="admin-table"><thead><tr><th>Pedido</th><th>Cliente</th><th>Producto</th><th>Total</th><th>Estado</th></tr></thead><tbody>{db.orders.slice(0,4).map(x => <tr key={x.id}><td><strong>{x.id}</strong></td><td>{x.customer.name}</td><td>{x.items.map(i => `${i.quantity}× ${i.name}`).join(', ')}</td><td><strong>${x.total.toFixed(2)}</strong></td><td><span className={`admin-status ${x.status}`}>{x.status}</span></td></tr>)}</tbody></table></div></div>
  </div>
}
