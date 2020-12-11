import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import generateToken from '../util/generateToken'
import User, { UserDocument } from '../models/User'
import UserService from '../services/user'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError'

export type Payload = {
  _id: string;
}

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: UserDocument = req.body

  const user: UserDocument = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBanned: user.isBanned,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new UnauthorizedError('Invalid email or password')
  }
})

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userReq = req.user as Payload
    const user = await UserService.findById(userReq._id)

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new NotFoundError('User not found')
    }
  }
)

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userReq = req.user as Payload
    const user = await User.findById(userReq._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }
)

// @desc    Register a new user
// @route   POST /api/v1/users/
// @access  Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const userExists: UserDocument = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new BadRequestError('User already exists')
    }

    const user = new User({ name, email, password })

    await UserService.create(user)

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new BadRequestError('Invalid user data')
    }
  }
)

// @desc    Get all users
// @route   GET /api/v1/users/
// @access  Private/Admin
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({})
  res.json(users)
})
