import express from 'express'
import asyncHandler from 'express-async-handler'

import Product from '../models/Product'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix

// @desc Fetch all products
// @route GET /api/v1/products
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc Fetch single product
// @route GET /api/v1/product/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
