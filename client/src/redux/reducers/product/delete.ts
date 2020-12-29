import {
  ProductDeleteActions,
  ProductDeleteState,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from '../../../types'

const productDeleteInit: ProductDeleteState = {
  loading: false,
  error: null,
  success: false,
}

export function productDeleteReducer(
  state: ProductDeleteState = productDeleteInit,
  action: ProductDeleteActions
): ProductDeleteState {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case PRODUCT_DELETE_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      }
    }
    case PRODUCT_DELETE_FAIL: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error: error,
      }
    }
    default:
      return state
  }
}