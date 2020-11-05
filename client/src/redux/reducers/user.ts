import {
  UserActions,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  UserLoginState,
  ACTION_FAIL,
  UserRegisterState,
} from '../../types'

// User Login and Logout Reducers
const userLoginInit = {
  userInfo: null,
  error: null,
}

export function userLoginReducer(
  state: UserLoginState = userLoginInit,
  action: UserActions
): UserLoginState {
  switch (action.type) {
    case USER_LOGIN:
      const { userInfo } = action.payload
      return { ...state, userInfo }
    case USER_LOGOUT: 
      return { ...state, userInfo: null }
    case ACTION_FAIL: {
      const { error } = action
      return { ...state, error }
    }
    default:
      return state
  }
}

// User Register Reducers
const userRegisterInit = {
  userInfo: null,
  error: null,
}

export function userRegisterReducer(
  state: UserRegisterState = userRegisterInit,
  action: UserActions
): UserRegisterState {
  switch (action.type) {
    case USER_REGISTER:
      const { userInfo } = action.payload
      return { ...state, userInfo }
    case ACTION_FAIL: {
      const { error } = action
      return { ...state, error }
    }
    default:
      return state
  }
}
