import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

import { ProductsState } from './product'
import {
  UserLoginState,
  UserRegisterState,
  UserDetailsState,
  UserUpdateState,
  UserListState,
  UserDeleteState,
  UserBanUnbanState,
} from './user'
import { CartState } from './cart'

export * from './user'
export * from './product'
export * from './cart'

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
  products: ProductsState
  cart: CartState
  userLogin: UserLoginState
  userRegister: UserRegisterState
  userDetails: UserDetailsState
  userUpdate: UserUpdateState
  userList: UserListState
  userDelete: UserDeleteState
  userBanUnban: UserBanUnbanState
}
