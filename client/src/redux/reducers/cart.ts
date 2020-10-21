import {
  AppState,
  CartState,
  CartActions,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../../types'

export default function cart(
  state: CartState = { cartItems: [] },
  action: CartActions
): CartState {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const { product } = action.payload
      if (state.cartItems.find((p) => p._id === product._id)) {
        return state
      }

      return {
        ...state,
        cartItems: [...state.cartItems, product],
      }
    }

    default:
      return state
  }
}
