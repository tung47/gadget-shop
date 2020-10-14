import axios from 'axios'
import { Dispatch } from 'redux'

import {
  AsyncAction,
  ProductListRequestAction,
  ProductListSuccessAction,
  ProductListFailAction,
  ProductsProps,
} from '../../types'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../../constants/product'

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

export const listProducts = (): AsyncAction => async (dispatch: Dispatch) => {
  try {
    dispatch(producListRequest())

    const { data } = await axios.get('./api/v1/products')

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
