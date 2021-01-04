import {
  ProductActions,
  ProductUpdateState,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from '../../../types'

// User Update Profile Reducers
const productUpdateInit = {
  loading: false,
  error: null,
  success: false,
  product: null,
}

export function productUpdateReducer(
  state: ProductUpdateState = productUpdateInit,
  action: ProductActions
): ProductUpdateState {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
        product: null,
      }
    case PRODUCT_UPDATE_SUCCESS:
      const { product } = action.payload
      return { ...state, loading: false, success: true, product }
    case PRODUCT_UPDATE_FAIL:
      const { error } = action
      return { ...state, loading: false, error, success: false, product: null }
    case PRODUCT_UPDATE_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        product: null,
      }
    default:
      return state
  }
}
