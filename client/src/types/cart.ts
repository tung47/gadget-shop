// Cart Actions Types
export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const CART_RESET = 'CART_RESET'

export type ItemProps = {
  productId: string
  name: string
  image: string
  price: number
  countInStock: number
  qty: number
}

export type ItemsProps = ItemProps[]

// Cart Actions
export type CartAddItemAction = {
  type: typeof CART_ADD_ITEM
  payload: {
    productId: string
    name: string
    image: string
    price: number
    countInStock: number
    qty: number
  }
}

export type CartRemoveItemAction = {
  type: typeof CART_REMOVE_ITEM
  payload: {
    id: string
  }
}

export type CartResetAction = {
  type: typeof CART_RESET
}

export type CartActions =
  | CartAddItemAction
  | CartRemoveItemAction
  | CartResetAction

// Cart State
export type CartState = {
  cartItems: ItemsProps
}
