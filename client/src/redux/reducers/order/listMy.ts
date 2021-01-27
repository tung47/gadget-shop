import {
  OrderListMyActions,
  OrderListMyState,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
} from '../../../types'

const OrderListMyInit: OrderListMyState = {
  loading: false,
  error: null,
  success: false,
  orders: [],
}

export function orderListMyReducer(
  state: OrderListMyState = OrderListMyInit,
  action: OrderListMyActions
): OrderListMyState {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case ORDER_LIST_MY_SUCCESS: {
      const { orders } = action.payload
      return {
        ...state,
        loading: false,
        success: true,
        orders: orders,
      }
    }
    case ORDER_LIST_MY_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error: error,
      }
    }
    case ORDER_LIST_MY_RESET: {
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        orders: [],
      }
    }
    default:
      return state
  }
}
