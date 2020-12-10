import { ProductProps, ErrorAction } from './index'

// User Actions Types
export const USER_REGISTER = 'USER_REGISTER'
export const USER_REGISTER_RESET = 'USER_REGISTER_RESET'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_RESET = 'USER_LOGIN_RESET'

export const USER_LOGOUT = 'USER_LOGOUT'

export const USER_DETAILS = 'USER_DETAILS'
export const USER_DETAILS_RESET = 'USER_DETAILS_RESET'

export const USER_UPDATE_PROFILE = 'USER_UPDATE_PROFILE'
export const USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET'

export const USER_LIST = 'USER_LIST'
export const USER_LIST_RESET = 'USER_LIST_RESET'

export const USER_DELETE = 'USER_DELETE'

export const USER_UPDATE = 'USER_UPDATE'
export const USER_UPDATE_RESET = 'USER_UPDATE_RESET'

export const USER_ADD_PRODUCT = 'USER_ADD_PRODUCT'
export const USER_REMOVE_PRODUCT = 'USER_REMOVE_PRODUCT'

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

// User Actions
export type UserRegisterAction = {
  type: typeof USER_REGISTER
  payload: {
    userInfo: UserProps
  }
}
export type UserRegisterResetAction = {
  type: typeof USER_REGISTER_RESET
}

export type UserLoginAction = {
  type: typeof USER_LOGIN
  payload: {
    userInfo: UserProps
  }
}
export type UserLoginResetAction = {
  type: typeof USER_LOGIN_RESET
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

export type UserListAction = {
  type: typeof USER_LIST
  payload: {
    users: UserProps[]
  }
}
export type UserListResetAction = {
  type: typeof USER_LIST_RESET
}

export type UserAddProductAction = {
  type: typeof USER_ADD_PRODUCT
  payload: {
    product: ProductProps
  }
}

export type UserRemoveProductAction = {
  type: typeof USER_REMOVE_PRODUCT
  payload: {
    product: ProductProps
  }
}

export type UserActions =
  | ErrorAction
  | UserRegisterAction
  | UserRegisterResetAction
  | UserLoginAction
  | UserLoginResetAction
  | UserLogoutAction
  | UserDetailsAction
  | UserDetailsResetAction
  | UserUpdateProfileAction
  | UserUpdateProfileResetAction
  | UserListAction
  | UserListResetAction
  | UserAddProductAction
  | UserRemoveProductAction

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

export type UserListState = {
  users: UserProps[] | null
  error: string | null
}
