import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

/**
 * Displays a single product in the grid. Reusable anywhere a product
 * needs a compact visual representation.
 */
export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  function handleAddToCart(e) {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="product-card__image"
            loading="lazy"
          />
          <span className="product-card__category">{product.category}</span>
        </div>

        <div className="product-card__body">
          <h3 className="product-card__title">{product.title}</h3>

          <div className="price-tag" aria-label={`Price: $${product.price.toFixed(2)}`}>
            <span className="price-tag__hole" />
            <span className="price-tag__amount">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        className="btn btn--primary product-card__cta"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </article>
  )
}
