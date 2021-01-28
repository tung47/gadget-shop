import axios from 'axios'
import { Dispatch } from 'redux'

import {
  AsyncAction,
  OrderListActions,
  OrderProps,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  UserProps,
} from '../../../types'
// import { logout } from '../user/loginLogout'

const orderListRequest = (): OrderListActions => {
  return {
    type: ORDER_LIST_REQUEST,
  }
}

const orderListSuccess = (orders: OrderProps[]): OrderListActions => {
  return {
    type: ORDER_LIST_SUCCESS,
    payload: {
      orders: orders,
    },
  }
}

const orderListFail = (error: string): OrderListActions => {
  return {
    type: ORDER_LIST_FAIL,
    payload: {
      error: error,
    },
  }
}

export const listOrders = (): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(orderListRequest())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/orders`, config)

    dispatch(orderListSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      // dispatch(logout())
    }
    dispatch(orderListFail(message))
  }
}
