import { ItemProps, ShippingAddressProps } from './cart'

// Order Actions Types
export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST'
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL'
export const ORDER_CREATE_RESET = 'ORDER_CREATE_RESET'

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST'
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS'
export const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL'

export const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST'
export const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS'
export const ORDER_PAY_FAIL = 'ORDER_PAY_FAIL'
export const ORDER_PAY_RESET = 'ORDER_PAY_RESET'

export const ORDER_DELIVER_REQUEST = 'ORDER_DELIVER_REQUEST'
export const ORDER_DELIVER_SUCCESS = 'ORDER_DELIVER_SUCCESS'
export const ORDER_DELIVER_FAIL = 'ORDER_DELIVER_FAIL'
export const ORDER_DELIVER_RESET = 'ORDER_DELIVER_RESET'

export const ORDER_LIST_MY_REQUEST = 'ORDER_LIST_MY_REQUEST'
export const ORDER_LIST_MY_SUCCESS = 'ORDER_LIST_MY_SUCCESS'
export const ORDER_LIST_MY_FAIL = 'ORDER_LIST_MY_FAIL'
export const ORDER_LIST_MY_RESET = 'ORDER_LIST_MY_RESET'

export const ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST'
export const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS'
export const ORDER_LIST_FAIL = 'ORDER_LIST_FAIL'

export type PaymentResultProps = {
  id: string
  status: string
  update_time: string
  email_address: string
}

export type OrderProps = {
  _id: string
  user: string
  orderItems: ItemProps[]
  shippingAddress: ShippingAddressProps
  paymentMethod: string
  itemsPrice: number
  paymentResult?: PaymentResultProps
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt: string
  isDelivered: boolean
  deliveredAt: string
  createdAt: string
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
export type OrderCreateResetAction = {
  type: typeof ORDER_CREATE_RESET
}

// Order Details Actions
export type OrderDetailsRequestAction = {
  type: typeof ORDER_DETAILS_REQUEST
}
export type OrderDetailsSuccessAction = {
  type: typeof ORDER_DETAILS_SUCCESS
  payload: {
    order: OrderProps
  }
}
export type OrderDetailsFailAction = {
  type: typeof ORDER_DETAILS_FAIL
  payload: {
    error: string
  }
}

// Order Pay Actions
export type OrderPayRequestAction = {
  type: typeof ORDER_PAY_REQUEST
}
export type OrderPaySuccessAction = {
  type: typeof ORDER_PAY_SUCCESS
  payload: {
    paymentResult: PaymentResultProps
  }
}
export type OrderPayFailAction = {
  type: typeof ORDER_PAY_FAIL
  payload: {
    error: string
  }
}
export type OrderPayResetAction = {
  type: typeof ORDER_PAY_RESET
}

// Order Deliver Actions
export type OrderDeliverRequestAction = {
  type: typeof ORDER_DELIVER_REQUEST
}
export type OrderDeliverSuccessAction = {
  type: typeof ORDER_DELIVER_SUCCESS
  payload: {
    order: OrderProps
  }
}
export type OrderDeliverFailAction = {
  type: typeof ORDER_DELIVER_FAIL
  payload: {
    error: string
  }
}
export type OrderDeliverResetAction = {
  type: typeof ORDER_DELIVER_RESET
}

// Order List My Actions
export type OrderListMyRequestAction = {
  type: typeof ORDER_LIST_MY_REQUEST
}
export type OrderListMySuccessAction = {
  type: typeof ORDER_LIST_MY_SUCCESS
  payload: {
    orders: OrderProps[]
  }
}
export type OrderListMyFailAction = {
  type: typeof ORDER_LIST_MY_FAIL
  payload: {
    error: string
  }
}
export type OrderListMyResetAction = {
  type: typeof ORDER_LIST_MY_RESET
}

// Order List Actions
export type OrderListRequestAction = {
  type: typeof ORDER_LIST_REQUEST
}
export type OrderListSuccessAction = {
  type: typeof ORDER_LIST_SUCCESS
  payload: {
    orders: OrderProps[]
  }
}
export type OrderListFailAction = {
  type: typeof ORDER_LIST_FAIL
  payload: {
    error: string
  }
}

export type OrderCreateActions =
  | OrderCreateRequestAction
  | OrderCreateSuccessAction
  | OrderCreateFailAction
  | OrderCreateResetAction

export type OrderDetailsActions =
  | OrderDetailsRequestAction
  | OrderDetailsSuccessAction
  | OrderDetailsFailAction

export type OrderPayActions =
  | OrderPayRequestAction
  | OrderPaySuccessAction
  | OrderPayFailAction
  | OrderPayResetAction

export type OrderDeliverActions =
  | OrderDeliverRequestAction
  | OrderDeliverSuccessAction
  | OrderDeliverFailAction
  | OrderDeliverResetAction

export type OrderListMyActions =
  | OrderListMyRequestAction
  | OrderListMySuccessAction
  | OrderListMyFailAction
  | OrderListMyResetAction

export type OrderListActions =
  | OrderListRequestAction
  | OrderListSuccessAction
  | OrderListFailAction

// Order States
export type OrderCreateState = {
  loading: boolean
  error: string | null
  success: boolean
  order: OrderProps | null
}

export type OrderDetailsState = {
  loading: boolean
  error: string | null
  order: OrderProps | null
}

export type OrderPayState = {
  loading: boolean
  error: string | null
  success: boolean
  paymentResult: PaymentResultProps | null
}

export type OrderDeliverState = {
  loading: boolean
  error: string | null
  success: boolean
  order: OrderProps | null
}

export type OrderListMyState = {
  loading: boolean
  error: string | null
  orders: OrderProps[]
}

export type OrderListState = {
  loading: boolean
  error: string | null
  orders: OrderProps[]
}

export type OrderState = {
  orderCreate: OrderCreateState
  orderDetails: OrderDetailsState
  orderPay: OrderPayState
  orderDeliver: OrderDeliverState
  orderListMy: OrderListMyState
  orderList: OrderListState
}
