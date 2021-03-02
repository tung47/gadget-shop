import axios from 'axios'
import { Dispatch } from 'redux'

import { apiURL } from '../../../api'
import {
  AsyncAction,
  OrderListMyActions,
  OrderProps,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  UserProps,
  ORDER_LIST_MY_RESET,
} from '../../../types'
// import { logout } from '../user/loginLogout'

const orderListMyRequest = (): OrderListMyActions => {
  return {
    type: ORDER_LIST_MY_REQUEST,
  }
}

const orderListMySuccess = (orders: OrderProps[]): OrderListMyActions => {
  return {
    type: ORDER_LIST_MY_SUCCESS,
    payload: {
      orders: orders,
    },
  }
}

const orderListMyFail = (error: string): OrderListMyActions => {
  return {
    type: ORDER_LIST_MY_FAIL,
    payload: {
      error: error,
    },
  }
}

export const orderListMyReset = (): OrderListMyActions => {
  return {
    type: ORDER_LIST_MY_RESET,
  }
}

export const listMyOrders = (): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(orderListMyRequest())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`${apiURL}/api/v1/orders/myorders`, config)

    dispatch(orderListMySuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      // dispatch(logout())
    }
    dispatch(orderListMyFail(message))
  }
}
