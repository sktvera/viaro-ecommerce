import { useEffect, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { db } from '../data/database'

const lines = [
  { id: 'all', number: '00', name: 'Todos', copy: 'La colección completa' },
  { id: 'urban', number: '01', name: 'VIARO Urban', copy: 'Sobriedad para el ritmo diario' },
  { id: 'wild', number: '02', name: 'VIARO Wild', copy: 'Libertad para moverte' },
]

const sizeOptions = ['S', 'M', 'L', 'XL']
const colorOptions = [
  { name: 'Negro', hex: '#171717' },
  { name: 'Marfil', hex: '#eee7d8' },
  { name: 'Azul Marino', hex: '#17233d' },
]

function toggleValue(values, value) {
  return values.includes(value) ? values.filter(item => item !== value) : [...values, value]
}

function Products() {
  const { slug } = useParams()
  const initialLine = ['urban', 'wild'].includes(slug) ? slug : 'all'
  const [activeLine, setActiveLine] = useState(initialLine)
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedCollections, setSelectedCollections] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setActiveLine(['urban', 'wild'].includes(slug) ? slug : 'all')
  }, [slug])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    const result = db.products.filter(product => {
      const matchesLine = activeLine === 'all' || product.line === activeLine
      const matchesCollection = selectedCollections.length === 0 || selectedCollections.includes(product.line)
      const matchesSize = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size))
      const matchesColor = selectedColors.length === 0 || selectedColors.some(color => product.colors.some(item => item.name === color))
      const matchesSearch = !normalizedSearch || [product.name, product.sku, product.material, product.fit]
        .some(value => value.toLowerCase().includes(normalizedSearch))

      return matchesLine && matchesCollection && matchesSize && matchesColor && matchesSearch
    })

    return [...result].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return (b.sold || 0) - (a.sold || 0)
    })
  }, [activeLine, searchTerm, selectedCollections, selectedSizes, selectedColors, sortBy])

  const activeFilterCount = selectedSizes.length + selectedColors.length + selectedCollections.length

  const clearFilters = () => {
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedCollections([])
    setSearchTerm('')
  }

  const selectLine = line => {
    setActiveLine(line)
    setSelectedCollections([])
  }

  return (
    <div className="viaro-shop-page">
      <header className="viaro-shop-hero">
        <span>VIARO / Colección inicial</span>
        <h1>Elige cómo<br />quieres sentirte.</h1>
        <p>Cinco cortes. Dos líneas. Una sola forma de entender la libertad.</p>
      </header>

      <nav className="viaro-line-selector" aria-label="Seleccionar línea">
        {lines.map(line => (
          <button
            type="button"
            key={line.id}
            className={activeLine === line.id ? 'active' : ''}
            onClick={() => selectLine(line.id)}
            aria-pressed={activeLine === line.id}
          >
            <span>{line.number}</span>
            <strong>{line.name}</strong>
            <small>{line.copy}</small>
          </button>
        ))}
      </nav>

      <div className="viaro-shop-toolbar">
        <button type="button" className="mobile-filter-toggle" onClick={() => setFiltersOpen(open => !open)}>
          Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>

        <label className="viaro-shop-search">
          <Search size={17} />
          <input
            type="search"
            placeholder="Buscar por nombre o corte"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </label>

        <span className="viaro-result-count">{filteredProducts.length} productos</span>

        <label className="viaro-sort">
          <span>Ordenar</span>
          <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
            <option value="featured">Destacados</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
            <option value="name">Nombre</option>
          </select>
        </label>
      </div>

      <div className="viaro-shop-layout">
        <aside className={`viaro-filters ${filtersOpen ? 'is-open' : ''}`} aria-label="Filtros de productos">
          <div className="viaro-filter-heading">
            <strong>Filtrar</strong>
            <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Cerrar filtros"><X size={20} /></button>
          </div>

          <fieldset>
            <legend>Talla</legend>
            <div className="filter-size-grid">
              {sizeOptions.map(size => (
                <button
                  type="button"
                  key={size}
                  className={selectedSizes.includes(size) ? 'selected' : ''}
                  onClick={() => setSelectedSizes(values => toggleValue(values, size))}
                  aria-pressed={selectedSizes.includes(size)}
                >{size}</button>
              ))}
            </div>
            <button type="button" className="size-guide-link">Ver guía de tallas</button>
          </fieldset>

          <fieldset>
            <legend>Color</legend>
            <div className="filter-color-list">
              {colorOptions.map(color => (
                <button
                  type="button"
                  key={color.name}
                  className={selectedColors.includes(color.name) ? 'selected' : ''}
                  onClick={() => setSelectedColors(values => toggleValue(values, color.name))}
                  aria-pressed={selectedColors.includes(color.name)}
                >
                  <i style={{ backgroundColor: color.hex }} />
                  {color.name}
                  <span>{selectedColors.includes(color.name) ? '✓' : ''}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Colección</legend>
            <div className="filter-check-list">
              {lines.slice(1).map(line => (
                <label key={line.id}>
                  <input
                    type="checkbox"
                    checked={selectedCollections.includes(line.id)}
                    onChange={() => {
                      setActiveLine('all')
                      setSelectedCollections(values => toggleValue(values, line.id))
                    }}
                  />
                  <span />
                  {line.name}
                </label>
              ))}
            </div>
          </fieldset>

          {activeFilterCount > 0 && <button type="button" className="clear-filter-button" onClick={clearFilters}>Limpiar filtros</button>}
        </aside>

        <main className="viaro-catalog" aria-live="polite">
          {filteredProducts.length > 0 ? (
            <div className="viaro-products-grid">
              {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="viaro-empty-results">
              <span>Sin resultados</span>
              <h2>No encontramos ese corte.</h2>
              <p>Prueba otra combinación de talla, color o colección.</p>
              <button type="button" onClick={clearFilters}>Limpiar filtros</button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Products
