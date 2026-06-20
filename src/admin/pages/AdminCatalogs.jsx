import { useState } from 'react'
import { Plus, Edit, Trash2, Database, Tag, Truck, Package, RotateCcw, CreditCard, TagIcon } from 'lucide-react'
import { useCatalog } from '../../context/CatalogContext'

function AdminCatalogs() {
  const { catalogs, getCatalog, addCatalogItem, updateCatalogItem, deleteCatalogItem } = useCatalog()
  const [activeTab, setActiveTab] = useState('categories')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const catalogTabs = [
    { id: 'categories', label: 'Categorías', icon: Package },
    { id: 'brands', label: 'Marcas', icon: Tag },
    { id: 'orderStatuses', label: 'Estados de Orden', icon: RotateCcw },
    { id: 'paymentMethods', label: 'Métodos de Pago', icon: CreditCard },
    { id: 'shippingCarriers', label: 'Transportistas', icon: Truck },
    { id: 'returnReasons', label: 'Razones de Devolución', icon: RotateCcw },
  ]

  const currentCatalog = getCatalog(activeTab)

  const handleSave = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const itemData = {}

    for (const [key, value] of formData.entries()) {
      itemData[key] = value
    }

    if (editingItem) {
      updateCatalogItem(activeTab, editingItem.id, itemData)
    } else {
      addCatalogItem(activeTab, itemData)
    }

    setShowModal(false)
    setEditingItem(null)
  }

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este elemento?')) {
      deleteCatalogItem(activeTab, id)
    }
  }

  const getColumns = () => {
    switch (activeTab) {
      case 'categories':
      case 'brands':
        return ['name', 'slug', 'active']
      case 'orderStatuses':
        return ['id', 'name', 'color']
      case 'paymentMethods':
        return ['id', 'name']
      case 'shippingCarriers':
        return ['name', 'trackingUrl']
      case 'returnReasons':
        return ['id', 'name']
      default:
        return ['name']
    }
  }

  const getColumnLabel = (col) => {
    const labels = {
      name: 'Nombre',
      slug: 'Slug',
      active: 'Activo',
      id: 'ID',
      color: 'Color',
      trackingUrl: 'URL Tracking'
    }
    return labels[col] || col
  }

  return (
    <div className="admin-page">
      <div className="admin-catalog-tabs">
        {catalogTabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={`admin-catalog-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="admin-page-header">
        <h3>{catalogTabs.find(t => t.id === activeTab)?.label}</h3>
        <button className="admin-btn-primary" onClick={() => { setEditingItem(null); setShowModal(true); }}>
          <Plus size={20} />
          Agregar
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              {getColumns().map(col => (
                <th key={col}>{getColumnLabel(col)}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentCatalog.map(item => (
              <tr key={item.id}>
                {getColumns().map(col => (
                  <td key={col}>
                    {col === 'color' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '20px', height: '20px', backgroundColor: item[col], borderRadius: '4px' }} />
                        {item[col]}
                      </div>
                    )}
                    {col === 'active' && (
                      <span className={`admin-badge ${item[col] ? 'success' : 'secondary'}`}>
                        {item[col] ? 'Sí' : 'No'}
                      </span>
                    )}
                    {col !== 'color' && col !== 'active' && item[col]}
                  </td>
                ))}
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn-icon" onClick={() => { setEditingItem(item); setShowModal(true); }}>
                      <Edit size={18} />
                    </button>
                    <button className="admin-btn-icon danger" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-content" style={{ maxWidth: '400px' }}>
            <h3>{editingItem ? 'Editar' : 'Nuevo'} {catalogTabs.find(t => t.id === activeTab)?.label.slice(0, -1)}</h3>
            <form onSubmit={handleSave}>
              <div className="admin-form-group">
                <label>Nombre *</label>
                <input name="name" defaultValue={editingItem?.name} required />
              </div>

              {(activeTab === 'categories' || activeTab === 'brands') && (
                <>
                  <div className="admin-form-group">
                    <label>Slug *</label>
                    <input name="slug" defaultValue={editingItem?.slug} required />
                  </div>
                  <div className="admin-form-group">
                    <label>Activo</label>
                    <select name="active" defaultValue={editingItem?.active?.toString() || 'true'}>
                      <option value="true">Sí</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'orderStatuses' && (
                <div className="admin-form-group">
                  <label>Color</label>
                  <input type="color" name="color" defaultValue={editingItem?.color || '#667eea'} />
                </div>
              )}

              {activeTab === 'shippingCarriers' && (
                <div className="admin-form-group">
                  <label>URL de Tracking</label>
                  <input name="trackingUrl" defaultValue={editingItem?.trackingUrl} />
                </div>
              )}

              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="admin-btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCatalogs
