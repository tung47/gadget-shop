import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from './constants/product'

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

export type ProductScreenProps = {
  match: any
  product: ProductProps
}

export type RatingProps = {
  value: number
  text: string
  color: string
}

// Product List Types
export type ProductListRequestAction = {
  type: typeof PRODUCT_LIST_REQUEST
  payload: {
    products: ProductProps[]
  }
}

export type ProductListSuccessAction = {
  type: typeof PRODUCT_LIST_SUCCESS
  payload: {
    products: ProductProps[]
  }
}

export type ProductListFailAction = {
  type: typeof PRODUCT_LIST_FAIL
  error: string
}

export type ProductActions =
  | ProductListRequestAction
  | ProductListSuccessAction
  | ProductListFailAction

export type AsyncAction<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

// STATE TYPES
export type ProductState = {
  products: ProductProps[]
  loading: boolean
  error: string | null
}

export type CartState = {
  inCart: ProductProps
}

export type AppState = {
  products: ProductProps
  cart: CartState
}
