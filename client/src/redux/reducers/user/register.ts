import {
  UserActions,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  UserRegisterState,
} from '../../../types'

// User Register Reducers
const userRegisterInit = {
  loading: false,
  error: null,
  userInfo: null,
  success: false,
}

export function userRegisterReducer(
  state: UserRegisterState = userRegisterInit,
  action: UserActions
): UserRegisterState {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, error: null, success: false }
    case USER_REGISTER_SUCCESS:
      const { userInfo } = action.payload
      return { ...state, loading: false, success: true, userInfo }
    case USER_REGISTER_FAIL:
      const { error } = action
      return { ...state, loading: false, success: false, error }
    default:
      return state
  }
}
