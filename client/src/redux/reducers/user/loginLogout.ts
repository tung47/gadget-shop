import {
  UserActions,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  UserLoginState,
  USER_LOGOUT,
} from '../../../types'

// User Login and Logout Reducers
const userLoginInit = {
  loading: false,
  error: null,
  userInfo: null,
}

export function userLoginReducer(
  state: UserLoginState = userLoginInit,
  action: UserActions
): UserLoginState {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: null}
    case USER_LOGIN_SUCCESS:
      const { userInfo } = action.payload
      return { ...state, loading: false, userInfo }
    case USER_LOGIN_FAIL: 
      const { error } = action
      return { ...state, loading: false, error }
    case USER_LOGOUT: 
      return { ...state, userInfo: null }
    default:
      return state
  }
}