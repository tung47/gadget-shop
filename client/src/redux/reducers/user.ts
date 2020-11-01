import {
  UserState,
  UserActions,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_DETAILS_REQUEST,
  USER_UPDATE_REQUEST,
  ADMIN_GET_USER,
  ADMIN_UPDATE_USER,
  ADMIN_DELETE_USER,
} from '../../types'

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
    case USER_REGISTER: {
      const { user } = action.payload
      console.log(user)
      return { ...state, user, isLoggedIn: true }
    }
    case USER_LOGIN: {
      const { user } = action.payload
      return { ...state, user, isLoggedIn: true }
    }
    case USER_LOGOUT: {
      const { user } = action.payload
      return { ...state, user, isLoggedIn: false }
    }
    case USER_DETAILS_REQUEST: {
      const { user } = action.payload
      return { ...state, user }
    }
    case USER_UPDATE_REQUEST: {
      const { user } = action.payload
      return { ...state, user }
    }
    
    // case ADMIN_GET_USER: {
    //   const { userList } = action.payload
    //   return { ...state, userList }
    // }
    // case ADMIN_UPDATE_USER: {
    //   const { user } = action.payload
    //   return { ...state, user }
    // }
    // case ADMIN_DELETE_USER: {
    //   return { ...state }
    // }
    
    default:
      return state
  }
}
