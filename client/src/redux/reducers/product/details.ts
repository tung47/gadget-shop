import {
  ProductDetailsActions,
  ProductDetailsState,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCCESS,
} from '../../../types'

const productDetailsInit: ProductDetailsState = {
  product: null,
  loading: false,
  error: null,
}

export function productDetailsReducer(
  state: ProductDetailsState = productDetailsInit,
  action: ProductDetailsActions
): ProductDetailsState {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case PRODUCT_DETAILS_SUCCESS: {
      const { product } = action.payload
      return {
        ...state,
        loading: false,
        product: product,
      }
    }
    case PRODUCT_DETAILS_FAIL: {
      const { error } = action
      return {
        ...state,
        error,
        loading: false,
      }
    }
    case PRODUCT_DETAILS_RESET: {
      return {
        ...state,
        loading: false,
        error: null,
        product: null,
      }
    }
    default:
      return state
  }
}