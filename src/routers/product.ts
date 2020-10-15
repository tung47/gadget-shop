import express from 'express'

import { getProductById, getProducts } from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router
