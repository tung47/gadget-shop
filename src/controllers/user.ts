import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import User from '../models/User'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
// export const authUser = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { email, password } = req.body

//     const user = await User.findOne({email})

//     if(user && (await user.matchPassword(password))) {
//       res.json({
//         _id:user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         token: null,
//       })
//     } else {
//       res.status(401)
//       throw new Error('Invalid email or password')
//     }
//   }
// )

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = new User({
      name,
      email,
      password,
      isAdmin: null,
    })
    await user.matchPassword(password)
    res.status(200).json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}