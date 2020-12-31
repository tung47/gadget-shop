import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import Product from '../models/Product'
import ProductService from '../services/product'
import { NotFoundError } from '../helpers/apiError'

export type Payload = {
  _id: string;
}

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.getProducts())
  } catch (error) {
    next(new NotFoundError('Products not found', error))
  }
}

// @desc    Fetch single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.getProductById(req.params.id))
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      throw new NotFoundError('Product not found')
    }
  }
)

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const userReq = req.user as Payload

    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: userReq._id,
      image:
        'https://d33v4339jhl8k0.cloudfront.net/docs/assets/5c814e0d2c7d3a0cb9325d1f/images/5c8bc20d2c7d3a154460eb97/file-1CjQ85QAme.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  }
)

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new NotFoundError('Product not found')
    }
  }
)
