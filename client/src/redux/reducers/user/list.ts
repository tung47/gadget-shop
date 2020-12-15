import {
  UserActions,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
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
        users: [],
      }
    case USER_LIST_SUCCESS:
      const { users } = action.payload
      return {
        ...state,
        loading: false,
        users: users,
      }
    case USER_LIST_FAIL:
      const { error } = action
      return {
        ...state,
        loading: false,
        error: error,
      }
    case USER_LIST_RESET:
      return { 
        ...state, 
        loading: false, 
        error: null, 
        users: [] 
      }
    default:
      return state
  }
}
