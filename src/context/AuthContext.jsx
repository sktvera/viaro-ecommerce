import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

// Usuarios administrativos de ejemplo
const MOCK_USERS = [
  { id: 1, email: 'superadmin@viaro.co', password: 'admin123', name: 'Laura Mendoza', role: 'Superadministradora', permissions: ['all'] },
  { id: 2, email: 'admin@viaro.co', password: 'admin123', name: 'Santiago Cruz', role: 'Administrador', permissions: ['products', 'orders', 'procurement', 'discounts', 'shipping', 'returns', 'billing', 'crm', 'analytics'] },
  { id: 3, email: 'ventas@viaro.co', password: 'admin123', name: 'Valentina Ríos', role: 'Ventas', permissions: ['orders', 'billing', 'crm', 'analytics'] },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('adminUser')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      localStorage.removeItem('adminUser')
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      try {
        localStorage.setItem('adminUser', JSON.stringify(userWithoutPassword))
      } catch (error) {
        // La sesión seguirá activa en memoria si el navegador bloquea localStorage.
      }
      return { success: true, user: userWithoutPassword }
    }
    return { success: false, error: 'Credenciales inválidas' }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem('adminUser')
    } catch (error) {
      // No hay acción adicional si el almacenamiento local no está disponible.
    }
  }, [])

  const hasPermission = useCallback((permission) => {
    if (!user) return false
    if (user.permissions.includes('all')) return true
    return user.permissions.includes(permission)
  }, [user])

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
