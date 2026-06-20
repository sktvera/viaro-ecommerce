import { useState } from 'react'
import { Users, TrendingUp, DollarSign, Search, Plus } from 'lucide-react'
import { db } from '../../data/database'

const money = value => `$${value.toLocaleString('en-US', { minimumFractionDigits: 0 })}`

export default function AdminCRM() {
  const [tab, setTab] = useState('prospects')
  const [query, setQuery] = useState('')
  const source = tab === 'prospects' ? db.prospects : db.opportunities
  const rows = source.filter(x => JSON.stringify(x).toLowerCase().includes(query.toLowerCase()))
  const pipeline = db.opportunities.reduce((a, x) => a + x.value, 0)
  return <div className="admin-page">
    <div className="admin-page-header"><div><h2>CRM y prospección</h2><p>Seguimiento de clientes potenciales, acciones y oportunidades por segmento.</p></div><button className="admin-primary-btn"><Plus size={17}/> Nuevo prospecto</button></div>
    <div className="admin-summary-strip"><article><Users size={20}/><span>Prospectos activos</span><strong>{db.prospects.length}</strong></article><article><TrendingUp size={20}/><span>Score promedio</span><strong>{Math.round(db.prospects.reduce((a,x) => a+x.score, 0) / db.prospects.length)}</strong></article><article><DollarSign size={20}/><span>Pipeline abierto</span><strong>{money(pipeline)}</strong></article></div>
    <div className="admin-toolbar"><div className="admin-tabs"><button className={tab === 'prospects' ? 'active' : ''} onClick={() => setTab('prospects')}>Prospectos</button><button className={tab === 'opportunities' ? 'active' : ''} onClick={() => setTab('opportunities')}>Oportunidades</button></div><label className="admin-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar nombre, segmento o responsable" /></label></div>
    {tab === 'prospects' ? <div className="admin-table-container"><table className="admin-table"><thead><tr><th>Prospecto</th><th>Segmento / fuente</th><th>Estado</th><th>Score</th><th>Próxima acción</th><th>Responsable</th><th>Valor</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><td><strong>{row.name}</strong><small className="admin-cell-note">{row.email}</small></td><td>{row.segment}<small className="admin-cell-note">{row.source}</small></td><td><span className={`admin-status ${row.status}`}>{row.status}</span></td><td><span className="admin-score">{row.score}</span></td><td>{row.nextAction}<small className="admin-cell-note">Último contacto: {row.lastContact}</small></td><td>{row.owner}</td><td><strong>{money(row.value)}</strong></td></tr>)}</tbody></table></div> : <div className="admin-opportunity-grid">{rows.map(row => <article key={row.id}><div><span>{row.id}</span><strong>{row.stage}</strong></div><h3>{row.name}</h3><p>{row.prospect} · {row.segment}</p><div className="admin-progress"><i style={{width: `${row.probability}%`}} /></div><footer><span>{row.probability}% probabilidad</span><strong>{money(row.value)}</strong></footer><small>{row.owner} · siguiente acción {row.nextAction}</small></article>)}</div>}
  </div>
}
