import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import generateToken from '../util/generateToken'
import User, { UserDocument } from '../models/User'
import UserService from '../services/user'
import {
  BadRequestError,
  AppError,
  JWTError,
  NotFoundError,
} from '../helpers/apiError'

export type Payload = {
  _id: string;
}

// JWT handlers
const signToken = (id: string): string => {
  try {
    return jwt.sign({ id }, process.env['JWT_SECRET'] as string, {
      expiresIn: process.env['JWT_EXPIRES_IN'] as string,
    })
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      throw new JWTError('Invalid Token. Please login again', err)
    } else {
      throw new AppError()
    }
  }
}

const createSendToken = (
  user: UserDocument,
  statusCode: number,
  res: Response
): void => {
  const token = signToken(user._id)
  const JWT_COOKIE_EXPIRES_IN = process.env['JWT_COOKIE_EXPIRES_IN'] as unknown
  const cookieOptions = {
    expires: new Date(
      Date.now() + (JWT_COOKIE_EXPIRES_IN as number) * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
  res.cookie('jwt', token, cookieOptions)
  const { name, email, products, isAdmin } = user
  res.status(statusCode).json({
    name,
    email,
    products,
    isAdmin,
    token,
  })
}

//POST / users/signin
export const signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return next(new BadRequestError('Please provide email and password'))
      }
      const user = await User.findOne({ email }).select('+password')
      if (!user || !user.matchPassword(password)) {
        return next(new BadRequestError('Invalid login data'))
      }
      createSendToken(user, 200, res)
    } catch (err) {
      new BadRequestError('User is not found')
    }
  }
)

//POST / users/signup
export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, passwordConfirm } = req.body
      const userExists = await User.findOne({ email })
      if (userExists) {
        return res.status(409).json({ message: 'Email already in use' })
      }
      const user: UserDocument = new User({
        email,
        password,
        passwordConfirm,
      })
      await UserService.create(user)
      createSendToken(user, 201, res)
    } catch (err) {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Passwords do not match', err))
      } else next(new AppError())
    }
  }
)

//GET / users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAll())
  } catch (err) {
    next(new NotFoundError('Not found', err))
  }
}

//GET / users/:userId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findById(req.params.userId))
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}

//PATCH / users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const { userId } = req.params

    const user = await UserService.updateUser(userId, update)
    console.log('UPDATED USER: ', user)
    res.status(200).json({
      user,
    })
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}

//DELETE / users/:userId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUser(req.params.userId)
    res
      .status(204)
      .json({
        message: 'user deleted',
        data: null,
      })
      .end()
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}

//GET / users/profile
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userReq = req.user as Payload
    const user = await UserService.findById(userReq._id)
    if (user) {
      res.json({
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      })
    }
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}

//PATCH / users/profile
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const update = req.body
  const userReq = req.user as Payload
  try {
    const user = await UserService.updateProfile(userReq._id, update)
    res.status(200).json({
      user,
    })
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}
