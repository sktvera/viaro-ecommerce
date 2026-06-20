import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-react'
import { db } from '../../data/database'
import { useCatalog } from '../../context/CatalogContext'
import { assetUrl } from '../../utils/assets'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const { categories } = useCatalog()

  useEffect(() => {
    setProducts(db.products)
  }, [])

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id))
      db.products = db.products.filter(p => p.id !== id)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const productData = {
      ...editingProduct,
      id: editingProduct?.id || Date.now(),
      sku: formData.get('sku'),
      name: formData.get('name'),
      category: formData.get('category'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      minStock: parseInt(formData.get('minStock')),
      description: formData.get('description'),
      image: formData.get('image') || assetUrl('/images/viaro/viaro-product-still.jpg'),
      published: formData.get('published') === 'on'
    }

    if (editingProduct) {
      const updated = products.map(p => p.id === editingProduct.id ? productData : p)
      setProducts(updated)
      db.products = updated
    } else {
      const updated = [...products, productData]
      setProducts(updated)
      db.products = updated
    }

    setShowModal(false)
    setEditingProduct(null)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div><h2>Productos e inventario</h2><p>Control de stock y visibilidad en tienda por diseño.</p></div>
        <div className="admin-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="admin-btn-primary" onClick={() => { setEditingProduct(null); setShowModal(true); }}>
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>SKU / línea</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Vendidos</th>
              <th>Inventario</th>
              <th>Publicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => {
              const isLowStock = product.stock <= product.minStock
              return (
                <tr key={product.id}>
                  <td>
                    <div className="admin-product-cell">
                      <img src={product.image} alt={product.name} />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td><strong>{product.sku}</strong><small className="admin-cell-note">Línea {product.line || product.category}</small></td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.sold || 0}</td>
                  <td>
                    {isLowStock ? (
                      <span className="admin-badge warning">
                        <AlertTriangle size={12} /> Stock Bajo
                      </span>
                    ) : (
                      <span className="admin-badge success">Disponible</span>
                    )}
                  </td>
                  <td><button className={`admin-publish-toggle ${product.published !== false ? 'active' : ''}`} onClick={() => setProducts(items => items.map(item => item.id === product.id ? {...item, published: item.published === false} : item))}>{product.published !== false ? 'Publicado' : 'Borrador'}</button></td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn-icon" onClick={() => handleEdit(product)}>
                        <Edit size={18} />
                      </button>
                      <button className="admin-btn-icon danger" onClick={() => handleDelete(product.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <form onSubmit={handleSave}>
              <div className="admin-form-row">
                <div className="admin-form-group"><label>SKU *</label><input name="sku" defaultValue={editingProduct?.sku} required /></div>
                <div className="admin-form-group">
                  <label>Nombre *</label>
                  <input name="name" defaultValue={editingProduct?.name} required />
                </div>
                <div className="admin-form-group">
                  <label>Categoría *</label>
                  <select name="category" defaultValue={editingProduct?.category} required>
                    <option value="">Seleccionar...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Precio *</label>
                  <input type="number" step="0.01" name="price" defaultValue={editingProduct?.price} required />
                </div>
                <div className="admin-form-group">
                  <label>Stock *</label>
                  <input type="number" name="stock" defaultValue={editingProduct?.stock} required />
                </div>
                <div className="admin-form-group">
                  <label>Stock Mínimo *</label>
                  <input type="number" name="minStock" defaultValue={editingProduct?.minStock || 5} required />
                </div>
              </div>
              <div className="admin-form-group">
                <label>URL de Imagen</label>
                <input name="image" defaultValue={editingProduct?.image} placeholder="https://..." />
              </div>
              <div className="admin-form-group">
                <label>Descripción</label>
                <textarea name="description" rows="3" defaultValue={editingProduct?.description} />
              </div>
              <label className="admin-checkbox-row"><input type="checkbox" name="published" defaultChecked={editingProduct?.published !== false} /> Publicar producto en la tienda</label>
              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="admin-btn-primary">
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
