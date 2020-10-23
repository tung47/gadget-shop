import axios from 'axios'
import { Dispatch } from 'redux'

import {
  AsyncAction,
  ProductsProps,
  ProductListActions,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../../types'

// Product List Actions
const productListRequest = (): ProductListActions => {
  return {
    type: PRODUCT_LIST_REQUEST,
  }
}

const productListSuccess = (products: ProductsProps): ProductListActions => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload: {
      products: products,
    },
  }
}

const productListFail = (error: string): ProductListActions => {
  return {
    type: PRODUCT_LIST_FAIL,
    error: error,
  }
}

export const listProducts = (): AsyncAction => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch(productListRequest())

    const { data } = await axios.get(`/api/v1/products`)

    dispatch(productListSuccess(data))
  } catch (error) {
    dispatch(
      productListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
