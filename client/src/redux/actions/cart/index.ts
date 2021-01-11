import axios from 'axios'
import { Dispatch } from 'redux'

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_RESET,
  AppState,
  AsyncAction,
  CartActions,
  ItemProps,
  ShippingAddressProps,
  CART_SAVE_PAYMENT_METHOD,
} from '../../../types'

// Cart add item actions
const cartAddItem = ({
  productId,
  name,
  image,
  price,
  countInStock,
  qty,
}: ItemProps): CartActions => {
  return {
    type: CART_ADD_ITEM,
    payload: {
      productId,
      name,
      image,
      price,
      countInStock,
      qty,
    },
  }
}

export const addToCart = (id: string, qty: number): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const { data } = await axios.get(`/api/v1/products/${id}`)

  dispatch(
    cartAddItem({
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    })
  )

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Cart remove item actions
const cartRemoveItem = (id: string): CartActions => {
  return {
    type: CART_REMOVE_ITEM,
    payload: {
      id,
    },
  }
}

export const removeFromCart = (id: string): AsyncAction => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  dispatch(cartRemoveItem(id))

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Cart save shipping address actions
const cartSaveShippingAddress = (
  shippingAddress: ShippingAddressProps
): CartActions => {
  return {
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: {
      shippingAddress: shippingAddress,
    },
  }
}

export const saveShippingAddress = (shippingAddress: ShippingAddressProps) => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  dispatch(cartSaveShippingAddress(shippingAddress))

  localStorage.setItem(
    'shippingAddress',
    JSON.stringify(getState().cart.shippingAddress)
  )
}

// Cart save payment methods actions
const cartSavePaymentMethods = (paymentMethod: string): CartActions => {
  return {
    type: CART_SAVE_PAYMENT_METHOD,
    payload: {
      paymentMethod: paymentMethod,
    },
  }
}

export const savePaymentMethod = (paymentMethod: string) => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  dispatch(cartSavePaymentMethods(paymentMethod))

  localStorage.setItem(
    'paymentMethod',
    JSON.stringify(getState().cart.paymentMethod)
  )
}

// Cart reset action
export const cartResetAction = (): CartActions => {
  return {
    type: CART_RESET,
  }
}
