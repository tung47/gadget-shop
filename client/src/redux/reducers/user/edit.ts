import {
  UserActions,
  UserEditState,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_RESET,
  USER_EDIT_SUCCESS,
} from '../../../types'

// User Edit Status Reducers
const userEditInit = {
  loading: false,
  error: null,
  success: false,
  user: [],
}

export function userEditReducer(
  state: UserEditState = userEditInit,
  action: UserActions
): UserEditState {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
        user: [],
      }
    case USER_EDIT_SUCCESS:
      const { user } = action.payload
      return { ...state, loading: false, success: true, user }
    case USER_EDIT_FAIL:
      const { error } = action
      return { ...state, loading: false, error, success: false, user: [] }
    case USER_EDIT_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        user: [],
      }
    default:
      return state
  }
}