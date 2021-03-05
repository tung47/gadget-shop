import axios from 'axios'
import { Dispatch } from 'redux'

import { apiURL } from '../../../api'
import {
  AsyncAction,
  ProductDetailsActions,
  ProductProps,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCCESS,
} from '../../../types'

const productDetailsRequest = (): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_REQUEST,
  }
}

const productDetailsSuccess = (
  product: ProductProps
): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_SUCCESS,
    payload: {
      product,
    },
  }
}

const productDetailsFail = (error: string): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_FAIL,
    error: error,
  }
}

export const productDetailsReset = (): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_RESET,
  }
}

export const listProductDetails = (id: string): AsyncAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(productDetailsRequest())

    const { data } = await axios.get(`${apiURL}/api/v1/products/${id}`)
    
    dispatch(productDetailsSuccess(data))
  } catch (error) {
    dispatch(
      productDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
