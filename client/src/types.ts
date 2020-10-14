// Action types
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

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

export type ProductScreenProps = {
  match: any
  product: ProductProps
}

export type RatingProps = {
  value: number
  text: string
  color: string
}

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