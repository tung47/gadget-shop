import {
  ProductActions,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  ProductTopState,
} from '../../../types'

const productTopInit: ProductTopState = {
  loading: false,
  error: null,
  products: [],
}

export function productTopReducer(
  state: ProductTopState = productTopInit,
  action: ProductActions
): ProductTopState {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        products: [],
      }
    }
    case PRODUCT_TOP_SUCCESS: {
      const { products } = action.payload
      return {
        ...state,
        loading: false,
        error: null,
        products: products,
      }
    }
    case PRODUCT_TOP_FAIL: {
      const { error } = action
      return {
        ...state,
        loading: false,
        error,
      }
    }
    default:
      return state
  }
}
