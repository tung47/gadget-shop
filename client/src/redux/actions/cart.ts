import {
  ProductProps,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CartActions
} from '../../types'

export const addToCart = (product: ProductProps): CartActions => {
  return {
    type: CART_ADD_ITEM,
    payload: {
      product,
    },
  }
}

export const removeFromCart = (product: ProductProps): CartActions => {
  return {
    type: CART_REMOVE_ITEM,
    payload: {
      product,
    },
  }
}