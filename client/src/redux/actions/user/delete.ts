import { Dispatch } from 'redux'
import axios from 'axios'

import { apiURL } from '../../../api'
import {
  UserProps,
  AsyncAction,
  UserDeleteActions,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../../../types'

// User Delete Actions
const userDeleteRequestAction = (): UserDeleteActions => {
  return {
    type: USER_DELETE_REQUEST,
  }
}

const userDeleteSuccessAction = (): UserDeleteActions => {
  return {
    type: USER_DELETE_SUCCESS,
  }
}

const userDeleteFailAction = (error: string): UserDeleteActions => {
  return {
    type: USER_DELETE_FAIL,
    error,
  }
}

export const deleteUser = (id: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(userDeleteRequestAction())

    const { userLogin } = getState()
    const { token } = userLogin.userInfo as UserProps

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    await axios.delete(`${apiURL}/api/v1/users/${id}`, config)

    dispatch(userDeleteSuccessAction())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      // dispatch(logout())
    }
    dispatch(userDeleteFailAction(message))
  }
}
