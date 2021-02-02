/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import { UserDocument } from '../models/User'
import Order, { paymentResultProps } from '../models/Order'

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
      } as paymentResultProps

      const updatedOrder = await order.save()

      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  }
)

// @desc    Update order to delivered
// @route   GET /api/v1/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isDelivered = true
      order.deliveredAt = new Date(Date.now())

      const updatedOrder = await order.save()

      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  }
)

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.user as UserDocument
  const orders = await Order.find({ user: _id })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})
