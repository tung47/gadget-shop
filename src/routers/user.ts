import express from 'express'

import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from '../controllers/user'
import { protect, admin } from '../middlewares/authMiddleware'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
