import {
  UserActions,
  UserUpdateState,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from '../../../types'

// User Update Profile Reducers
const userUpdateInit = {
  loading: false,
  error: null,
  success: false,
  userInfo: null,
}

export function userUpdateReducer(
  state: UserUpdateState = userUpdateInit,
  action: UserActions
): UserUpdateState {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
        userInfo: null,
      }
    case USER_UPDATE_SUCCESS:
      const { userInfo } = action.payload
      return { ...state, loading: false, success: true, userInfo }
    case USER_UPDATE_FAIL:
      const { error } = action
      return { ...state, loading: false, error, success: false, userInfo: null }
    case USER_UPDATE_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        userInfo: null,
      }
    default:
      return state
  }
}
