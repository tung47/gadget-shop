import { ProductsState , ProductActions } from '../../types'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../../constants/product'

const initialState: ProductsState = {
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
        products: [],
      }
    case PRODUCT_LIST_SUCCESS:
      const { products} = action.payload
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
