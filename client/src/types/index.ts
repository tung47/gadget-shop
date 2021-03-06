import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

import {
  ProductListState,
  ProductDetailsState,
  ProductDeleteState,
  ProductCreateState,
  ProductUpdateState,
  ProductReviewState,
  ProductTopState,
} from './product'
import {
  UserLoginState,
  UserRegisterState,
  UserDetailsState,
  UserUpdateState,
  UserListState,
  UserDeleteState,
  UserEditState,
} from './user'
import { CartState } from './cart'
import {
  OrderCreateState,
  OrderDetailsState,
  OrderPayState,
  OrderDeliverState,
  OrderListMyState,
  OrderListState,
} from './order'

export * from './user'
export * from './product'
export * from './cart'
export * from './order'

// Fail Actions Types
export const ACTION_FAIL = 'ACTION_FAIL'

export type RouteParam = {
  id: string
}

export type MessageProps = {
  variant?: string
  children?: any
}

export type ParamsType = {
  id: string
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

// App State
export type AppState = {
  productList: ProductListState
  productDetails: ProductDetailsState
  productDelete: ProductDeleteState
  productCreate: ProductCreateState
  productUpdate: ProductUpdateState
  productReview: ProductReviewState
  productTop: ProductTopState
  cart: CartState
  userLogin: UserLoginState
  userRegister: UserRegisterState
  userDetails: UserDetailsState
  userUpdate: UserUpdateState
  userList: UserListState
  userDelete: UserDeleteState
  userEdit: UserEditState
  orderCreate: OrderCreateState
  orderDetails: OrderDetailsState
  orderPay: OrderPayState
  orderDeliver: OrderDeliverState
  orderListMy: OrderListMyState
  orderList: OrderListState
}
