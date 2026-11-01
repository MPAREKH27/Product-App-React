import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { fetchProductById } from '../api/products'
import { useCart } from '../context/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setJustAdded(false)

    fetchProductById(id)
      .then((data) => {
        if (cancelled) return
        setProduct(data)
        setStatus('success')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || 'Something went wrong')
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [id])

  function handleAddToCart() {
    addToCart(product, quantity)
    setJustAdded(true)
  }

  if (status === 'loading') {
    return (
      <div className="page">
        <div className="state-block">
          <div className="spinner" aria-hidden="true" />
          <p>Loading product…</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="page">
        <div className="state-block state-block--error">
          <p>Couldn't load this product: {error}</p>
          <button type="button" className="btn" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Back to catalog
      </Link>

      <div className="details">
        <div className="details__image-wrap">
          <img src={product.image} alt={product.title} className="details__image" />
        </div>

        <div className="details__body">
          <span className="product-card__category">{product.category}</span>
          <h1 className="details__title">{product.title}</h1>

          <div className="details__rating">
            ★ {product.rating?.rate ?? '—'}
            <span className="details__rating-count">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <div className="price-tag price-tag--lg">
            <span className="price-tag__hole" />
            <span className="price-tag__amount">${product.price.toFixed(2)}</span>
          </div>

          <p className="details__description">{product.description}</p>

          <div className="details__actions">
            <div className="qty-stepper">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button type="button" className="btn btn--primary" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>

          {justAdded && (
            <p className="details__confirm" role="status">
              Added {quantity} to cart. <Link to="/cart">View cart →</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
