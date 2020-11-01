import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import {
  BadRequestError,
  UnauthorizedError,
  JWTError,
  AppError,
} from '../helpers/apiError'

export type AdminPayload = {
  isAdmin: boolean;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1]
      }
      if (!token) {
        return next(new UnauthorizedError('You are not logged in'))
      }

      const decoded: any = jwt.verify(
        token,
        process.env['JWT_SECRET'] as string
      )

      const currentUser = await User.findById(decoded.id)
      if (!currentUser) {
        return next(new JWTError('The user with this token does not exist.'))
      }
      req.user = currentUser
      next()
    } catch (err) {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid Request', err))
      } else {
        return next(new AppError())
      }
    }
  }
)

export const admin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminReq = req.user as AdminPayload
      if (req.user && adminReq.isAdmin) {
        next()
      } else {
        return next(new UnauthorizedError('You do not have permissions'))
      }
    } catch (err) {
      return next(new AppError())
    }
  }
)
