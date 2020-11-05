import axios from 'axios'
import { Dispatch } from 'redux'
import Product from '../../components/Product'

import {
  AsyncAction,
  ProductsProps,
  ProductListActions,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  ProductProps,
  ErrorAction,
  ACTION_FAIL,
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

// const adminCreateProduct = (product: ProductProps): AdminActions => {
//   return {
//     type: ADMIN_CREATE_PRODUCT,
//     payload: {
//       product: product,
//     },
//   }
// }

// const adminUpdateProduct = (product: ProductProps): AdminActions => {
//   return {
//     type: ADMIN_UPDATE_PRODUCT,
//     payload: {
//       product: product,
//     },
//   }
// }

// const adminDeleteProduct = (): AdminActions => {
//   return {
//     type: ADMIN_DELETE_PRODUCT,
//   }
// }

const actionFail = (error: string): ErrorAction => {
  return {
    type: ACTION_FAIL,
    error: error,
  }
}

export const listProducts = (): AsyncAction => async (dispatch: Dispatch) => {
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

// export const createProduct = (product: ProductProps): AsyncAction => async (
//   dispatch: Dispatch
// ) => {
//   try {
//     const token = localStorage.getItem('token')
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     }
//     const { data } = await axios.post(`/api/v1/products`, product, config)
//     dispatch(adminCreateProduct(data))
//   } catch (error) {
//     return dispatch(
//       actionFail(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       )
//     )
//   }
// }

// export const updateProduct = (product: ProductProps): AsyncAction => async (
//   dispatch: Dispatch
// ) => {
//   try {
//     const id = product._id
//     const token = localStorage.getItem('token')
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     }
//     const { data } = await axios.patch(
//       `/api/v1/products/${id}`,
//       product,
//       config
//     )
//     dispatch(adminUpdateProduct(data))
//   } catch (error) {
//     return dispatch(actionFail(error.response && error.response.data.message
//       ? error.response.data.message
//       : error.message))
//   }
// }

// export const deleteProductByAdmin = (id: string): AsyncAction => async (dispatch: Dispatch) => {
//     try {
//       const token = localStorage.getItem('token')
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       }
//       await axios.delete(`/api/v1/products/${id}`, config)
//       dispatch(adminDeleteProduct())
//     } catch (error) {
//       dispatch(actionFail(error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message))
//     }
//   }

