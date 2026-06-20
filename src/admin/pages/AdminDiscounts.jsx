import { useState } from 'react'
import { Plus, Edit, Trash2, Tag, Percent, Calendar, Gift, ShoppingBag } from 'lucide-react'
import { db } from '../../data/database'
import { useCatalog } from '../../context/CatalogContext'

function AdminDiscounts() {
  const [discounts, setDiscounts] = useState(db.discounts)
  const [showModal, setShowModal] = useState(false)
  const [editingDiscount, setEditingDiscount] = useState(null)
  const { categories, discountTypes } = useCatalog()

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este descuento?')) {
      const updated = discounts.filter(d => d.id !== id)
      setDiscounts(updated)
      db.discounts = updated
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const discountData = {
      id: editingDiscount?.id || Date.now(),
      name: formData.get('name'),
      type: formData.get('type'),
      code: formData.get('code') || null,
      value: parseFloat(formData.get('value')),
      valueType: formData.get('valueType'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      active: formData.get('active') === 'true',
      minOrder: parseFloat(formData.get('minOrder')) || 0,
    }

    // Agregar campos específicos según el tipo
    if (discountData.type === 'line') {
      discountData.line = formData.get('line')
      discountData.appliesTo = `Línea ${formData.get('line')}`
    } else if (discountData.type === 'product') {
      discountData.productId = parseInt(formData.get('productId'))
    }

    if (editingDiscount) {
      const updated = discounts.map(d => d.id === editingDiscount.id ? discountData : d)
      setDiscounts(updated)
      db.discounts = updated
    } else {
      const updated = [...discounts, discountData]
      setDiscounts(updated)
      db.discounts = updated
    }

    setShowModal(false)
    setEditingDiscount(null)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'seasonal': return <Calendar size={16} />
      case 'coupon': return <Tag size={16} />
      case 'line': return <ShoppingBag size={16} />
      case 'product': return <Gift size={16} />
      default: return <Percent size={16} />
    }
  }

  const getTypeLabel = (type) => {
    const labels = {
      seasonal: 'Temporada',
      coupon: 'Cupón',
      line: 'Línea de diseño',
      product: 'Producto'
    }
    return labels[type] || type
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Gestión de Descuentos</h2>
        <button className="admin-btn-primary" onClick={() => { setEditingDiscount(null); setShowModal(true); }}>
          <Plus size={20} />
          Nuevo Descuento
        </button>
      </div>

      {/* Resumen de tipos */}
      <div className="admin-discount-types">
        {['seasonal', 'coupon', 'line', 'product'].map(type => (
          <div key={type} className="admin-discount-type-card">
            {getTypeIcon(type)}
            <span>{getTypeLabel(type)}</span>
            <strong>{discounts.filter(d => d.type === type).length}</strong>
          </div>
        ))}
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Vigencia</th>
              <th>Aplica a</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map(discount => (
              <tr key={discount.id}>
                <td>
                  <div className="admin-discount-name">
                    {getTypeIcon(discount.type)}
                    <div>
                      <strong>{discount.name}</strong>
                      {discount.code && <div className="admin-discount-code">Código: {discount.code}</div>}
                    </div>
                  </div>
                </td>
                <td>{getTypeLabel(discount.type)}</td>
                <td>
                  {discount.valueType === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                </td>
                <td>
                  <small>{discount.startDate} al {discount.endDate}</small>
                </td>
                <td>
                  {discount.appliesTo || (discount.type === 'line' && `Línea ${discount.line}`)}
                  {discount.type === 'product' && db.products.find(p => p.id === discount.productId)?.name}
                  {discount.type === 'all' && 'Todos los productos'}
                  {discount.minOrder > 0 && <div><small>Min: ${discount.minOrder}</small></div>}
                </td>
                <td>
                  <span className={`admin-badge ${discount.active ? 'success' : 'secondary'}`}>
                    {discount.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn-icon" onClick={() => { setEditingDiscount(discount); setShowModal(true); }}>
                      <Edit size={18} />
                    </button>
                    <button className="admin-btn-icon danger" onClick={() => handleDelete(discount.id)}>
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
          <div className="admin-modal-content" style={{ maxWidth: '600px' }}>
            <h3>{editingDiscount ? 'Editar Descuento' : 'Nuevo Descuento'}</h3>
            <form onSubmit={handleSave}>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Nombre *</label>
                  <input name="name" defaultValue={editingDiscount?.name} required />
                </div>
                <div className="admin-form-group">
                  <label>Tipo *</label>
                  <select name="type" defaultValue={editingDiscount?.type || 'seasonal'} required>
                    <option value="seasonal">Por Temporada</option>
                    <option value="coupon">Cupón</option>
                    <option value="line">Por Línea de diseño</option>
                    <option value="product">Por Producto</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Tipo de Valor</label>
                  <select name="valueType" defaultValue={editingDiscount?.valueType || 'percentage'}>
                    <option value="percentage">Porcentaje (%)</option>
                    <option value="fixed">Monto Fijo ($)</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Valor *</label>
                  <input type="number" step="0.01" name="value" defaultValue={editingDiscount?.value} required />
                </div>
              </div>

              {(!editingDiscount || editingDiscount?.type === 'coupon') && (
                <div className="admin-form-group">
                  <label>Código de Cupón</label>
                  <input name="code" defaultValue={editingDiscount?.code} placeholder="Ej: VERANO2024" />
                </div>
              )}

              {/* Campos condicionales según tipo */}
              {(!editingDiscount || editingDiscount?.type === 'line') && (
                <div className="admin-form-group" id="line-field">
                  <label>Línea de diseño</label>
                  <select name="line" defaultValue={editingDiscount?.line}>
                    <option value="urban">Urban</option><option value="wild">Wild</option>
                  </select>
                </div>
              )}

              {(!editingDiscount || editingDiscount?.type === 'product') && (
                <div className="admin-form-group" id="product-field">
                  <label>Producto</label>
                  <select name="productId" defaultValue={editingDiscount?.productId}>
                    <option value="">Seleccionar producto...</option>
                    {db.products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Fecha Inicio *</label>
                  <input type="date" name="startDate" defaultValue={editingDiscount?.startDate} required />
                </div>
                <div className="admin-form-group">
                  <label>Fecha Fin *</label>
                  <input type="date" name="endDate" defaultValue={editingDiscount?.endDate} required />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Compra Mínima ($)</label>
                  <input type="number" step="0.01" name="minOrder" defaultValue={editingDiscount?.minOrder || 0} />
                </div>
                <div className="admin-form-group">
                  <label>Estado</label>
                  <select name="active" defaultValue={editingDiscount?.active?.toString() || 'true'}>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="admin-btn-primary">
                  Guardar Descuento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDiscounts
