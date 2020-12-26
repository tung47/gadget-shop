import {
  ProductActions,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  ProductListState,
} from '../../../types'

const productListInit: ProductListState = {
  loading: false,
  error: null,
  products: [],
}

export function productListReducer(
  state: ProductListState = productListInit,
  action: ProductActions
): ProductListState {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case PRODUCT_LIST_SUCCESS: {
      const { products } = action.payload
      return {
        ...state,
        loading: false,
        error: null,
        products: products,
      }
    }
    case PRODUCT_LIST_FAIL: {
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
