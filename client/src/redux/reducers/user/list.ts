import {
  UserActions,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  UserListState,
} from '../../../types'

// User Update Profile Reducers
const userListInit = {
  loading: false,
  error: null,
  users: [],
}

export function userListReducer(
  state: UserListState = userListInit,
  action: UserActions
): UserListState {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case USER_LIST_SUCCESS:
      const { users } = action.payload
      return {
        ...state,
        users: users,
        loading: false,
      }
    case USER_LIST_FAIL:
      const { error } = action
      return {
        ...state,
        loading: false,
        error: error,
      }
    default:
      return state
  }
}