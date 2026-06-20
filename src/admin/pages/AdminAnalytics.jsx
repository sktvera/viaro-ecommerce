import { Download, TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { db } from '../../data/database'

export default function AdminAnalytics() {
  const exportData = () => {
    const csv = ['Segmento,Prospectos,Ventas,Ingresos', ...db.analytics.segmentPerformance.map(x => `${x.segment},${x.prospects},${x.won},${x.revenue}`)].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a'); link.href = url; link.download = 'viaro-reporte-segmentos.csv'; link.click(); URL.revokeObjectURL(url)
  }
  const sales = db.analytics.salesByMonth.at(-1)
  const prospects = db.analytics.salesVsProspects.at(-1).prospects
  const conversion = Math.round((db.analytics.salesVsProspects.at(-1).sales / prospects) * 100)
  return <div className="admin-page">
    <div className="admin-page-header"><div><h2>Analítica y reportes</h2><p>Ventas efectivas frente a prospección y rendimiento comercial por segmento.</p></div><button className="admin-btn-secondary" onClick={exportData}><Download size={18}/> Exportar reporte</button></div>
    <div className="admin-analytics-kpis">
      <div className="admin-kpi-card"><DollarSign/><div className="admin-kpi-value">${sales.sales.toLocaleString()}</div><div className="admin-kpi-label">Ventas del mes</div><span className="admin-kpi-trend positive">+12.3%</span></div>
      <div className="admin-kpi-card"><ShoppingCart/><div className="admin-kpi-value">{sales.orders}</div><div className="admin-kpi-label">Órdenes del mes</div><span className="admin-kpi-trend positive">+11.2%</span></div>
      <div className="admin-kpi-card"><Users/><div className="admin-kpi-value">{prospects}</div><div className="admin-kpi-label">Prospectos</div><span className="admin-kpi-trend positive">+17.2%</span></div>
      <div className="admin-kpi-card"><TrendingUp/><div className="admin-kpi-value">{conversion}%</div><div className="admin-kpi-label">Conversión a venta</div><span className="admin-kpi-trend positive">+2.1 pts</span></div>
    </div>
    <div className="admin-charts-grid">
      <div className="admin-chart-card"><div className="admin-chart-heading"><h3>Ventas vs. clientes prospectos</h3><span>Últimos 6 meses</span></div><ResponsiveContainer width="100%" height={310}><LineChart data={db.analytics.salesVsProspects}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Legend/><Line type="monotone" dataKey="prospects" name="Prospectos" stroke="#7c1f3a" strokeWidth={3}/><Line type="monotone" dataKey="sales" name="Ventas efectivas" stroke="#c79b63" strokeWidth={3}/></LineChart></ResponsiveContainer></div>
      <div className="admin-chart-card"><div className="admin-chart-heading"><h3>Embudo de oportunidades</h3><span>Prospección activa</span></div><ResponsiveContainer width="100%" height={310}><BarChart data={db.analytics.leadFunnel} layout="vertical"><CartesianGrid strokeDasharray="3 3" horizontal={false}/><XAxis type="number"/><YAxis dataKey="stage" type="category" width={85}/><Tooltip/><Bar dataKey="value" name="Clientes" fill="#7c1f3a" radius={[0,5,5,0]}/></BarChart></ResponsiveContainer></div>
    </div>
    <div className="admin-section"><div className="admin-chart-heading"><h3>Oportunidades por segmento</h3><span>Ventas efectivas sobre prospectos</span></div><div className="admin-table-container"><table className="admin-table"><thead><tr><th>Segmento</th><th>Prospectos</th><th>Ventas efectivas</th><th>Conversión</th><th>Ingresos</th></tr></thead><tbody>{db.analytics.segmentPerformance.map(row => <tr key={row.segment}><td><strong>{row.segment}</strong></td><td>{row.prospects}</td><td>{row.won}</td><td><span className="admin-conversion"><i style={{width: `${Math.round(row.won/row.prospects*100)}%`}}/></span>{Math.round(row.won/row.prospects*100)}%</td><td><strong>${row.revenue.toLocaleString()}</strong></td></tr>)}</tbody></table></div></div>
  </div>
}
