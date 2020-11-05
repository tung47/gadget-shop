import {
  UserState,
  UserActions,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  UserLoginState,
  ACTION_FAIL,
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
      return { ...state, error: action.error}
    }
    default:
      return state
  }
}
