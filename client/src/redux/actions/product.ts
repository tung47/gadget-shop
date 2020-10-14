import axios from 'axios'
import { Dispatch } from 'redux'

import {
  AppState,
  AsyncAction,
  ProductsProps,
  ProductListRequestAction,
  ProductListSuccessAction,
  ProductListFailAction,
  ProductDetailsRequestAction,
  ProductDetailsSuccessAction,
  ProductDetailsFailAction,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../../types'

const producListRequest = (): ProductListRequestAction => {
  return {
    type: PRODUCT_LIST_REQUEST,
  }
}

const productListSuccess = (
  products: ProductsProps
): ProductListSuccessAction => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload: {
      products,
    },
  }
}

const productListFail = (error: string): ProductListFailAction => {
  return {
    type: PRODUCT_LIST_FAIL,
    error: error,
  }
}

const producDetailsRequest = (): ProductDetailsRequestAction => {
  return {
    type: PRODUCT_DETAILS_REQUEST,
  }
}

const productDetailsSuccess = (
  product: ProductsProps
): ProductDetailsSuccessAction => {
  return {
    type: PRODUCT_DETAILS_SUCCESS,
    payload: {
      product,
    },
  }
}

const productDetailsFail = (error: string): ProductDetailsFailAction => {
  return {
    type: PRODUCT_DETAILS_FAIL,
    error: error,
  }
}

export const listProducts = (): AsyncAction => async (dispatch: Dispatch) => {
  try {
    dispatch(producListRequest())

    const { data } = await axios.get(`./api/v1/products`)

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

export const listProductDetails = (id: any): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch(producDetailsRequest())

    const { data } = await axios.get(`./api/v1/products/${id}`)

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
