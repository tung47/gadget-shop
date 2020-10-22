import {
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

      const existItem = state.cartItems.find((p) => p._id === product._id)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p._id === existItem._id ? product : p
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, product],
        }
      }
    }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (p) => p._id !== action.payload.product._id
        ),
      }

    default:
      return state
  }
}
