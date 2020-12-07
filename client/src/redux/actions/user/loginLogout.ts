import { Dispatch } from 'redux'
import axios from 'axios'

import {
  UserProps,
  AsyncAction,
  UserLoginLogoutActions,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../../../types'

// User Login Actions
const userLoginRequestAction = (): UserLoginLogoutActions => {
  return {
    type: USER_LOGIN_REQUEST,
  }
}

export const userLoginSuccessAction = (
  user: UserProps
): UserLoginLogoutActions => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: {
      userInfo: user,
    },
  }
}

const userLoginFailAction = (error: string): UserLoginLogoutActions => {
  return {
    type: USER_LOGIN_FAIL,
    error,
  }
}

export const login = (email: string, password: string): AsyncAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(userLoginRequestAction())

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

    dispatch(userLoginSuccessAction(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      userLoginFailAction(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

// User Logout Actions
const userLogoutAction = (): UserLoginLogoutActions => {
  return {
    type: USER_LOGOUT,
  }
}

export const logout = (): AsyncAction => async (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('error')
  dispatch(userLogoutAction())
  // dispatch(userLoginResetAction())
  // dispatch(userRegisterResetAction())
  // dispatch(userDetailsResetAction())
  // dispatch(userUpdateProfileResetAction())
  // dispatch(userListResetAction())
}
