import axios from 'axios'
import { Dispatch } from 'redux'

import { apiURL } from '../../../api'
import {
  AsyncAction,
  ProductCreateActions,
  ProductProps,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  UserProps,
} from '../../../types'

const productCreateRequest = (): ProductCreateActions => {
  return {
    type: PRODUCT_CREATE_REQUEST,
  }
}

const productCreateSuccess = (product: ProductProps): ProductCreateActions => {
  return {
    type: PRODUCT_CREATE_SUCCESS,
    payload: {
      product,
    },
  }
}

const productCreateFail = (error: string): ProductCreateActions => {
  return {
    type: PRODUCT_CREATE_FAIL,
    error: error,
  }
}

export const productCreateReset = (): ProductCreateActions => {
  return {
    type: PRODUCT_CREATE_RESET,
  }
}

export const createProduct = (): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(productCreateRequest())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post(`${apiURL}/api/v1/products/`, {}, config)

    dispatch(productCreateSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      // dispatch(userLogoutAction())
    }
    dispatch(productCreateFail(message))
  }
}
