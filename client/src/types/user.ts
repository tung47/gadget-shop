// User Actions Types
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
export const USER_LOGOUT = 'USER_LOGOUT'

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'
export const USER_REGISTER_RESET = 'USER_REGISTER_RESET'

export const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST'
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS'
export const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL'
export const USER_DETAILS_RESET = 'USER_DETAILS_RESET'

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL'
export const USER_UPDATE_RESET = 'USER_UPDATE_RESET'

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST'
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const USER_LIST_FAIL = 'USER_LIST_FAIL'
export const USER_LIST_RESET = 'USER_LIST_RESET'

export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST'
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'
export const USER_DELETE_FAIL = 'USER_DELETE_FAIL'

export const USER_EDIT_REQUEST = 'USER_EDIT_REQUEST'
export const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS'
export const USER_EDIT_FAIL = 'USER_EDIT_FAIL'
export const USER_EDIT_RESET = 'USER_EDIT_RESET'

export type UserProps = {
  _id: string
  name?: string
  email: string
  password?: string
  isAdmin: boolean
  isBanned: boolean
  token?: string
}

export type UserParams = {
  userId: string
}

// User Login Logout Actions Types
export type LoginInfo = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  message?: string
}

export type UserLoginRequestAction = {
  type: typeof USER_LOGIN_REQUEST
}
export type UserLoginSuccessAction = {
  type: typeof USER_LOGIN_SUCCESS
  payload: {
    userInfo: UserProps
  }
}
export type UserLoginFailAction = {
  type: typeof USER_LOGIN_FAIL
  error: string
}
export type UserLogoutAction = {
  type: typeof USER_LOGOUT
}

// User Register Actions Types
export type UserRegisterRequestAction = {
  type: typeof USER_REGISTER_REQUEST
}
export type UserRegisterSuccessAction = {
  type: typeof USER_REGISTER_SUCCESS
  payload: {
    userInfo: UserProps
  }
}
export type UserRegisterFailureAction = {
  type: typeof USER_REGISTER_FAIL
  error: string
}
export type UserRegisterResetAction = {
  type: typeof USER_REGISTER_RESET
}

// User Details Actions Types
export type UserDetailsRequestAction = {
  type: typeof USER_DETAILS_REQUEST
}
export type UserDetailsSuccessAction = {
  type: typeof USER_DETAILS_SUCCESS
  payload: {
    user: UserProps
  }
}
export type UserDetailsFailureAction = {
  type: typeof USER_DETAILS_FAIL
  error: string
}
export type UserDetailsResetAction = {
  type: typeof USER_DETAILS_RESET
}

// User Update Profile Actions Types
export type UserUpdateRequestAction = {
  type: typeof USER_UPDATE_REQUEST
}
export type UserUpdateSuccessAction = {
  type: typeof USER_UPDATE_SUCCESS
  payload: {
    userInfo: UserProps
  }
}
export type UserUpdateFailAction = {
  type: typeof USER_UPDATE_FAIL
  error: string
}
export type UserUpdateResetAction = {
  type: typeof USER_UPDATE_RESET
}

// User List Actions Types
export type UserListRequestAction = {
  type: typeof USER_LIST_REQUEST
}
export type UserListSuccessAction = {
  type: typeof USER_LIST_SUCCESS
  payload: {
    users: UserProps[]
  }
}
export type UserListFailAction = {
  type: typeof USER_LIST_FAIL
  error: string
}
export type UserListResetAction = {
  type: typeof USER_LIST_RESET
}

// User Delete Actions Types
export type UserDeleteRequestAction = {
  type: typeof USER_DELETE_REQUEST
}
export type UserDeleteSuccessAction = {
  type: typeof USER_DELETE_SUCCESS
}
export type UserDeleteFailAction = {
  type: typeof USER_DELETE_FAIL
  error: string
}

// User Update Profile Actions Types
export type UserEditRequestAction = {
  type: typeof USER_EDIT_REQUEST
}
export type UserEditSuccessAction = {
  type: typeof USER_EDIT_SUCCESS
  payload: {
    user: UserProps[]
  }
}
export type UserEditFailAction = {
  type: typeof USER_EDIT_FAIL
  error: string
}
export type UserEditResetAction = {
  type: typeof USER_EDIT_RESET
}

export type UserLoginLogoutActions =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailAction
  | UserLogoutAction

export type UserRegisterActions =
  | UserRegisterRequestAction
  | UserRegisterSuccessAction
  | UserRegisterFailureAction
  | UserRegisterResetAction

export type UserDetailsActions =
  | UserDetailsRequestAction
  | UserDetailsSuccessAction
  | UserDetailsFailureAction
  | UserDetailsResetAction

export type UserUpdateActions =
  | UserUpdateRequestAction
  | UserUpdateSuccessAction
  | UserUpdateFailAction
  | UserUpdateResetAction

export type UserListActions =
  | UserListRequestAction
  | UserListSuccessAction
  | UserListFailAction
  | UserListResetAction

export type UserDeleteActions =
  | UserDeleteRequestAction
  | UserDeleteSuccessAction
  | UserDeleteFailAction

export type UserEditActions =
  | UserEditRequestAction
  | UserEditSuccessAction
  | UserEditFailAction
  | UserEditResetAction  

export type UserActions =
  | UserLoginLogoutActions
  | UserRegisterActions
  | UserDetailsActions
  | UserUpdateActions
  | UserListActions
  | UserDeleteActions
  | UserEditActions
  
// USER STATE TYPES
export type UserLoginState = {
  loading: boolean
  error: null | string
  userInfo: UserProps | null
}

export type UserRegisterState = {
  loading: boolean
  error: null | string
  userInfo: UserProps | null
  success: boolean
}

export type UserDetailsState = {
  loading: boolean
  error: null | string
  user: UserProps | null
}

export type UserUpdateState = {
  loading: boolean
  error: null | string
  success: boolean
  userInfo: UserProps | null
}

export type UserListState = {
  loading: boolean
  error: null | string
  users: UserProps[]
}

export type UserDeleteState = {
  loading: boolean
  error: null | string
  success: boolean
}

export type UserEditState = {
  loading: boolean
  error: null | string
  success: boolean
  user: UserProps[]
}

export type UserState = {
  userLogin: UserLoginState
  userRegister: UserRegisterState
  userDetails: UserDetailsState
  userUpdate: UserUpdateState
  userList: UserListState
  userDelete: UserDeleteState
  userEdit: UserEditState
}
