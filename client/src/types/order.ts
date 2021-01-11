import { ItemProps, ShippingAddressProps } from './cart'

// Order Actions Types
export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST'
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL'

export type PaymentResultProps = {
  id: string
  status: string
  updateTime: string
  emailAddress: string
}

export type OrderProps = {
  _id?: string
  user: string
  orderItems: ItemProps[]
  shippingAddress: ShippingAddressProps
  paymentMethod: string
  itemsPrice: number
  paymentResult?: PaymentResultProps
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  isPaid?: boolean
  paidAt?: Date
  isDelivered?: boolean
  deliveredAt?: Date
}

// Order Create Actions
export type OrderCreateRequestAction = {
  type: typeof ORDER_CREATE_REQUEST
}
export type OrderCreateSuccessAction = {
  type: typeof ORDER_CREATE_SUCCESS
  payload: {
    order: OrderProps
  }
}
export type OrderCreateFailAction = {
  type: typeof ORDER_CREATE_FAIL
  payload: {
    error: string
  }
}

export type OrderCreateActions =
  | OrderCreateRequestAction
  | OrderCreateSuccessAction
  | OrderCreateFailAction

// Order States
export type OrderCreateState = {
  loading: boolean
  error: string | null
  success: boolean
  order: OrderProps | null
}

export type OrderState = {
  orderCreate: OrderCreateState
}
