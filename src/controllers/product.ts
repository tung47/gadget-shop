import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import Product from '../models/Product'
import { ReviewDocument } from '../models/Review'
import ProductService from '../services/product'
import { NotFoundError } from '../helpers/apiError'

export type Payload = {
  _id: string;
}

export type UserRequestProps = {
  _id: string;
  name: string;
}

export type ReviewProps = {
  name: string;
  rating: number;
  comment: string;
  user: string;
}

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = async (
  req: Request,
  res: Response
  // next: NextFunction
) => {
  // try {
  //   res.json(await ProductService.getProducts())
  // } catch (error) {
  //   next(new NotFoundError('Products not found', error))
  // }
  const keyword: any = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const products = await Product.find({ ...keyword })

  res.json(products)
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

// @desc    Review a product
// @route   POST /api/v1/products/:id/reviews
// @access  Private
export const reviewProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, rating, comment, name } = req.body as ReviewDocument

    const product = await Product.findById(req.params.id)

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === user.toString()
      )

      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }

      const review = {
        name: name,
        rating: Number(rating),
        comment,
        user: user,
      } as ReviewDocument

      product.reviews.push(review)

      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  }
)

// @desc    Get top rated products
// @route   GET /api/v1/products/top
// @access  Public
export const getTopProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
  }
)
