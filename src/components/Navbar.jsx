import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-mark">●</span>
          Marker
        </Link>

        <nav className="navbar__actions">
          <ThemeToggle />
          <Link to="/cart" className="cart-link" aria-label={`Cart, ${totalItems} items`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && <span className="cart-link__badge">{totalItems}</span>}
          </Link>
        </nav>
      </div>
    </header>
  )
}
