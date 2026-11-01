import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <div className="state-block">
        <p className="eyebrow">404</p>
        <p>That page doesn't exist.</p>
        <Link to="/" className="btn btn--primary">
          Back to catalog
        </Link>
      </div>
    </div>
  )
}
