import {
  OrderDeliverActions,
  OrderDeliverState,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
} from '../../../types'

const OrderDeliverInit: OrderDeliverState = {
  loading: false,
  error: null,
  success: false,
  order: null,
}

export function orderDeliverReducer(
  state: OrderDeliverState = OrderDeliverInit,
  action: OrderDeliverActions
): OrderDeliverState {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case ORDER_DELIVER_SUCCESS: {
      const { order } = action.payload
      return {
        ...state,
        loading: false,
        success: true,
        order: order,
      }
    }
    case ORDER_DELIVER_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error: error,
      }
    }
    case ORDER_DELIVER_RESET: {
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
