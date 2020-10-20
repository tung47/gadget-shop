import axios from 'axios'
import { Dispatch } from 'redux'

import {
  AsyncAction,
  ProductProps,
  ProductsProps,
  ProductListActions,
  ProductDetailsActions,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  AppState,
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

export const listProducts = (): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
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

// Product Details Actions
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
      productDetails: products,
    },
  }
}

const productDetailsFail = (error: string): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_FAIL,
    error: error,
  }
}

export const listProductDetails = (id: string): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  // try {
  //   dispatch(productDetailsRequest())

  //   const { data } = await axios.get(`/api/products/${id}`)

  //   dispatch({
  //     type: PRODUCT_DETAILS_SUCCESS,
  //     payload: data,
  //   })
  // } catch (error) {
  //   dispatch(productDetailsFail(error))
  // }

  dispatch(productDetailsRequest())
  const { products } = getState()

  const productList: ProductsProps = products.productList

  const productDetails: ProductProps | undefined = productList.find(
    (p) => p._id === id
  )

  if (productDetails && Object.keys(productDetails).length > 0) {
    return dispatch(productDetailsSuccess([productDetails]))
  }

  const response: any = await axios.get(`/api/v1/product/${id}`)
  let productsData: ProductsProps = []

  if (response.status === 200) {
    productsData = await response.json()
    return dispatch(productDetailsSuccess(productsData))
  } else {
    dispatch(productDetailsFail(`${response.status}: Product not found`))
  }

}
