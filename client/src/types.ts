import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

export type ReviewDocument = {
  name: string
  rating: number
  comment: string
}

export type ProductProps = {
  user: any[]
  _id: string
  name: string
  image: string
  brand: string
  category: string
  description: string
  reviews: ReviewDocument[]
  rating: number
  numReviews: number
  price: number
  countInStock: number
}

export type ProductsProps = ProductProps[]

export type ProductScreenProps = {
  match: any
  product: ProductProps
}

export type RatingProps = {
  value: number
  text: string
  color: string
}

export type MessageProps = {
  variant: string
  children: string
}

// Product Actions Types
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

export type ProductListRequestAction = {
  type: typeof PRODUCT_LIST_REQUEST
}

export type ProductListSuccessAction = {
  type: typeof PRODUCT_LIST_SUCCESS
  payload: {
    products: ProductsProps
  }
}
      
export type ProductListFailAction = {
  type: typeof PRODUCT_LIST_FAIL
  error: string
}

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'

export type ProductDetailsRequestAction = {
  type: typeof PRODUCT_DETAILS_REQUEST
}

export type ProductDetailsSuccessAction = {
  type: typeof PRODUCT_DETAILS_SUCCESS
  payload: {
    productDetails: ProductsProps
  }
}

export type ProductDetailsFailAction = {
  type: typeof PRODUCT_DETAILS_FAIL
  error: string
}

export type ProductListActions =
  | ProductListRequestAction
  | ProductListSuccessAction
  | ProductListFailAction

export type ProductDetailsActions =
  | ProductDetailsRequestAction
  | ProductDetailsSuccessAction
  | ProductDetailsFailAction

export type ProductActions = ProductListActions | ProductDetailsActions

export type AsyncAction<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

// STATE TYPES
export type ProductsState = {
  loading: boolean
  error: string | null
  productList: ProductProps[]
  productDetails: ProductProps[]
}

export type AppState = {
  products: ProductsState
}
