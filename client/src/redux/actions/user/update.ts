import { Dispatch } from 'redux'
import axios from 'axios'

import { apiURL } from '../../../api'
import {
  UserProps,
  AsyncAction,
  UserUpdateActions,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  AppState,
} from '../../../types'
import { userLogoutAction } from './loginLogout'

// User Update Profile Actions
const userUpdateRequestAction = (): UserUpdateActions => {
  return {
    type: USER_UPDATE_REQUEST,
  }
}

const userUpdateSuccessAction = (user: UserProps): UserUpdateActions => {
  return {
    type: USER_UPDATE_SUCCESS,
    payload: {
      userInfo: user,
    },
  }
}

const userUpdateFailAction = (error: string): UserUpdateActions => {
  return {
    type: USER_UPDATE_FAIL,
    error,
  }
}

export const userUpdateResetAction = (): UserUpdateActions => {
  return {
    type: USER_UPDATE_RESET,
  }
}

export const updateUser = (user: UserProps): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch(userUpdateRequestAction())

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

    const { data } = await axios.put(
      `${apiURL}/api/v1/users/profile`,
      user,
      config
    )

    dispatch(userUpdateSuccessAction(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(userLogoutAction())
    }
    dispatch(userUpdateFailAction(message))
  }
}
