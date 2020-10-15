import {
  ProductsState,
  ProductActions,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../../types'

const initialState: ProductsState = {
  product: [],
  products: [],
  loading: true,
  error: null,
}

export function productListReducer(
  state: ProductsState = initialState,
  action: ProductActions
): ProductsState {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PRODUCT_LIST_SUCCESS:
      const { products } = action.payload
      return {
        ...state,
        loading: false,
        products: products,
      }
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}

// const initialProductState: ProductState = {
//   product: [],
//   loading: true,
//   error: null,
// }

export function productDetailsReducer(
  state: ProductsState = initialState,
  action: ProductActions
): ProductsState {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PRODUCT_DETAILS_SUCCESS:
      const { product } = action.payload
      return {
        ...state,
        loading: false,
        product,
        error: null,
      }
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}