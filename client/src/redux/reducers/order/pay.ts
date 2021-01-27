import {
  OrderPayActions,
  OrderPayState,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../../../types'

const OrderPayInit: OrderPayState = {
  loading: false,
  error: null,
  success: false,
  paymentResult: null,
}

export function orderPayReducer(
  state: OrderPayState = OrderPayInit,
  action: OrderPayActions
): OrderPayState {
  switch (action.type) {
    case ORDER_PAY_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case ORDER_PAY_SUCCESS: {
      const { paymentResult } = action.payload
      return {
        ...state,
        loading: false,
        success: true,
        paymentResult: paymentResult,
      }
    }
    case ORDER_PAY_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error: error,
      }
    }
    case ORDER_PAY_RESET: {
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        paymentResult: null,
      }
    }
    default:
      return state
  }
}
