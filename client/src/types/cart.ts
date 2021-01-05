// Cart Actions Types
export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS'
export const CART_SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD'
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

export type CartAddressProps = {
  address: string,
  city: string,
  postalCode: number, 
  country: string,
}

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

export type CartSaveShippingAddressAction = {
  type: typeof CART_SAVE_SHIPPING_ADDRESS
  payload: {
    cartAddress: CartAddressProps
  }
}

export type CartResetAction = {
  type: typeof CART_RESET
}

export type CartActions =
  | CartAddItemAction
  | CartRemoveItemAction
  | CartSaveShippingAddressAction
  | CartResetAction

// Cart State
export type CartState = {
  cartItems: ItemsProps
  shippingAddress: CartAddressProps | null
}
