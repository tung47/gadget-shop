import express from 'express'

import {
  signup,
  signin,
  findById,
  deleteUser,
  findAll,
  updateUser,
  getProfile,
  updateProfile,
} from '../controllers/user'
import { protect, admin } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)

router.use(protect)
router.get('/profile', getProfile)
router.patch('/profile', updateProfile)

router.use(admin)
router.get('/', findAll)
router.get('/:userId', findById)
router.patch('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
