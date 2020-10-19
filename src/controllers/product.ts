import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import ProductService from '../services/product'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
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
