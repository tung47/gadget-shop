import {
  ProductsState,
  ProductActions,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
} from '../../../types'

const initialState: ProductsState = {
  product: [],
  loading: true,
  error: null,
  productList: [],
}

export default function products(
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
    case PRODUCT_CREATE: {
      const { product } = action.payload
      return { ...state, productList: state.productList.concat(product) }
    }
    case PRODUCT_UPDATE: {
      const { product } = action.payload
      //return { ...state, product: product }
    }
    case PRODUCT_DELETE: {
      return { ...state }
    }

    default:
      return state
  }
}
