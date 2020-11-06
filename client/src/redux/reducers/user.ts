import {
  UserActions,
  ACTION_FAIL,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  UserLoginState,
  UserRegisterState,
  UserDetailsState,
  UserUpdateProfileState,
  UserListState,
  USER_DETAILS,
  USER_UPDATE_PROFILE,
  USER_UPDATE_PROFILE_RESET,
  USER_REGISTER_RESET,
  USER_LOGIN_RESET,
  USER_LIST,
  USER_LIST_RESET
} from '../../types'

// User Login and Logout Reducers
const userLoginInit = {
  userInfo: null,
  error: null,
}

export function userLoginReducer(
  state: UserLoginState = userLoginInit,
  action: UserActions
): UserLoginState {
  switch (action.type) {
    case USER_LOGIN:
      const { userInfo } = action.payload
      return { ...state, userInfo }
    case USER_LOGIN_RESET: 
      return { ...state, userInfo: null, error: null }
    case USER_LOGOUT: 
      return { ...state, userInfo: null }
    case ACTION_FAIL: {
      const { error } = action
      return { ...state, error }
    }
    default:
      return state
  }
}

// User Register Reducers
const userRegisterInit = {
  userInfo: null,
  error: null,
}

export function userRegisterReducer(
  state: UserRegisterState = userRegisterInit,
  action: UserActions
): UserRegisterState {
  switch (action.type) {
    case USER_REGISTER:
      const { userInfo } = action.payload
      return { ...state, userInfo }
    case USER_REGISTER_RESET: 
      return { ...state, userInfo: null, error: null }
    case ACTION_FAIL: {
      const { error } = action
      return { ...state, error }
    }
    default:
      return state
  }
}

// User Details Reducers
const userDetailsInit = {
  user: null,
  error: null,
}

export function userDetailsReducer(
  state: UserDetailsState = userDetailsInit,
  action: UserActions
): UserDetailsState {
  switch (action.type) {
    case USER_DETAILS:
      const { user } = action.payload
      return { ...state, user }
    case USER_REGISTER_RESET: 
      return { ...state, user: null, error: null }  
    case ACTION_FAIL: {
      const { error } = action
      return { ...state, error }
    }
    default:
      return state
  }
}

// User Update Profile Reducers
const userUpdateProfileInit = {
  success: false,
  userInfo: null,
  error: null,
}

export function userUpdateProfileReducer(
  state: UserUpdateProfileState = userUpdateProfileInit,
  action: UserActions
): UserUpdateProfileState {
  switch (action.type) {
    case USER_UPDATE_PROFILE:
      const { userInfo } = action.payload
      return { ...state, success: true, userInfo }
    case USER_UPDATE_PROFILE_RESET: 
      return { ...state, userInfo: null, error: null }
    case ACTION_FAIL: {
      const { error } = action
      return { ...state, error }
    }
    default:
      return state
  }
}

// User Update Profile Reducers
const userListInit = {
  users: null,
  error: null,
}

export function userListReducer(
  state: UserListState = userListInit,
  action: UserActions
): UserListState {
  switch (action.type) {
    case USER_LIST:
      const { users } = action.payload
      return { ...state, users }
    case USER_LIST_RESET: 
      return { ...state, users: null, error: null }
    case ACTION_FAIL: {
      const { error } = action
      return { ...state, error }
    }
    default:
      return state
  }
}