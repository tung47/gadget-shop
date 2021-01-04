import {
  ProductReviewActions,
  ProductReviewState,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
} from '../../../types'

const productReviewInit: ProductReviewState = {
  loading: false,
  error: null,
  success: false,
}

export function productReviewReducer(
  state: ProductReviewState = productReviewInit,
  action: ProductReviewActions
): ProductReviewState {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case PRODUCT_REVIEW_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      }
    }
    case PRODUCT_REVIEW_FAIL: {
      const { error } = action
      return {
        ...state,
        loading: false,
        error: error,
      }
    }
    case PRODUCT_REVIEW_RESET: {
      return {
        ...state,
        loading: false,
        error: null,
      }
    }
    default:
      return state
  }
}