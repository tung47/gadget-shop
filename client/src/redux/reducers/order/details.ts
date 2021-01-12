import {
  OrderDetailsActions,
  OrderDetailsState,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from '../../../types'

const OrderDetailsInit: OrderDetailsState = {
  loading: false,
  error: null,
  order: null,
}

export function orderDetailsReducer(
  state: OrderDetailsState = OrderDetailsInit,
  action: OrderDetailsActions
): OrderDetailsState {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case ORDER_DETAILS_SUCCESS: {
      const { order } = action.payload
      return {
        ...state,
        loading: false,
        order: order,
      }
    }
    case ORDER_DETAILS_FAIL: {
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
