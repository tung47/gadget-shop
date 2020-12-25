import {
  ProductProps,
  CartItemsState,
  CartActions,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../../../types'

const cartItemsInit: CartItemsState = {
  items: [],
}

export function cartItemsReducer(
  state: CartItemsState = cartItemsInit,
  action: CartActions
): CartItemsState {
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
      const { product: item } = action.payload
      console.log(item)
      const { _id } = item as ProductProps

      const existItem = state.items.find((x) => x._id === _id)

      if (existItem) {
        return {
          ...state,
          items: state.items.map((x) => (x._id === item._id ? item : x)),
        }
      } else {
        return {
          ...state,
          items: [...state.items, item],
        }
      }
    case CART_REMOVE_ITEM: {
      const { product } = action.payload
      const index = state.items.findIndex((x) => x._id === product._id)
      if (index >= 0) {
        state.items.splice(index, 1)
        return { ...state, items: [...state.items] }
      } else {
        return state
      }
    }
    default:
      return state
  }
}
