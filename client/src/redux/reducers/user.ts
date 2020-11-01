import { UserState, UserActions, USER_LOGIN, USER_LOGOUT } from '../../types'

const initialState: UserState = {
  user: [],
  isLoggedIn: false,
  userList: [],
}

export default function user(
  state: UserState = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case USER_LOGIN: {
      const { user } = action.payload
      return { ...state, user, isLoggedIn: true }
    }
    case USER_LOGOUT: {
      const { user } = action.payload
      return { ...state, user, isLoggedIn: false }
    }
    default:
      return state
  }
}
