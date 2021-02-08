// Product Actions Types
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'
export const PRODUCT_DETAILS_RESET = 'PRODUCT_DETAILS_RESET'

export const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST'
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS'
export const PRODUCT_DELETE_FAIL = 'PRODUCT_DELETE_FAIL'

export const PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST'
export const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS'
export const PRODUCT_CREATE_FAIL = 'PRODUCT_CREATE_FAIL'
export const PRODUCT_CREATE_RESET = 'PRODUCT_CREATE_RESET'

export const PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST'
export const PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS'
export const PRODUCT_UPDATE_FAIL = 'PRODUCT_UPDATE_FAIL'
export const PRODUCT_UPDATE_RESET = 'PRODUCT_UPDATE_RESET'

export const PRODUCT_REVIEW_REQUEST = 'PRODUCT_REVIEW_REQUEST'
export const PRODUCT_REVIEW_SUCCESS = 'PRODUCT_REVIEW_SUCCESS'
export const PRODUCT_REVIEW_FAIL = 'PRODUCT_REVIEW_FAIL'
export const PRODUCT_REVIEW_RESET = 'PRODUCT_REVIEW_RESET'

export const PRODUCT_TOP_REQUEST = 'PRODUCT_TOP_REQUEST'
export const PRODUCT_TOP_SUCCESS = 'PRODUCT_TOP_SUCCESS'
export const PRODUCT_TOP_FAIL = 'PRODUCT_TOP_FAIL'

export type ReviewProps = {
  _id: string
  name: string
  rating: number
  comment: string
  user: string
  createdAt: string
}

export type ProductProps = {
  _id: string
  name: string
  image: string
  brand: string
  category: string
  description: string
  reviews: ReviewProps[]
  rating: number
  numReviews: number
  price: number
  countInStock: number
  qty?: number
  uploading?: boolean
}

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

// Product List Actions
export type ProductListRequestAction = {
  type: typeof PRODUCT_LIST_REQUEST
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

// Product Details Actions
export type ProductDetailsRequestAction = {
  type: typeof PRODUCT_DETAILS_REQUEST
}
export type ProductDetailsSuccessAction = {
  type: typeof PRODUCT_DETAILS_SUCCESS
  payload: {
    product: ProductProps
  }
}
export type ProductDetailsFailAction = {
  type: typeof PRODUCT_DETAILS_FAIL
  error: string
}
export type ProductDetailsResetAction = {
  type: typeof PRODUCT_DETAILS_RESET
}

// Product Delete Actions
export type ProductDeleteRequestAction = {
  type: typeof PRODUCT_DELETE_REQUEST
}
export type ProductDeleteSuccessAction = {
  type: typeof PRODUCT_DELETE_SUCCESS
}
export type ProductDeleteFailAction = {
  type: typeof PRODUCT_DELETE_FAIL
  payload: {
    error: string
  }
}

// Product Create Actions
export type ProductCreateRequestAction = {
  type: typeof PRODUCT_CREATE_REQUEST
}
export type ProductCreateSuccessAction = {
  type: typeof PRODUCT_CREATE_SUCCESS
  payload: {
    product: ProductProps
  }
}
export type ProductCreateFailAction = {
  type: typeof PRODUCT_CREATE_FAIL
  error: string
}
export type ProductCreateResetAction = {
  type: typeof PRODUCT_CREATE_RESET
}

// Product Update Actions
export type ProductUpdateRequestAction = {
  type: typeof PRODUCT_UPDATE_REQUEST
}
export type ProductUpdateSuccessAction = {
  type: typeof PRODUCT_UPDATE_SUCCESS
  payload: {
    product: ProductProps
  }
}
export type ProductUpdateFailAction = {
  type: typeof PRODUCT_UPDATE_FAIL
  error: string
}
export type ProductUpdateResetAction = {
  type: typeof PRODUCT_UPDATE_RESET
}

// Product Review Actions
export type ProductReviewRequestAction = {
  type: typeof PRODUCT_REVIEW_REQUEST
}
export type ProductReviewSuccessAction = {
  type: typeof PRODUCT_REVIEW_SUCCESS
}
export type ProductReviewFailAction = {
  type: typeof PRODUCT_REVIEW_FAIL
  error: string
}
export type ProductReviewResetAction = {
  type: typeof PRODUCT_REVIEW_RESET
}

// Product Top Actions
export type ProductTopRequestAction = {
  type: typeof PRODUCT_TOP_REQUEST
}
export type ProductTopSuccessAction = {
  type: typeof PRODUCT_TOP_SUCCESS
  payload: {
    products: ProductProps[]
  }
}
export type ProductTopFailAction = {
  type: typeof PRODUCT_TOP_FAIL
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
  | ProductDetailsResetAction

export type ProductDeleteActions =
  | ProductDeleteRequestAction
  | ProductDeleteSuccessAction
  | ProductDeleteFailAction

export type ProductCreateActions =
  | ProductCreateRequestAction
  | ProductCreateSuccessAction
  | ProductCreateFailAction
  | ProductCreateResetAction

export type ProductUpdateActions =
  | ProductUpdateRequestAction
  | ProductUpdateSuccessAction
  | ProductUpdateFailAction
  | ProductUpdateResetAction

export type ProductReviewActions =
  | ProductReviewRequestAction
  | ProductReviewSuccessAction
  | ProductReviewFailAction
  | ProductReviewResetAction

export type ProductTopActions =
  | ProductTopRequestAction
  | ProductTopSuccessAction
  | ProductTopFailAction

export type ProductActions =
  | ProductListActions
  | ProductDetailsActions
  | ProductDeleteActions
  | ProductCreateActions
  | ProductUpdateActions
  | ProductReviewActions
  | ProductTopActions

// Product States
export type ProductListState = {
  loading: boolean
  error: null | string
  products: ProductProps[]
}

export type ProductDetailsState = {
  loading: boolean
  error: null | string
  product: ProductProps | null
}

export type ProductDeleteState = {
  loading: boolean
  error: null | string
  success: boolean
}

export type ProductCreateState = {
  loading: boolean
  error: null | string
  product: ProductProps | null
  success: boolean
}

export type ProductUpdateState = {
  loading: boolean
  error: null | string
  product: ProductProps | null
  success: boolean
}

export type ProductReviewState = {
  loading: boolean
  error: null | string
  success: boolean
}

export type ProductTopState = {
  loading: boolean
  error: null | string
  products: ProductProps[]
}

export type ProductState = {
  productList: ProductListState
  productDetails: ProductDetailsState
  productDelete: ProductDeleteState
  productCreate: ProductCreateState
  productUpdate: ProductUpdateState
  productReview: ProductReviewState
  productTop: ProductTopState
}
