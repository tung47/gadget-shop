import {
  ProductProps,
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
      // {
      //   const { product } = action.payload
      //   if (state.cartItems.find((p) => p._id === product._id)) {
      //     return state
      //   } else {
      //     return { ...state, cartItems: [...state.cartItems, product] }
      //   }
      // }
      const item  = action.payload
      console.log("item",item)
      
      const existItem = state.cartItems.find((x: ItemProps) => x.productId === item.productId)
      console.log("existItem",existItem)

      if (existItem) {
        return {
          ...state,
          // cartItems: state.cartItems.map((x: ItemProps) => x.productId === existItem.productId ? item : x),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
      
    // case CART_REMOVE_ITEM: {
    //   const { product } = action.payload
    //   const index = state.cartItems.findIndex((x: ProductProps) => x._id === product._id)
    //   if (index >= 0) {
    //     state.cartItems.splice(index, 1)
    //     return { ...state, cartItems: [...state.cartItems] }
    //   } else {
    //     return state
    //   }
    // }

    case CART_RESET:
      return { 
        ...state, 
        cartItems: [] 
      }
    default:
      return state
  }
}
