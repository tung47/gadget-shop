/* eslint-disable @typescript-eslint/camelcase */
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

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id)

    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  }
)

// @desc    Update order to paid
// @route   GET /api/v1/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = new Date(Date.now())
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }

      const updatedOrder = await order.save()

      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  }
)
