import express from 'express'

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/order'
import { protect, admin } from '../middlewares/authMiddleware'

const router = express.Router()

// Every path we define here will get /api/v1/orders prefix
router.route('/').post(protect, addOrderItems).get(getOrders)
router.route('/myorders').get(getMyOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(updateOrderToDelivered)

export default router
