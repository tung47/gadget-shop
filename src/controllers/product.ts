import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import ProductService from '../services/product'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  AppError,
} from '../helpers/apiError'

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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const productId = req.params.productId
    const updatedProduct = await ProductService.update(productId, update)
    res.status(201).json(updatedProduct)
  } catch (err) {
    next(new NotFoundError('Product not found', err))
  }
}

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductService.deleteProduct(req.params.productId)
    res.status(204).end()
  } catch (err) {
    next(new NotFoundError('Product not found', err))
  }
}

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      imageCover,
      description,
      duration,
      distance,
      price,
    } = req.body

    const product = new Product({
      name,
      imageCover,
      description,
      duration,
      distance,
      price,
    })

    await ProductService.create(product)
    res.json(product)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new AppError())
    }
  }
}

// @desc    Create new order
// @route   POST /api/v1/products/order
// @access  Private
export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, userId } = req.body
    console.log('PLACE ORDER REQ BODY: ', req.body)
    const order = await ProductService.placeOrder(productId, userId)
    console.log('ORDER: ', order)
    res.json(order)
  } catch (err) {
    next(new NotFoundError('Product or user is not found', err))
  }
}
