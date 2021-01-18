import axios from 'axios'
import { Dispatch } from 'redux'

import {
  AsyncAction,
  OrderPayActions,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  UserProps,
  ORDER_PAY_RESET,
  PaymentResultProps,
  AppState,
} from '../../../types'
// import { logout } from '../user/loginLogout'

const orderPayRequest = (): OrderPayActions => {
  return {
    type: ORDER_PAY_REQUEST,
  }
}

const orderPaySuccess = (
  paymentResult: PaymentResultProps
): OrderPayActions => {
  return {
    type: ORDER_PAY_SUCCESS,
    payload: {
      paymentResult: paymentResult,
    },
  }
}

const orderPayFail = (error: string): OrderPayActions => {
  return {
    type: ORDER_PAY_FAIL,
    payload: {
      error: error,
    },
  }
}

export const orderPayReset = (): OrderPayActions => {
  return {
    type: ORDER_PAY_RESET,
  }
}

export const payOrder = (
  orderId: string,
  paymentResult: PaymentResultProps
): AsyncAction => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    dispatch(orderPayRequest())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    dispatch(orderPaySuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      // dispatch(logout())
    }
    dispatch(orderPayFail(message))
  }
}
