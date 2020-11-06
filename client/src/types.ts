import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

// Product Actions Types
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'

// Cart Actions Types
export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const CART_FAIL_ITEM = 'CART_FAIL_ITEM'

// User Actions Types
export const USER_REGISTER = 'USER_REGISTER'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

export const USER_DETAILS = 'USER_DETAILS'
export const USER_DETAILS_RESET = 'USER_DETAILS_RESET'

export const USER_UPDATE_PROFILE = 'USER_UPDATE_PROFILE'
export const USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET'

export const USER_LIST = 'USER_LIST'
export const USER_LIST_RESET = 'USER_LIST_RESET'

export const USER_DELETE = 'USER_DELETE'
export const USER_UPDATE = 'USER_UPDATE'

// Fail Actions Types
export const ACTION_FAIL = 'ACTION_FAIL'

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
}

export type ProductsProps = ProductProps[]

export type RouteParam = {
  id: string
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

export type MessageProps = {
  variant?: string
  children?: any
}

export type UserProps = {
  _id?: string
  name?: string
  email: string
  password?: string
  isAdmin?: boolean
  products?: ProductProps[]
  token?: string
}

export type UserParams = {
  userId: string
}

export type AsyncAction<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

// Error Actions
export type ErrorAction = {
  type: typeof ACTION_FAIL
  error: string | null
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

export type ProductListActions =
  | ProductListRequestAction
  | ProductListSuccessAction
  | ProductListFailAction

export type ProductDetailsActions =
  | ProductDetailsRequestAction
  | ProductDetailsSuccessAction
  | ProductDetailsFailAction

export type ProductActions = ProductListActions | ProductDetailsActions

// Cart Actions
export type CartAddItemAction = {
  type: typeof CART_ADD_ITEM
  payload: {
    product: ProductProps
  }
}

export type CartRemoveItemAction = {
  type: typeof CART_REMOVE_ITEM
  payload: {
    product: ProductProps
  }
}

export type CartFailItemAction = {
  type: typeof CART_FAIL_ITEM
  error: string | null
}

export type CartActions =
  | CartAddItemAction
  | CartRemoveItemAction
  | CartFailItemAction

// User Actions
export type UserRegisterAction = {
  type: typeof USER_REGISTER
  payload: {
    userInfo: UserProps
  }
}

export type UserLoginAction = {
  type: typeof USER_LOGIN
  payload: {
    userInfo: UserProps
  }
}

export type UserLogoutAction = {
  type: typeof USER_LOGOUT
}

export type UserDetailsAction = {
  type: typeof USER_DETAILS
  payload: {
    user: UserProps
  }
}

export type UserDetailsResetAction = {
  type: typeof USER_DETAILS_RESET
}

export type UserUpdateProfileAction = {
  type: typeof USER_UPDATE_PROFILE
  payload: {
    userInfo: UserProps
  }
}

export type UserUpdateProfileResetAction = {
  type: typeof USER_UPDATE_PROFILE_RESET
}

export type UserActions =
  | ErrorAction
  | UserRegisterAction
  | UserLoginAction
  | UserLogoutAction
  | UserDetailsAction
  | UserUpdateProfileAction
  | UserUpdateProfileResetAction

// Product State
export type ProductsState = {
  product: ProductProps[]
  loading: boolean
  error: string | null
  productList: ProductProps[]
}

// Cart State
export type CartState = {
  cartItems: ProductProps[]
}

// User State
export type UserLoginState = {
  userInfo: UserProps | null
  error: string | null
}

export type UserRegisterState = {
  userInfo: UserProps | null
  error: string | null
}

export type UserDetailsState = {
  user: UserProps | null
  error: string | null
}

export type UserUpdateProfileState = {
  userInfo: UserProps | null
  error: string | null
  success: boolean
}

// App State
export type AppState = {
  products: ProductsState
  cart: CartState
  userLogin: UserLoginState
  userRegister: UserRegisterState
  userDetails: UserDetailsState
  userUpdateProfile: UserUpdateProfileState
}
