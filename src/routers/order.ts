import express from 'express'

import { addOrderItems, getOrderById } from '../controllers/order'
import { protect } from '../middlewares/authMiddleware'

const router = express.Router()

// Every path we define here will get /api/v1/orders prefix
router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)

export default router
