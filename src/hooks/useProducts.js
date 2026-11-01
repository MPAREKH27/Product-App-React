import { useEffect, useState } from 'react'
import { fetchProducts, fetchCategories } from '../api/products'

/**
 * Loads products and categories once, exposing loading/error state.
 * Keeps data-fetching logic out of presentational components.
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading') // loading | success | error
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus('loading')
      try {
        const [productData, categoryData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ])
        if (cancelled) return
        setProducts(productData)
        setCategories(categoryData)
        setStatus('success')
      } catch (err) {
        if (cancelled) return
        setError(err.message || 'Something went wrong')
        setStatus('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { products, categories, status, error }
}
