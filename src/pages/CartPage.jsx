import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="state-block">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn--primary">
            Browse products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="eyebrow">Cart</p>
          <h1 className="page__title">Your bag</h1>
        </div>
        <button type="button" className="btn" onClick={clearCart}>
          Clear cart
        </button>
      </div>

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <img src={item.image} alt={item.title} className="cart-row__image" />

            <div className="cart-row__info">
              <Link to={`/product/${item.id}`} className="cart-row__title">
                {item.title}
              </Link>
              <span className="product-card__category">{item.category}</span>
            </div>

            <div className="qty-stepper">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label={`Decrease quantity of ${item.title}`}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>
            </div>

            <div className="price-tag">
              <span className="price-tag__hole" />
              <span className="price-tag__amount">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              className="cart-row__remove"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.title} from cart`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <span>Total</span>
        <span className="cart-summary__total">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  )
}
