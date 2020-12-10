import {
  CartState,
  CartActions,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../../../types'

export default function cart(
  state: CartState = { cartItems: [] },
  action: CartActions
): CartState {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const { product } = action.payload
      if (state.cartItems.find((p) => p._id === product._id)) {
        return state
      } else {
        return { ...state, cartItems: [...state.cartItems, product] }
      }
    }
    case CART_REMOVE_ITEM: {
      const { product } = action.payload
      const index = state.cartItems.findIndex((p) => p._id === product._id)
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
