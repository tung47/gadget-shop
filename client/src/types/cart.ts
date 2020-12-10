import { ProductProps } from './product'

// Cart Actions Types
export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const CART_FAIL_ITEM = 'CART_FAIL_ITEM'

// Cart Actions
export type CartAddItemAction = {
  type: typeof CART_ADD_ITEM
  payload: {
    product: ProductProps
  }
}

export type CartRemoveItemAction = {
  type: typeof CART_REMOVE_ITEM
  payload: {
    product: ProductProps
  }
}

export type CartFailItemAction = {
  type: typeof CART_FAIL_ITEM
  error: string | null
}

export type CartActions =
  | CartAddItemAction
  | CartRemoveItemAction
  | CartFailItemAction

// Cart State
export type CartState = {
  cartItems: ProductProps[]
}
