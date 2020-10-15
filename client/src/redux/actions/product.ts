import axios from 'axios'
import { Dispatch } from 'redux'

import {
  AsyncAction,
  ProductsProps,
  ProductListActions,
  ProductDetailsActions,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../../types'

const producListRequest = (): ProductListActions => {
  return {
    type: PRODUCT_LIST_REQUEST,
  }
}

const productListSuccess = (
  products: ProductsProps
): ProductListActions => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload: {
      products,
    },
  }
}

const productListFail = (error: string): ProductListActions => {
  return {
    type: PRODUCT_LIST_FAIL,
    error: error,
  }
}

const productDetailsRequest = (): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_REQUEST,
  }
}

const productDetailsSuccess = (
  products: ProductsProps
): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_SUCCESS,
    payload: {
      product: products,
    },
  }
}

const productDetailsFail = (error: string): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_FAIL,
    error: error,
  }
}

export const listProducts = (): AsyncAction => async (dispatch: Dispatch) => {
  try {
    dispatch(producListRequest())

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

export const listProductDetails = (id: string): AsyncAction => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch(productDetailsRequest())

    const { data } = await axios.get(`/api/v1/products/${id}`)

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
