import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(currentCart => {
      const cartKey = `${product.id}-${product.selectedSize || 'default'}-${product.selectedColor || 'default'}`
      const existingItem = currentCart.find(item => (item.cartKey || `${item.id}-default-default`) === cartKey)

      if (existingItem) {
        return currentCart.map(item =>
          (item.cartKey || `${item.id}-default-default`) === cartKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...currentCart, { ...product, cartKey, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((itemKey) => {
    setCart(currentCart => currentCart.filter(item => (item.cartKey || item.id) !== itemKey))
  }, [])

  const updateQuantity = useCallback((itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey)
      return
    }

    setCart(currentCart =>
      currentCart.map(item =>
        (item.cartKey || item.id) === itemKey ? { ...item, quantity } : item
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const cartTotal = useMemo(() =>
    cart.reduce((total, item) => total + (item.price * item.quantity), 0),
  [cart])

  const cartCount = useMemo(() =>
    cart.reduce((count, item) => count + item.quantity, 0),
  [cart])

  const value = {
    cart,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
