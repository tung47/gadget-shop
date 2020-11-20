// Product Actions Types
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'

export const PRODUCT_DELETE = 'PRODUCT_DELETE'
export const PRODUCT_CREATE = 'PRODUCT_CREATE'
export const PRODUCT_UPDATE = 'PRODUCT_UPDATE'

export type ReviewDocument = {
  name: string
  rating: number
  comment: string
}

export type ProductProps = {
  _id?: string
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
  uploading?: boolean
}

export type ProductsProps = ProductProps[]

export type ProductScreenProps = {
  match: any
  history: any
  product: ProductProps
}

export type RatingProps = {
  value: number
  text: string
  color: string
}

// Product Actions
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
  error: string | null
}

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
  error: string | null
}

export type ProductDeleteAction = {
  type: typeof PRODUCT_DELETE
}

export type ProductCreateAction = {
  type: typeof PRODUCT_CREATE
  payload: {
    product: ProductProps
  }
}

export type ProductUpdateAction = {
  type: typeof PRODUCT_UPDATE
  payload: {
    product: ProductProps
  }
}

export type ProductListActions =
  | ProductListRequestAction
  | ProductListSuccessAction
  | ProductListFailAction

export type ProductDetailsActions =
  | ProductDetailsRequestAction
  | ProductDetailsSuccessAction
  | ProductDetailsFailAction

export type ProductActions =
  | ProductListActions
  | ProductDetailsActions
  | ProductDeleteAction
  | ProductCreateAction
  | ProductUpdateAction

// Product State
export type ProductsState = {
  product: ProductProps[] | null
  loading: boolean
  error: string | null
  productList: ProductProps[]
}
