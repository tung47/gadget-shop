import Product from '../../src/models/Product'
import ProductService from '../../src/services/product'
import * as dbHelper from '../db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

async function createProduct() {
  const product = new Product({
    name: 'Canon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  })
  return await ProductService.create(product)
}

describe('product service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const product = await createProduct()
    expect(product).toHaveProperty('_id')
    expect(product).toHaveProperty('name', 'Canon EOS 80D DSLR Camera')
    expect(product).toHaveProperty('brand', 'Canon')
  })

  it('should get a product with id', async () => {
    const product = await createProduct()
    const found = await ProductService.getProductById(product._id)
    expect(found.name).toEqual(product.name)
    expect(found._id).toEqual(product._id)
  })

  it('should not get a non-existing user', async () => {
    expect.assertions(1)
    return ProductService.getProductById(nonExistingProductId).catch((e) => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })

  it('should update an existing product', async () => {
    const product = await createProduct()
    const update = {
      name: 'Google Pixel 5 128GB 5G',
      brand: 'Google Pixel',
    }
    const updated = await ProductService.update(product._id, update)
    expect(updated).toHaveProperty('_id', product._id)
    expect(updated).toHaveProperty('name', 'Google Pixel 5 128GB 5G')
    expect(updated).toHaveProperty('brand', 'Google Pixel')
  })

  it('should not update a non-existing user', async () => {
    expect.assertions(1)
    const update = {
      name: 'Canon EOS 80D DSLR Camera',
      price: 1000.0,
    }
    return ProductService.update(nonExistingProductId, update).catch((e) => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })

  it('should delete an existing product', async () => {
    expect.assertions(1)
    const product = await createProduct()
    await ProductService.deleteProduct(product._id)
    return ProductService.getProductById(product._id).catch((e) => {
      expect(e.message).toBe(`Product ${product._id} not found`)
    })
  })
})
