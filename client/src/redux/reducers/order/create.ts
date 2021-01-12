import {
  OrderCreateActions,
  OrderCreateState,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
} from '../../../types'

const OrderCreateInit: OrderCreateState = {
  loading: false,
  error: null,
  success: false,
  order: null,
}

export function orderCreateReducer(
  state: OrderCreateState = OrderCreateInit,
  action: OrderCreateActions
): OrderCreateState {
  switch (action.type) {
    case ORDER_CREATE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case ORDER_CREATE_SUCCESS: {
      const { order } = action.payload
      return {
        ...state,
        loading: false,
        success: true,
        order: order,
      }
    }
    case ORDER_CREATE_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error: error,
      }
    }
    case ORDER_CREATE_RESET: {
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        order: null,
      }
    }
    default:
      return state
  }
}
