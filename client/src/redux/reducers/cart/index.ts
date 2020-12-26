import {
  ProductProps,
  CartState,
  CartActions,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../../../types'

const cartInit: CartState = {
  cartItems: [],
}

export function cartReducer(
  state: CartState = cartInit,
  action: CartActions
): CartState {
  switch (action.type) {
    case CART_ADD_ITEM:
      // {
      //   const { product } = action.payload
      //   if (state.cartItems.find((p) => p._id === product._id)) {
      //     return state
      //   } else {
      //     return { ...state, cartItems: [...state.cartItems, product] }
      //   }
      // }
      const { product } = action.payload
      
      const existItem = state.cartItems.find((x: ProductProps) => x._id === product._id)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: ProductProps) => x._id === existItem._id ? product : x),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, product]
        }
      }
    case CART_REMOVE_ITEM: {
      const { product } = action.payload
      const index = state.cartItems.findIndex((x: ProductProps) => x._id === product._id)
      if (index >= 0) {
        state.cartItems.splice(index, 1)
        return { ...state, cartItems: [...state.cartItems] }
      } else {
        return state
      }
    }
    default:
      return state
  }
}
