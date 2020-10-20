import {
  ProductsState,
  ProductActions,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../../types'

const initialState: ProductsState = {
  loading: true,
  error: null,
  productList: [],
}

export default function productsReducer(
  state: ProductsState = initialState,
  action: ProductActions
): ProductsState {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case PRODUCT_LIST_SUCCESS: {
      const { products } = action.payload
      return {
        ...state,
        loading: false,
        error: null,
        productList: products,
      }
    }
    case PRODUCT_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    default:
      return state
  }
}
