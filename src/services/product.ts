import Product, { ProductDocument } from '../models/Product'

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
async function getProducts(): Promise<ProductDocument[]> {
  const products = await Product.find({})
  return products
}

// @desc    Fetch single product
// @route   GET /api/v1/products/:id
// @access  Public
async function getProductById(id: string): Promise<ProductDocument> {
  const product = await Product.findById(id).exec()
  if (!product) {
    throw new Error('Product not found')
  } else {
    return product
  }
}

export default {
  getProducts,
  getProductById,
}
