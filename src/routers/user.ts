import express from 'express'

import { authUser, getUserProfile, registerUser } from '../controllers/user'
import { protect, admin } from '../middlewares/authMiddleware'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
