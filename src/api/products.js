const BASE_URL = 'https://fakestoreapi.com'

/**
 * Fetch all products from the Fake Store API.
 * @returns {Promise<Array>} list of product objects
 */
export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) {
    throw new Error(`Failed to load products (${res.status})`)
  }
  return res.json()
}

/**
 * Fetch a single product by id.
 * @param {string|number} id
 * @returns {Promise<Object>} product object
 */
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) {
    throw new Error(`Failed to load product ${id} (${res.status})`)
  }
  return res.json()
}

/**
 * Fetch the list of available product categories.
 * @returns {Promise<Array<string>>}
 */
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`)
  if (!res.ok) {
    throw new Error(`Failed to load categories (${res.status})`)
  }
  return res.json()
}
