import axios from 'axios'
import { Dispatch } from 'redux'

import {
  AsyncAction,
  OrderDetailsActions,
  OrderProps,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  UserProps,
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

export const getOrderDetails = (id: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
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

    const { data } = await axios.get(`/api/v1/orders/${id}`, config)
    
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
