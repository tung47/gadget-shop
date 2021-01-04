import { Dispatch } from 'redux'
import axios from 'axios'

import {
  UserProps,
  AsyncAction,
  ProductReviewActions,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
  ReviewProps,
} from '../../../types'
import { userLogoutAction } from '../user'

// User Delete Actions
const ProductReviewRequestAction = (): ProductReviewActions => {
  return {
    type: PRODUCT_REVIEW_REQUEST,
  }
}

const ProductReviewSuccessAction = (): ProductReviewActions => {
  return {
    type: PRODUCT_REVIEW_SUCCESS,
  }
}

const ProductReviewFailAction = (error: string): ProductReviewActions => {
  return {
    type: PRODUCT_REVIEW_FAIL,
    error: error,
  }
}

export const ProductReviewResetAction = (): ProductReviewActions => {
  return {
    type: PRODUCT_REVIEW_RESET,
  }
}

export const reviewProduct = (
  productId: string,
  review: ReviewProps
): AsyncAction => async (dispatch: Dispatch, getState) => {
  try {
    dispatch(ProductReviewRequestAction())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    await axios.post(`/api/v1/products/${productId}/reviews`, review, config)
    
    dispatch(ProductReviewSuccessAction())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(userLogoutAction())
    }
    dispatch(ProductReviewFailAction(message))
  }
}
