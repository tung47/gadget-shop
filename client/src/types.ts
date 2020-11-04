import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

// Actions Types
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'

export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const CART_FAIL_ITEM = 'CART_FAIL_ITEM'

export const USER_REGISTER = 'USER_REGISTER'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_ADD_TO_CART = 'USER_ADD_TO_CART'
export const USER_REMOVE_FROM_CART = 'USER_REMOVE_FROM_CART'
export const USER_DETAILS_REQUEST = 'USER_LIST_REQUEST'
export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'

export const ADMIN_CREATE_PRODUCT = 'ADMIN_CREATE_PRODUCT'
export const ADMIN_UPDATE_PRODUCT = 'ADMIN_UPDATE_PRODUCT'
export const ADMIN_DELETE_PRODUCT = 'ADMIN_DELETE_PRODUCT'

export const ADMIN_GET_USER = 'ADMIN_GET_USER'
export const ADMIN_UPDATE_USER = 'ADMIN_UPDATE_USER'
export const ADMIN_DELETE_USER = 'ADMIN_DELETE_USER'

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
  name: string
  email: string
  password: string
  isAdmin: boolean
  products: ProductProps[]
}

export type AsyncAction<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

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
    user: UserProps[]
  }
}

export type UserLoginAction = {
  type: typeof USER_LOGIN
  payload: {
    user: UserProps[]
  }
}

export type UserLogoutAction = {
  type: typeof USER_LOGOUT
  payload: {
    user: UserProps[]
  }
}

export type UserAddToCartAction = {
  type: typeof USER_ADD_TO_CART
  payload: {
    product: ProductProps
  }
}

export type UserRemoveFromCartAction = {
  type: typeof USER_REMOVE_FROM_CART
  payload: {
    product: ProductProps
  }
}

export type UserDetailsRequestAction = {
  type: typeof USER_DETAILS_REQUEST
  payload: {
    user: UserProps[]
  }
}

export type UserUpdateRequestAction = {
  type: typeof USER_UPDATE_REQUEST
  payload: {
    user: UserProps[]
  }
}

export type UserActions =
  | UserRegisterAction
  | UserLoginAction
  | UserLogoutAction
  | UserAddToCartAction
  | UserRemoveFromCartAction
  | UserDetailsRequestAction
  | UserUpdateRequestAction

// Admin-Product Actions
export type AdminCreateProductAction = {
  type: typeof ADMIN_CREATE_PRODUCT
  payload: {
    product: ProductProps
  }
}

export type AdminUpdateProductAction = {
  type: typeof ADMIN_UPDATE_PRODUCT
  payload: {
    product: ProductProps
  }
}

export type AdminDeleteProductAction = {
  type: typeof ADMIN_DELETE_PRODUCT
}

export type AdminProductActions =
  | AdminCreateProductAction
  | AdminUpdateProductAction
  | AdminDeleteProductAction

// Admin-User Actions
export type AdminGetUserAction = {
  type: typeof ADMIN_GET_USER
  payload: {
    userList: UserProps[]
  }
}

export type AdminUpdateUserAction = {
  type: typeof ADMIN_UPDATE_USER
  payload: {
    user: UserProps[]
  }
}

export type AdminDeleteUserAction = {
  type: typeof ADMIN_DELETE_USER
}

export type AdminUserActions =
  | AdminGetUserAction
  | AdminUpdateUserAction
  | AdminDeleteUserAction

export type AdminActions = AdminProductActions | AdminUserActions

// Error Actions
export type ErrorAction = {
  type: typeof ACTION_FAIL
  error: string | null
}

// STATE TYPES
export type ProductsState = {
  product: ProductProps[]
  loading: boolean
  error: string | null
  productList: ProductProps[]
}

export type CartState = {
  cartItems: ProductProps[]
}

export type UserState = {
  user: UserProps[]
  isLoggedIn: boolean
  userList: UserProps[]
}

export type AppState = {
  products: ProductsState
  cart: CartState
  user: UserState
}
