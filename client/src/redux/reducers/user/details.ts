import {
  UserActions,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_DETAILS_FAIL,
  UserDetailsState,
} from '../../../types'

// User Details Reducers
const userDetailsInit = {
  loading: false,
  error: null,
  user: null,
}

export function userDetailsReducer(
  state: UserDetailsState = userDetailsInit,
  action: UserActions
): UserDetailsState {
  switch (action.type) {
    case USER_DETAILS_REQUEST: 
      return { ...state, loading: true, error: null}
    case USER_DETAILS_SUCCESS:
      const { user } = action.payload
      return { ...state, loading: false, user }
    case USER_DETAILS_FAIL:
      const { error } = action
      return { ...state, loading: false, error }
    case USER_DETAILS_RESET: 
      return { ...state, loading: false, error: null, user: null }  
    default:
      return state
  }
}