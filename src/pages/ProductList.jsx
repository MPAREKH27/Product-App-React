import { useMemo, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import SortSelect from '../components/SortSelect'

export default function ProductList() {
  const { products, categories, status, error } = useProducts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')

  const visibleProducts = useMemo(() => {
    let result = [...products]

    if (category !== 'all') {
      result = result.filter((p) => p.category === category)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(q))
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return result
  }, [products, category, search, sort])

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="page__title">Every day carry, priced plainly.</h1>
        </div>
      </div>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {status === 'success' && (
        <CategoryFilter categories={categories} selected={category} onChange={setCategory} />
      )}

      {status === 'loading' && (
        <div className="state-block">
          <div className="spinner" aria-hidden="true" />
          <p>Loading products…</p>
        </div>
      )}

      {status === 'error' && (
        <div className="state-block state-block--error">
          <p>Couldn't load products: {error}</p>
        </div>
      )}

      {status === 'success' && visibleProducts.length === 0 && (
        <div className="state-block">
          <p>No products match your search.</p>
        </div>
      )}

      {status === 'success' && visibleProducts.length > 0 && (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
