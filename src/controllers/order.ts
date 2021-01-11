import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import Order from '../models/Order'

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
export const addOrderItems = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      return
    } else {
      const order = new Order({
        orderItems,
        user,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })

      const createdOrder = await order.save()

      res.status(201).json(createdOrder)
    }
  }
)
