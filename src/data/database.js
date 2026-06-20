import { assetUrl } from '../utils/assets'

// Base de datos simulada para la aplicación

export const db = {
  // Colección inicial VIARO
  products: [
    { id: 1, sku: 'VU-01', name: 'Sunga', category: 'urban', line: 'urban', brand: 'VIARO', price: 34, rating: 4.8, stock: 48, minStock: 8, sold: 42, image: '/images/viaro/products/vu-01-sunga.jpg', images: ['/images/viaro/products/vu-01-sunga.jpg', '/images/viaro/details/urban-material-detail.jpg', '/images/viaro/viaro-product-still.jpg'], description: 'Corte corto y ajustado con una silueta limpia. Diseñada para máxima libertad con el equilibrio justo entre soporte y ligereza.', material: 'Modal + Elastano 90/10', fit: 'Corte corto · Cobertura justa', sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Marfil', hex: '#eee7d8' }, { name: 'Negro', hex: '#171717' }, { name: 'Azul Marino', hex: '#17233d' }], badge: 'Nuevo' },
    { id: 2, sku: 'VU-02', name: 'Boxer Brief', category: 'urban', line: 'urban', brand: 'VIARO', price: 38, rating: 4.9, stock: 62, minStock: 10, sold: 75, image: '/images/viaro/products/vu-02-boxer-brief.jpg', images: ['/images/viaro/products/vu-02-boxer-brief.jpg', '/images/viaro/details/urban-material-detail.jpg', '/images/viaro/viaro-product-still.jpg'], description: 'El clásico redefinido. Cobertura equilibrada, panel frontal de soporte y costuras planas para comodidad continua.', material: 'Modal + Elastano 90/10', fit: 'Largo medio · Soporte diario', sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Negro', hex: '#171717' }, { name: 'Marfil', hex: '#eee7d8' }, { name: 'Azul Marino', hex: '#17233d' }], badge: 'Más vendido' },
    { id: 3, sku: 'VU-03', name: 'Boxer Largo', category: 'urban', line: 'urban', brand: 'VIARO', price: 42, rating: 4.7, stock: 39, minStock: 8, sold: 31, image: '/images/viaro/products/vu-03-boxer-largo.jpg', images: ['/images/viaro/products/vu-03-boxer-largo.jpg', '/images/viaro/details/urban-material-detail.jpg', '/images/viaro/viaro-product-still.jpg'], description: 'Cobertura extendida que evita el roce y mantiene el corte en su lugar. Una base refinada para jornadas largas.', material: 'Modal + Elastano 90/10', fit: 'Largo extendido · Cobertura total', sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Azul Marino', hex: '#17233d' }, { name: 'Negro', hex: '#171717' }, { name: 'Marfil', hex: '#eee7d8' }] },
    { id: 4, sku: 'VW-01', name: 'Slip Deportivo', category: 'wild', line: 'wild', brand: 'VIARO', price: 36, rating: 4.8, stock: 44, minStock: 8, sold: 56, image: '/images/viaro/products/vw-01-slip-deportivo.jpg', images: ['/images/viaro/products/vw-01-slip-deportivo.jpg', '/images/viaro/details/wild-material-detail.jpg', '/images/viaro/details/wild-flatlay.jpg'], description: 'Cobertura media y líneas dinámicas para libertad de movimiento. Ligero, firme y diseñado para seguir tu ritmo.', material: 'Nylon Supplex + Elastano 80/20', fit: 'Cobertura media · Movimiento', sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Azul Marino', hex: '#17233d' }, { name: 'Negro', hex: '#171717' }, { name: 'Marfil', hex: '#eee7d8' }], badge: 'Performance' },
    { id: 5, sku: 'VW-02', name: 'Brief Bajo', category: 'wild', line: 'wild', brand: 'VIARO', price: 38, rating: 4.6, stock: 36, minStock: 8, sold: 27, image: '/images/viaro/products/vw-02-brief-bajo.jpg', images: ['/images/viaro/products/vw-02-brief-bajo.jpg', '/images/viaro/details/wild-material-detail.jpg', '/images/viaro/details/wild-flatlay.jpg'], description: 'Tiro bajo, cobertura definida y una silueta segura. El corte más audaz de la colección Wild.', material: 'Nylon Supplex + Elastano 80/20', fit: 'Tiro bajo · Libertad máxima', sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Negro', hex: '#171717' }, { name: 'Azul Marino', hex: '#17233d' }, { name: 'Marfil', hex: '#eee7d8' }] },
  ],

  // Descuentos
  discounts: [
    { id: 1, name: 'Temporada Solsticio', type: 'seasonal', value: 18, valueType: 'percentage', startDate: '2026-06-15', endDate: '2026-07-31', active: true, appliesTo: 'Todas las líneas' },
    { id: 2, name: 'Primera compra', type: 'coupon', code: 'PRIMERAVIARO', value: 15, valueType: 'percentage', startDate: '2026-01-01', endDate: '2026-12-31', active: true, appliesTo: 'Pedido desde $60', minOrder: 60 },
    { id: 3, name: 'Urban Essentials', type: 'line', value: 10, valueType: 'percentage', startDate: '2026-06-01', endDate: '2026-08-31', active: true, appliesTo: 'Línea Urban', line: 'urban' },
    { id: 4, name: 'Impulso Slip Deportivo', type: 'product', productId: 4, value: 8, valueType: 'fixed', startDate: '2026-06-20', endDate: '2026-06-30', active: false, appliesTo: 'VW-01 · Slip Deportivo' },
  ],

  // Órdenes
  orders: [
    { id: 'ORD-26061', customer: { name: 'Camilo Torres', email: 'camilo@email.com', phone: '+57 300 410 2210', segment: 'Recurrente' }, items: [{ productId: 2, name: 'Boxer Brief', quantity: 2, size: 'M', price: 38 }], subtotal: 76, shipping: 8.9, tax: 0, total: 84.9, status: 'delivered', date: '2026-06-08', tracking: { carrier: 'Coordinadora', number: 'VI260610089', eta: '2026-06-11' }, invoice: 'FV-1041' },
    { id: 'ORD-26062', customer: { name: 'Daniel Ruiz', email: 'daniel@email.com', phone: '+57 301 550 8932', segment: 'Nuevo' }, items: [{ productId: 4, name: 'Slip Deportivo', quantity: 1, size: 'L', price: 36 }], subtotal: 36, shipping: 8.9, tax: 0, total: 44.9, status: 'shipped', date: '2026-06-16', tracking: { carrier: 'Servientrega', number: 'SVI260620341', eta: '2026-06-21' }, invoice: 'FV-1042' },
    { id: 'ORD-26063', customer: { name: 'Andrés Vega', email: 'andres@email.com', phone: '+57 315 401 8830', segment: 'VIP' }, items: [{ productId: 1, name: 'Sunga', quantity: 1, size: 'M', price: 34 }, { productId: 5, name: 'Brief Bajo', quantity: 1, size: 'M', price: 38 }], subtotal: 72, shipping: 8.9, tax: 0, total: 80.9, status: 'processing', date: '2026-06-18', invoice: 'FV-1043' },
    { id: 'ORD-26064', customer: { name: 'Mateo Silva', email: 'mateo@email.com', phone: '+57 310 918 4401', segment: 'Nuevo' }, items: [{ productId: 3, name: 'Boxer Largo', quantity: 2, size: 'XL', price: 42 }], subtotal: 84, shipping: 8.9, tax: 0, total: 92.9, status: 'pending', date: '2026-06-19' },
    { id: 'ORD-26065', customer: { name: 'Lucas Romero', email: 'lucas@email.com', phone: '+57 320 671 1198', segment: 'Recurrente' }, items: [{ productId: 2, name: 'Boxer Brief', quantity: 1, size: 'S', price: 38 }], subtotal: 38, shipping: 8.9, tax: 0, total: 46.9, status: 'returned', date: '2026-06-12', tracking: { carrier: 'Coordinadora', number: 'VI260650127', eta: '2026-06-15' }, invoice: 'FV-1040' },
  ],

  // Devoluciones
  returns: [
    { id: 'DEV-26011', orderId: 'ORD-26065', customer: 'Lucas Romero', product: 'Boxer Brief · S', reason: 'Cambio de talla', status: 'approved', date: '2026-06-17', amount: 38, returnOrder: 'OD-0061', resolution: 'Cambio por talla M' },
    { id: 'DEV-26012', orderId: 'ORD-26061', customer: 'Camilo Torres', product: 'Boxer Brief · M', reason: 'Uno de los artículos no fue abierto', status: 'pending', date: '2026-06-20', amount: 38, returnOrder: 'OD-0062', resolution: 'En evaluación' },
  ],

  purchaseOrders: [
    { id: 'OC-26018', supplier: 'Textiles Andinos', items: 'Modal premium 90/10 · 320 m', line: 'Urban', date: '2026-06-12', eta: '2026-06-26', total: 6840, status: 'in_transit', owner: 'Laura Mendoza' },
    { id: 'OC-26019', supplier: 'Supplex Colombia', items: 'Nylon Supplex · 210 m', line: 'Wild', date: '2026-06-18', eta: '2026-07-02', total: 4930, status: 'approved', owner: 'Laura Mendoza' },
    { id: 'OC-26020', supplier: 'Empaques Norte', items: 'Cajas, seda y etiquetas · 600 ud', line: 'Todas', date: '2026-06-20', eta: '2026-06-28', total: 1750, status: 'draft', owner: 'Santiago Cruz' },
  ],

  budgets: [
    { id: 'PRE-0087', customer: 'Concept Store 74', segment: 'Retail', items: '48 prendas · Urban/Wild', total: 1540, status: 'sent', createdAt: '2026-06-18', validUntil: '2026-07-03', owner: 'Santiago Cruz' },
    { id: 'PRE-0088', customer: 'Hotel Bruma', segment: 'Corporativo', items: '30 kits personalizados', total: 1260, status: 'negotiation', createdAt: '2026-06-19', validUntil: '2026-07-05', owner: 'Valentina Ríos' },
    { id: 'PRE-0089', customer: 'Martín Suárez', segment: 'VIP', items: '12 prendas · selección privada', total: 398, status: 'approved', createdAt: '2026-06-20', validUntil: '2026-06-30', owner: 'Valentina Ríos' },
  ],

  invoices: [
    { id: 'FV-1043', orderId: 'ORD-26063', customer: 'Andrés Vega', issuedAt: '2026-06-18', dueAt: '2026-06-18', total: 80.9, status: 'paid', method: 'Mercado Pago' },
    { id: 'FV-1042', orderId: 'ORD-26062', customer: 'Daniel Ruiz', issuedAt: '2026-06-16', dueAt: '2026-06-16', total: 44.9, status: 'paid', method: 'PSE' },
    { id: 'FV-1041', orderId: 'ORD-26061', customer: 'Camilo Torres', issuedAt: '2026-06-08', dueAt: '2026-06-08', total: 84.9, status: 'paid', method: 'Visa ···· 2048' },
    { id: 'FV-1040', orderId: 'ORD-26065', customer: 'Lucas Romero', issuedAt: '2026-06-12', dueAt: '2026-06-12', total: 46.9, status: 'refunded', method: 'Mastercard ···· 0911' },
  ],

  prospects: [
    { id: 'LEAD-201', name: 'Nicolás Pardo', email: 'nicolas@email.com', phone: '+57 316 200 1840', source: 'Instagram', segment: 'Premium', status: 'qualified', score: 88, lastContact: '2026-06-19', nextAction: 'Selección personalizada', owner: 'Valentina Ríos', value: 240 },
    { id: 'LEAD-202', name: 'Concept Store 74', email: 'compras@cs74.co', phone: '+57 601 510 2019', source: 'Referido', segment: 'Retail', status: 'proposal', score: 94, lastContact: '2026-06-20', nextAction: 'Revisar presupuesto PRE-0087', owner: 'Santiago Cruz', value: 1540 },
    { id: 'LEAD-203', name: 'Samuel Gómez', email: 'samuel@email.com', phone: '+57 300 401 8821', source: 'Blog', segment: 'Nuevo', status: 'contacted', score: 62, lastContact: '2026-06-17', nextAction: 'Enviar guía de líneas', owner: 'Valentina Ríos', value: 92 },
    { id: 'LEAD-204', name: 'Hotel Bruma', email: 'experiencias@bruma.co', phone: '+57 605 388 1190', source: 'Evento', segment: 'Corporativo', status: 'negotiation', score: 81, lastContact: '2026-06-18', nextAction: 'Validar personalización', owner: 'Santiago Cruz', value: 1260 },
  ],

  opportunities: [
    { id: 'OP-071', name: 'Distribución cápsula Urban', prospect: 'Concept Store 74', segment: 'Retail', stage: 'Propuesta', probability: 70, value: 1540, owner: 'Santiago Cruz', nextAction: '2026-06-24' },
    { id: 'OP-072', name: 'Kits de experiencia', prospect: 'Hotel Bruma', segment: 'Corporativo', stage: 'Negociación', probability: 55, value: 1260, owner: 'Santiago Cruz', nextAction: '2026-06-25' },
    { id: 'OP-073', name: 'Selección verano', prospect: 'Nicolás Pardo', segment: 'Premium', stage: 'Calificado', probability: 40, value: 240, owner: 'Valentina Ríos', nextAction: '2026-06-23' },
  ],

  // Promociones activas en home
  promotions: [
    { id: 1, title: 'Urban / Wild', subtitle: 'Dos líneas. Una forma de habitarte.', image: '/images/viaro/urban-model.jpg', active: true, position: 'hero', link: '/products' },
    { id: 2, title: 'Wild Performance', subtitle: 'Movimiento sin concesiones', image: '/images/viaro/wild-model.jpg', active: true, position: 'featured', link: '/products?line=wild' },
  ],

  // Estadísticas
  analytics: {
    salesByMonth: [
      { month: 'Ene', sales: 8900, orders: 121 },
      { month: 'Feb', sales: 10400, orders: 146 },
      { month: 'Mar', sales: 9800, orders: 135 },
      { month: 'Abr', sales: 12600, orders: 173 },
      { month: 'May', sales: 14100, orders: 196 },
      { month: 'Jun', sales: 15840, orders: 218 },
    ],
    topProducts: [
      { id: 2, name: 'Boxer Brief', sold: 75, revenue: 2850 },
      { id: 4, name: 'Slip Deportivo', sold: 56, revenue: 2016 },
      { id: 1, name: 'Sunga', sold: 42, revenue: 1428 },
      { id: 3, name: 'Boxer Largo', sold: 31, revenue: 1302 },
      { id: 5, name: 'Brief Bajo', sold: 27, revenue: 1026 },
    ],
    abandonedCarts: [
      { id: 1, customer: 'julian@email.com', items: 3, value: 110, date: '2026-06-20' },
      { id: 2, customer: 'tomas@email.com', items: 1, value: 42, date: '2026-06-19' },
      { id: 3, customer: 'felipe@email.com', items: 2, value: 76, date: '2026-06-18' },
    ],
    leadFunnel: [
      { stage: 'Prospectos', value: 184 }, { stage: 'Contactados', value: 126 }, { stage: 'Calificados', value: 74 }, { stage: 'Propuestas', value: 41 }, { stage: 'Ventas', value: 27 },
    ],
    salesVsProspects: [
      { month: 'Ene', prospects: 96, sales: 18 }, { month: 'Feb', prospects: 108, sales: 21 }, { month: 'Mar', prospects: 121, sales: 23 }, { month: 'Abr', prospects: 139, sales: 28 }, { month: 'May', prospects: 157, sales: 31 }, { month: 'Jun', prospects: 184, sales: 37 },
    ],
    segmentPerformance: [
      { segment: 'Nuevo', prospects: 82, won: 12, revenue: 3820 }, { segment: 'Recurrente', prospects: 45, won: 15, revenue: 4960 }, { segment: 'Premium', prospects: 31, won: 7, revenue: 3340 }, { segment: 'Retail', prospects: 18, won: 2, revenue: 2820 }, { segment: 'Corporativo', prospects: 8, won: 1, revenue: 900 },
    ],
  }
}

db.products.forEach(product => {
  product.image = assetUrl(product.image)
  product.images = product.images?.map(assetUrl)
})
db.promotions.forEach(promotion => { promotion.image = assetUrl(promotion.image) })

// Funciones helpers
export const getProductById = (id) => db.products.find(p => p.id === parseInt(id))
export const getOrderById = (id) => db.orders.find(o => o.id === id)
export const getActivePromotions = () => db.promotions.filter(p => p.active)
export const getLowStockProducts = () => db.products.filter(p => p.stock <= p.minStock)
export const getPendingReturns = () => db.returns.filter(r => r.status === 'pending')
