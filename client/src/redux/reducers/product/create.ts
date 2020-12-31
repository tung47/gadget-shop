import {
  ProductCreateActions,
  ProductCreateState,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
} from '../../../types'

const productCreateInit: ProductCreateState = {
  loading: false,
  error: null,
  success: false,
  product: null,
}

export function productCreateReducer(
  state: ProductCreateState = productCreateInit,
  action: ProductCreateActions
): ProductCreateState {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case PRODUCT_CREATE_SUCCESS: {
      const { product } = action.payload
      return {
        ...state,
        loading: false,
        product: product,
      }
    }
    case PRODUCT_CREATE_FAIL: {
      const { error } = action
      return {
        ...state,
        loading: false,
        error,
      }
    }
    case PRODUCT_CREATE_RESET: {
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