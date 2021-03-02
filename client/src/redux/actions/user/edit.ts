import { Dispatch } from 'redux'
import axios from 'axios'

import { apiURL } from '../../../api'
import {
  UserProps,
  AsyncAction,
  UserEditActions,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_RESET,
  AppState,
} from '../../../types'
import { userLogoutAction } from './loginLogout'
import { userDetailsSuccessAction } from './details'

// User Update Profile Actions
const userEditRequestAction = (): UserEditActions => {
  return {
    type: USER_EDIT_REQUEST,
  }
}

const userEditSuccessAction = (user: UserProps[]): UserEditActions => {
  return {
    type: USER_EDIT_SUCCESS,
    payload: {
      user: user,
    },
  }
}

const userEditFailAction = (error: string): UserEditActions => {
  return {
    type: USER_EDIT_FAIL,
    error,
  }
}

export const userEditResetAction = (): UserEditActions => {
  return {
    type: USER_EDIT_RESET,
  }
}

export const editUser = (user: UserProps): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch(userEditRequestAction())

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

    const { data } = await axios.put(`${apiURL}/api/v1/users/${user._id}`, user, config)

    dispatch(userEditSuccessAction(data))

    dispatch(userDetailsSuccessAction(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(userLogoutAction())
    }
    dispatch(userEditFailAction(message))
  }
}
