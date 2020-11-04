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

export type RequestHeadersProps = {
  authorization: string;
}

export type DecodedProps = {
  id: string;
}

export type AdminPayload = {
  isAdmin: boolean;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token
    const headersReq = req.headers as RequestHeadersProps
    if (
      headersReq.authorization &&
      headersReq.authorization.startsWith('Bearer')
    ) {
      try {
        token = headersReq.authorization.split(' ')[1]

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET
        ) as DecodedProps

        req.user = await User.findById(decoded.id).select('-password')

        next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
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
