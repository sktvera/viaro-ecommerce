import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const CatalogContext = createContext()

export function useCatalog() {
  const context = useContext(CatalogContext)
  if (!context) {
    throw new Error('useCatalog debe usarse dentro de CatalogProvider')
  }
  return context
}

const INITIAL_CATALOGS = {
  categories: [
    { id: 1, name: 'VIARO Urban', slug: 'urban', active: true },
    { id: 2, name: 'VIARO Wild', slug: 'wild', active: true },
  ],
  brands: [
    { id: 1, name: 'VIARO', slug: 'viaro', active: true },
  ],
  orderStatuses: [
    { id: 'pending', name: 'Pendiente', color: '#ffc107' },
    { id: 'processing', name: 'Procesando', color: '#17a2b8' },
    { id: 'shipped', name: 'Enviado', color: '#007bff' },
    { id: 'delivered', name: 'Entregado', color: '#28a745' },
    { id: 'cancelled', name: 'Cancelado', color: '#dc3545' },
    { id: 'returned', name: 'Devuelto', color: '#6c757d' },
  ],
  paymentMethods: [
    { id: 'card', name: 'Tarjeta de Crédito/Débito' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'transfer', name: 'Transferencia Bancaria' },
    { id: 'cash', name: 'Efectivo contra Entrega' },
  ],
  shippingCarriers: [
    { id: 1, name: 'DHL Express', trackingUrl: 'https://www.dhl.com/track' },
    { id: 2, name: 'FedEx', trackingUrl: 'https://www.fedex.com/track' },
    { id: 3, name: 'UPS', trackingUrl: 'https://www.ups.com/track' },
    { id: 4, name: 'Correos', trackingUrl: 'https://www.correos.es' },
  ],
  returnReasons: [
    { id: 1, name: 'Producto defectuoso' },
    { id: 2, name: 'No coincide con la descripción' },
    { id: 3, name: 'Talla/color incorrecto' },
    { id: 4, name: 'Cambio de opinión' },
    { id: 5, name: 'Llegó tarde' },
    { id: 6, name: 'Pedido por error' },
  ],
  discountTypes: [
    { id: 'percentage', name: 'Porcentaje (%)' },
    { id: 'fixed', name: 'Monto Fijo ($)' },
    { id: 'bogo', name: '2x1' },
  ],
}

export function CatalogProvider({ children }) {
  const [catalogs, setCatalogs] = useState(() => {
    try {
      const stored = localStorage.getItem('catalogs')
      return stored ? JSON.parse(stored) : INITIAL_CATALOGS
    } catch (error) {
      localStorage.removeItem('catalogs')
      return INITIAL_CATALOGS
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('catalogs', JSON.stringify(catalogs))
    } catch (error) {
      // Mantiene los cambios en memoria si el navegador bloquea localStorage.
    }
  }, [catalogs])

  const getCatalog = useCallback((catalogName) => {
    return catalogs[catalogName] || []
  }, [catalogs])

  const addCatalogItem = useCallback((catalogName, item) => {
    setCatalogs(prev => ({
      ...prev,
      [catalogName]: [...(prev[catalogName] || []), { ...item, id: Date.now() }]
    }))
  }, [])

  const updateCatalogItem = useCallback((catalogName, id, updates) => {
    setCatalogs(prev => ({
      ...prev,
      [catalogName]: prev[catalogName].map(item =>
        item.id === id || item.id === parseInt(id) ? { ...item, ...updates } : item
      )
    }))
  }, [])

  const deleteCatalogItem = useCallback((catalogName, id) => {
    setCatalogs(prev => ({
      ...prev,
      [catalogName]: prev[catalogName].filter(item => item.id !== id && item.id !== parseInt(id))
    }))
  }, [])

  const value = {
    catalogs,
    getCatalog,
    addCatalogItem,
    updateCatalogItem,
    deleteCatalogItem,
    categories: catalogs.categories || [],
    brands: catalogs.brands || [],
    orderStatuses: catalogs.orderStatuses || [],
    paymentMethods: catalogs.paymentMethods || [],
    shippingCarriers: catalogs.shippingCarriers || [],
    returnReasons: catalogs.returnReasons || [],
  }

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  )
}
