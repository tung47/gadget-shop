import axios from 'axios'
import { Dispatch } from 'redux'

import { apiURL } from '../../../api'
import {
  AsyncAction,
  OrderDetailsActions,
  OrderProps,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  UserProps,
  AppState,
} from '../../../types'
// import { logout } from '../user/loginLogout'

const orderDetailsRequest = (): OrderDetailsActions => {
  return {
    type: ORDER_DETAILS_REQUEST,
  }
}

const orderDetailsSuccess = (order: OrderProps): OrderDetailsActions => {
  return {
    type: ORDER_DETAILS_SUCCESS,
    payload: {
      order: order,
    },
  }
}

const orderDetailsFail = (error: string): OrderDetailsActions => {
  return {
    type: ORDER_DETAILS_FAIL,
    payload: {
      error: error,
    },
  }
}

export const getOrderDetails = (orderId: string): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch(orderDetailsRequest())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`${apiURL}/api/v1/orders/${orderId}`, config)
    
    dispatch(orderDetailsSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      // dispatch(logout())
    }
    dispatch(orderDetailsFail(message))
  }
}
