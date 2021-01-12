import axios from 'axios'
import { Dispatch } from 'redux'

import {
  AsyncAction,
  OrderCreateActions,
  OrderProps,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  UserProps,
  ORDER_CREATE_RESET,
} from '../../../types'
// import { logout } from '../user/loginLogout'

const orderCreateRequest = (): OrderCreateActions => {
  return {
    type: ORDER_CREATE_REQUEST,
  }
}

const orderCreateSuccess = (order: OrderProps): OrderCreateActions => {
  return {
    type: ORDER_CREATE_SUCCESS,
    payload: {
      order: order,
    },
  }
}

const orderCreateFail = (error: string): OrderCreateActions => {
  return {
    type: ORDER_CREATE_FAIL,
    payload: {
      error: error,
    },
  }
}

export const orderCreateReset = (): OrderCreateActions => {
  return {
    type: ORDER_CREATE_RESET,
  }
}

export const createOrder = (order: OrderProps): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(orderCreateRequest())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post(`/api/v1/orders`, order, config)

    dispatch(orderCreateSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      // dispatch(logout())
    }
    dispatch(orderCreateFail(message))
  }
}
