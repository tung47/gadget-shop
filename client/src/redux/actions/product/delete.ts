import { Dispatch } from 'redux'
import axios from 'axios'

import {
  UserProps,
  AsyncAction,
  ProductDeleteActions,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from '../../../types'

// User Delete Actions
const ProductDeleteRequestAction = (): ProductDeleteActions => {
  return {
    type: PRODUCT_DELETE_REQUEST,
  }
}

const ProductDeleteSuccessAction = (): ProductDeleteActions => {
  return {
    type: PRODUCT_DELETE_SUCCESS,
  }
}

const ProductDeleteFailAction = (error: string): ProductDeleteActions => {
  return {
    type: PRODUCT_DELETE_FAIL,
    payload: {
      error: error,
    }
  }
}

export const deleteProduct = (id: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(ProductDeleteRequestAction())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    await axios.delete(`/api/v1/products/${id}`, config)

    dispatch(ProductDeleteSuccessAction())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      // dispatch(logout())
    }
    dispatch(ProductDeleteFailAction(message))
  }
}
