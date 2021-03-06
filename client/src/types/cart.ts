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

export type ShippingAddressProps = {
  address?: string,
  city?: string,
  postalCode?: string, 
  country?: string,
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
    shippingAddress: ShippingAddressProps
  }
}

export type CartSavePaymentMethodAction = {
  type: typeof CART_SAVE_PAYMENT_METHOD
  payload: {
    paymentMethod: string
  }
}

export type CartResetAction = {
  type: typeof CART_RESET
}

export type CartActions =
  | CartAddItemAction
  | CartRemoveItemAction
  | CartSaveShippingAddressAction
  | CartSavePaymentMethodAction
  | CartResetAction

// Cart State
export type CartState = {
  cartItems: ItemsProps
  shippingAddress: ShippingAddressProps | null
  paymentMethod: string | null
  itemsPrice: number | null
  shippingPrice: number | null
  taxPrice: number | null
  totalPrice: number | null
}
