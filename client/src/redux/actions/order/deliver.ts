import axios from 'axios'
import { Dispatch } from 'redux'

import {
  AsyncAction,
  OrderDeliverActions,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  UserProps,
  ORDER_DELIVER_RESET,
  AppState,
  OrderProps,
} from '../../../types'
// import { logout } from '../user/loginLogout'

const orderDeliverRequest = (): OrderDeliverActions => {
  return {
    type: ORDER_DELIVER_REQUEST,
  }
}

const orderDeliverSuccess = (order: OrderProps): OrderDeliverActions => {
  return {
    type: ORDER_DELIVER_SUCCESS,
    payload: {
      order: order,
    },
  }
}

const orderDeliverFail = (error: string): OrderDeliverActions => {
  return {
    type: ORDER_DELIVER_FAIL,
    payload: {
      error: error,
    },
  }
}

export const orderDeliverReset = (): OrderDeliverActions => {
  return {
    type: ORDER_DELIVER_RESET,
  }
}

export const deliverOrder = (orderId: string): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch(orderDeliverRequest())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.put(
      `/api/v1/orders/${orderId}/deliver`,
      {},
      config
    )

    dispatch(orderDeliverSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      // dispatch(logout())
    }
    dispatch(orderDeliverFail(message))
  }
}
