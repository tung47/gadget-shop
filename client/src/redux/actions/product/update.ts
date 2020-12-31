import { Dispatch } from 'redux'
import axios from 'axios'

import {
  ProductProps,
  UserProps,
  AsyncAction,
  ProductUpdateActions,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  AppState,
} from '../../../types'
import { userLogoutAction } from '../user'

// User Update Profile Actions
const ProductUpdateRequestAction = (): ProductUpdateActions => {
  return {
    type: PRODUCT_UPDATE_REQUEST,
  }
}

const ProductUpdateSuccessAction = (
  product: ProductProps
): ProductUpdateActions => {
  return {
    type: PRODUCT_UPDATE_SUCCESS,
    payload: {
      product: product,
    },
  }
}

const ProductUpdateFailAction = (error: string): ProductUpdateActions => {
  return {
    type: PRODUCT_UPDATE_FAIL,
    error,
  }
}

export const ProductUpdateResetAction = (): ProductUpdateActions => {
  return {
    type: PRODUCT_UPDATE_RESET,
  }
}

export const updateProduct = (product: ProductProps): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(ProductUpdateRequestAction())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.put(
      `/api/v1/products/${product._id}`,
      product,
      config
    )

    dispatch(ProductUpdateSuccessAction(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(userLogoutAction())
    }
    dispatch(ProductUpdateFailAction(message))
  }
}
