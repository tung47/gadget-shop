import { Dispatch } from 'redux'
import axios from 'axios'

import {
  UserProps,
  ProductProps,
  UserActions,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  AsyncAction,
  ErrorAction,
  ACTION_FAIL,
  UserLoginState,
  UserLoginAction,
  UserRegisterAction,
  UserDetailsAction,
  USER_DETAILS,
  AppState,
  UserLogoutAction,
  UserUpdateProfileAction,
  USER_UPDATE_PROFILE,
} from '../../types'

// Fail Action
const failAction = (error: string): ErrorAction => {
  return {
    type: ACTION_FAIL,
    error,
  }
}

// User Login Actions
const userLoginAction = (user: UserProps): UserLoginAction => {
  return {
    type: USER_LOGIN,
    payload: {
      userInfo: user,
    },
  }
}

export const login = (email: string, password: string): AsyncAction => async (
  dispatch: Dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/v1/users/login',
      { email, password },
      config
    )

    dispatch(userLoginAction(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(failAction(error))
  }
}

// User Login Actions
const userLogoutAction = (): UserLogoutAction => {
  return {
    type: USER_LOGOUT,
  }
}

export const logout = (): AsyncAction => async (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch(userLogoutAction())
}

// User Register Actions
const userRegisterAction = (user: UserProps): UserRegisterAction => {
  return {
    type: USER_REGISTER,
    payload: {
      userInfo: user,
    },
  }
}

export const register = (
  name: string,
  email: string,
  password: string
): AsyncAction => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/v1/users',
      { name, email, password },
      config
    )

    dispatch(userRegisterAction(data))
    dispatch(userLoginAction(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(failAction(error))
  }
}

// User Details Actions
const userDetailsAction = (user: UserProps): UserDetailsAction => {
  return {
    type: USER_DETAILS,
    payload: {
      user: user,
    },
  }
}

export const getUserDetails = (id: string): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    const { userLogin } = getState()

    const { token } = userLogin.userInfo as UserProps

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/users/${id}`, config)

    dispatch(userDetailsAction(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch(failAction(message))
  }
}

// User Update Profile Actions
const userUpdateProfileAction = (user: UserProps): UserUpdateProfileAction => {
  return {
    type: USER_UPDATE_PROFILE,
    payload: {
      userInfo: user,
    },
  }
}

export const updateUserProfile = (user: UserProps): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    const { userLogin } = getState()

    if (!userLogin || !userLogin.userInfo) {
      throw new Error('401: Login to continue')
    }

    const { token } = userLogin.userInfo as UserProps

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch(userUpdateProfileAction(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch(failAction(message))
  }
}
