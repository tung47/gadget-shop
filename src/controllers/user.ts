import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import generateToken from '../util/generateToken'
import User, { UserDocument } from '../models/User'
import UserService from '../services/user'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
} from '../helpers/apiError'

export type Payload = {
  _id: string;
}

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const authUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, isBanned }: UserDocument = req.body

    const user: UserDocument = await User.findOne({ email })

    if (isBanned) {
      next(new ForbiddenError('User is banned. Cannot login in.'))
    } else if (!isBanned && user && (await user.matchPassword(password))) {
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
  }
)

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
        isBanned: user.isBanned,
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
        isBanned: updatedUser.isBanned,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new NotFoundError('User not found')
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
        isBanned: user.isBanned,
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
    throw new NotFoundError('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new NotFoundError('User not found')
  }
})

// @desc    Edit user status
// @route   PUT /api/users/:id
// @access  Private/Admin
export const editUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.isAdmin = req.body.isAdmin
    user.isBanned = req.body.isBanned

    const editedUser = await user.save()

    res.json({
      _id: editedUser._id,
      isAdmin: editedUser.isAdmin,
      isBanned: editedUser.isBanned,
    })
  } else {
    res.status(404)
    throw new NotFoundError('User not found')
  }
})
