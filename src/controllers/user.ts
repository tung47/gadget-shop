import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import generateToken from '../util/generateToken'
import User from '../models/User'

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = new User({
      name,
      email,
      password,
      isAdmin: false,
    })

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
)

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)

    if (user) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }
)

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser.id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }
)

// @desc    Get all users
// @route   GET /v1/api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
