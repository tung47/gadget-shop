import Product, { ProductDocument } from '../models/Product'

function create(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
}

async function getProducts(): Promise<ProductDocument[]> {
  const products = await Product.find({})
  return products
}

async function getProductById(id: string): Promise<ProductDocument> {
  const product = await Product.findById(id).exec()
  if (!product) {
    throw new Error('Product not found')
  } else {
    return product
  }
}

async function deleteProduct(
  productId: string
): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

async function update(
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument> {
  const product = await Product.findById(productId).exec()
  if (!product) throw new Error(`Product ${productId} not found`)
  if (update.name) product.name = update.name
  if (update.price) product.price = update.price
  if (update.description) product.description = update.description
  if (update.image) product.image = update.image
  if (update.brand) product.brand = update.brand
  if (update.category) product.category = update.category
  if (update.countInStock) product.countInStock = update.countInStock
  return product.save()
}

export default {
  create,
  getProducts,
  getProductById,
  update,
  deleteProduct,
}
