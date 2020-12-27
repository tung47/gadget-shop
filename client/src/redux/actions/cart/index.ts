import axios from 'axios'
import { Dispatch } from 'redux'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  AppState,
  AsyncAction,
  ProductProps,
  CartActions,
} from '../../../types'

// Cart add item actions

// const cartAddItem = (product: ProductProps): CartActions => {
//   return {
//     type: CART_ADD_ITEM,
//     payload: {
//       product,
//     },
//   }
// }

// export const addToCart = (product: ProductProps): AsyncAction => async (
//   dispatch: Dispatch,
//   getState: () => AppState
// ) => {
//   dispatch(cartAddItem(product))

//   localStorage.setItem(
//     'cartItems',
//     JSON.stringify(getState().cart)
//   )
// }
export const addToCart = (id: string, qty: number): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const { data } = await axios.get(`/api/v1/products/${id}`)
  console.log("data", data)
  
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// // Cart remove item actions
// const cartRemoveItem = (product: ProductProps): CartActions => {
//   return {
//     type: CART_REMOVE_ITEM,
//     payload: {
//       product,
//     },
//   }
// }

// export const removeFromCart = (product: ProductProps): AsyncAction => (
//   dispatch: Dispatch,
//   getState: () => AppState
// ) => {
//   dispatch(cartRemoveItem(product))

//   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// }

export const cartResetAction = (): CartActions => {
  return {
    type: CART_RESET,
  }
}
