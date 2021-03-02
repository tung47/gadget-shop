import axios from 'axios'
import { Dispatch } from 'redux'

import { apiURL } from '../../../api'
import {
  AsyncAction,
  ProductProps,
  ProductTopActions,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../../../types'

// Product List Actions
const productTopRequest = (): ProductTopActions => {
  return {
    type: PRODUCT_TOP_REQUEST,
  }
}

const productTopSuccess = (products: ProductProps[]): ProductTopActions => {
  return {
    type: PRODUCT_TOP_SUCCESS,
    payload: {
      products: products,
    },
  }
}

const productTopFail = (error: string): ProductTopActions => {
  return {
    type: PRODUCT_TOP_FAIL,
    error: error,
  }
}

export const listTopProducts = (): AsyncAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(productTopRequest())

    const { data } = await axios.get(`${apiURL}/api/v1/products/top`)
    console.log('API DATA', data)

    dispatch(productTopSuccess(data))
  } catch (error) {
    dispatch(
      productTopFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
