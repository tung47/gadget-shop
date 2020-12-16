import { Dispatch } from 'redux'
import axios from 'axios'

import {
  UserProps,
  AsyncAction,
  UserListActions,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  AppState,
} from '../../../types'
import { userLogoutAction } from './loginLogout'

// User List Actions
const userListRequestAction = (): UserListActions => {
  return {
    type: USER_LIST_REQUEST,
  }
}

const userListSuccessAction = (users: UserProps[]): UserListActions => {
  return {
    type: USER_LIST_SUCCESS,
    payload: {
      users,
    },
  }
}

const userListFailAction = (error: string): UserListActions => {
  return {
    type: USER_LIST_FAIL,
    error,
  }
}

export const userListResetAction = (): UserListActions => {
  return {
    type: USER_LIST_RESET,
  }
}

export const listUsers = (): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch(userListRequestAction())

    const { userLogin: {userInfo} } = getState()

    if (!userInfo) {
      throw new Error('401: Login to continue')
    }

    const { token } = userInfo as UserProps

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/users/`, config)

    dispatch(userListSuccessAction(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(userLogoutAction())
    }
    dispatch(userListFailAction(message))
  }
}