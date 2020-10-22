import axios from 'axios'
import { Dispatch } from 'redux'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  AppState,
  AsyncAction,
} from '../../types'

// ADD TO CART AND REMOVE FROM CART ACTIONS

export const addToCart = (id: string, qty: number): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id: string): AsyncAction => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
