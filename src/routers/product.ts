import express from 'express'

import {
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/product'
import { protect, admin } from '../middlewares/authMiddleware'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
