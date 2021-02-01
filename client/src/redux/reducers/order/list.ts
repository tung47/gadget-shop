import {
  OrderListActions,
  OrderListState,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from '../../../types'

const OrderListInit: OrderListState = {
  loading: false,
  error: null,
  orders: [],
}

export function orderListReducer(
  state: OrderListState = OrderListInit,
  action: OrderListActions
): OrderListState {
  switch (action.type) {
    case ORDER_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case ORDER_LIST_SUCCESS: {
      const { orders } = action.payload
      return {
        ...state,
        loading: false,
        orders: orders,
      }
    }
    case ORDER_LIST_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error: error,
      }
    }
    default:
      return state
  }
}
