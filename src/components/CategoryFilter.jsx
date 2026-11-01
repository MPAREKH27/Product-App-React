export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="category-filter" role="group" aria-label="Filter by category">
      <button
        type="button"
        className={`chip ${selected === 'all' ? 'chip--active' : ''}`}
        onClick={() => onChange('all')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`chip ${selected === category ? 'chip--active' : ''}`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
