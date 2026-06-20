# 🛍️ Plataforma E-Commerce

Una plataforma de comercio electrónico moderna construida con React y Vite.

## Características

- ✨ Interfaz de usuario moderna y responsive
- 🛒 Carrito de compras funcional
- 📱 Diseño adaptativo para móviles
- 🔍 Vista detallada de productos
- 💳 Proceso de checkout completo
- ⚡ Carga rápida con Vite

## Tecnologías

- React 18
- React Router DOM
- Context API para estado global
- CSS3 con Flexbox y Grid
- Vite para desarrollo y build

## Instalación

```bash
# Clonar o descargar el proyecto
cd ecommerce-platform

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Estructura del Proyecto

```
ecommerce-platform/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── CartItem.jsx
│   ├── context/         # Contexto del carrito
│   │   └── CartContext.jsx
│   ├── data/            # Datos de productos
│   │   └── products.js
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   ├── App.jsx          # Componente principal
│   ├── index.css        # Estilos globales
│   └── main.jsx         # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Funcionalidades

### Página de Inicio
- Listado de todos los productos
- Tarjetas de producto con imagen, precio y rating
- Botón para agregar al carrito

### Detalle de Producto
- Imagen del producto
- Información completa
- Selector de cantidad
- Descripción detallada

### Carrito de Compras
- Lista de productos agregados
- Modificar cantidades
- Eliminar productos
- Calcular totales (subtotal, envío, impuestos)

### Checkout
- Resumen del pedido
- Formulario de datos de envío
- Formulario de pago
- Simulación de procesamiento de pedido

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Crea la versión de producción |
| `npm run preview` | Previsualiza la versión de producción |

## Personalización

### Agregar Productos
Edita el archivo `src/data/products.js` para agregar, modificar o eliminar productos.

```javascript
{
  id: 13,
  name: "Nuevo Producto",
  category: "Categoría",
  price: 99.99,
  rating: 4.5,
  image: "https://url-de-la-imagen.com/foto.jpg",
  description: "Descripción del producto..."
}
```

### Modificar Estilos
Los estilos principales están en `src/index.css`. Puedes modificar:
- Colores del tema
- Tamaños de fuente
- Espaciados
- Breakpoints responsive

## Licencia

MIT
