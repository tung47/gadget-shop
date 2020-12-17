import {
  UserActions,
  UserBanUnbanState,
  USER_BAN_FAIL,
  USER_BAN_REQUEST,
  USER_BAN_SUCCESS,
  USER_BAN_UNBAN_RESET,
  USER_UNBAN_FAIL,
  USER_UNBAN_REQUEST,
  USER_UNBAN_SUCCESS,
} from '../../../types'

// User Ban and Unban Reducers
const userBanUnbanInit = {
  loading: false,
  error: null,
  success: false,
}

export function userBanUnbanReducer(
  state: UserBanUnbanState = userBanUnbanInit,
  action: UserActions
): UserBanUnbanState {
  switch (action.type) {
    case USER_UNBAN_REQUEST:
    case USER_BAN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case USER_UNBAN_SUCCESS:
    case USER_BAN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      }
    case USER_UNBAN_FAIL:
    case USER_BAN_FAIL:
      const { error } = action

      return {
        ...state,
        loading: false,
        success: false,
        error: error,
      }
    case USER_BAN_UNBAN_RESET:
      return {
        loading: false,
        error: null,
        success: false,
      }
    default:
      return state
  }
}
