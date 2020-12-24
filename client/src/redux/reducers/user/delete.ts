import {
  UserActions,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  UserDeleteState,
} from '../../../types'

// User Delete Reducer
const userDeleteInit = {
  loading: false,
  error: null,
  success: false,
}

export function userDeleteReducer(
  state: UserDeleteState = userDeleteInit,
  action: UserActions
): UserDeleteState {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      }
    case USER_DELETE_FAIL:
      const { error } = action

      return {
        ...state,
        loading: false,
        success: false,
        error: error,
      }
    default:
      return state
  }
}
