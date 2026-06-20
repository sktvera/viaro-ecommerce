import { useState } from 'react'
import { Plus, Edit, Trash2, Shield, User, UserCheck, UserX } from 'lucide-react'

function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Super Admin', email: 'superadmin@mitienda.com', role: 'superadmin', status: 'active', lastLogin: '2024-01-20 10:30' },
    { id: 2, name: 'Administrador', email: 'admin@mitienda.com', role: 'admin', status: 'active', lastLogin: '2024-01-19 15:45' },
    { id: 3, name: 'Manager', email: 'manager@mitienda.com', role: 'manager', status: 'active', lastLogin: '2024-01-18 09:20' },
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const handleSave = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = {
      id: editingUser?.id || Date.now(),
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      status: formData.get('status'),
      lastLogin: editingUser?.lastLogin || 'Nunca'
    }

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? userData : u))
    } else {
      setUsers([...users, userData])
    }

    setShowModal(false)
    setEditingUser(null)
  }

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  const getRoleBadge = (role) => {
    const styles = {
      superadmin: { bg: '#dc3545', label: 'Super Admin' },
      admin: { bg: '#28a745', label: 'Admin' },
      manager: { bg: '#17a2b8', label: 'Manager' }
    }
    const style = styles[role]
    return <span className="admin-badge" style={{ backgroundColor: style.bg, color: 'white' }}>{style.label}</span>
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Gestión de Usuarios</h2>
        <button className="admin-btn-primary" onClick={() => { setEditingUser(null); setShowModal(true); }}>
          <Plus size={20} />
          Nuevo Usuario
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Último Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="admin-user-cell">
                    <div className="admin-avatar">{user.name.charAt(0)}</div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{getRoleBadge(user.role)}</td>
                <td>
                  <span className={`admin-badge ${user.status === 'active' ? 'success' : 'danger'}`}>
                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td><small>{user.lastLogin}</small></td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn-icon" onClick={() => { setEditingUser(user); setShowModal(true); }}>
                      <Edit size={18} />
                    </button>
                    <button className="admin-btn-icon danger" onClick={() => handleDelete(user.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info de permisos */}
      <div className="admin-section" style={{ marginTop: '2rem' }}>
        <h3>Niveles de Permisos</h3>
        <div className="admin-permissions-info">
          <div className="admin-permission-item">
            <Shield size={20} color="#dc3545" />
            <div>
              <strong>Super Admin</strong>
              <p>Acceso completo a todas las funciones del sistema</p>
            </div>
          </div>
          <div className="admin-permission-item">
            <UserCheck size={20} color="#28a745" />
            <div>
              <strong>Administrador</strong>
              <p>Gestión de productos, órdenes, descuentos, catálogos y promociones</p>
            </div>
          </div>
          <div className="admin-permission-item">
            <User size={20} color="#17a2b8" />
            <div>
              <strong>Manager</strong>
              <p>Gestión de órdenes, envíos y devoluciones</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
            <form onSubmit={handleSave}>
              <div className="admin-form-group">
                <label>Nombre *</label>
                <input name="name" defaultValue={editingUser?.name} required />
              </div>

              <div className="admin-form-group">
                <label>Email *</label>
                <input type="email" name="email" defaultValue={editingUser?.email} required />
              </div>

              <div className="admin-form-group">
                <label>Rol *</label>
                <select name="role" defaultValue={editingUser?.role || 'manager'} required>
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Administrador</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Estado</label>
                <select name="status" defaultValue={editingUser?.status || 'active'}>
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>

              {!editingUser && (
                <div className="admin-form-group">
                  <label>Contraseña *</label>
                  <input type="password" name="password" required={!editingUser} />
                </div>
              )}

              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="admin-btn-primary">
                  {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers
