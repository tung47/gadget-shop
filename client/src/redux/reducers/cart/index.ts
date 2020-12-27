import {
  ItemProps,
  CartState,
  CartActions,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
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
      const item = action.payload

      const existItem = state.cartItems.find(
        (x: ItemProps) => x.productId === item.productId
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: ItemProps) =>
            x.productId === existItem.productId ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      const { id } = action.payload
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.productId !== id),
      }
    case CART_RESET:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}
