import express from 'express'

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/order'
import { protect } from '../middlewares/authMiddleware'

const router = express.Router()

// Every path we define here will get /api/v1/orders prefix
router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(getMyOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
