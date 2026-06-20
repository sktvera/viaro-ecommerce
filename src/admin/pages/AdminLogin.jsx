import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      navigate('/admin')
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="admin-login-page viaro-admin-login">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <span className="admin-login-monogram">V</span>
          <h1>VIARO</h1>
          <p>Control central de comercio</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="admin-error">{error}</div>
          )}

          <div className="admin-form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@viaro.co"
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? 'Validando acceso...' : 'Ingresar al panel'}
          </button>
        </form>

        <div className="admin-login-hint">
          <p><strong>Acceso de demostración</strong></p>
          <p>superadmin@viaro.co · admin123</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
