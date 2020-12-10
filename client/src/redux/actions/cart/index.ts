import { Dispatch } from 'redux'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  AppState,
  AsyncAction,
  ProductProps,
  CartActions,
} from '../../../types'

// ADD TO CART AND REMOVE FROM CART ACTIONS
const cartAddItem = (product: ProductProps): CartActions => {
  return {
    type: CART_ADD_ITEM,
    payload: {
      product,
    },
  }
}

const cartRemoveItem = (product: ProductProps): CartActions => {
  return {
    type: CART_REMOVE_ITEM,
    payload: {
      product,
    },
  }
}

export const addToCart = (product: ProductProps): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  dispatch(cartAddItem(product))
  
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cart)
  )
}

export const removeFromCart = (product: ProductProps): AsyncAction => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  dispatch(cartRemoveItem(product))

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cart)
  )
}
