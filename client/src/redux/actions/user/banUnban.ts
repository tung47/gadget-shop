import { Dispatch } from 'redux'
import axios from 'axios'

import {
  AsyncAction,
  UserBanUnbanActions,
  UserProps,
  USER_BAN_FAIL,
  USER_BAN_REQUEST,
  USER_BAN_SUCCESS,
  USER_BAN_UNBAN_RESET,
  USER_UNBAN_FAIL,
  USER_UNBAN_REQUEST,
  USER_UNBAN_SUCCESS,
} from '../../../types'

// User Ban Actions
const userBanRequestAction = (): UserBanUnbanActions => {
  return {
    type: USER_BAN_REQUEST,
  }
}

const userBanSuccessAction = (): UserBanUnbanActions => {
  return {
    type: USER_BAN_SUCCESS,
  }
}

const userBanFailAction = (error: string): UserBanUnbanActions => {
  return {
    type: USER_BAN_FAIL,
    error,
  }
}

export const userBanUnbanReset = (): UserBanUnbanActions => {
  return {
    type: USER_BAN_UNBAN_RESET,
  }
}

export const banUser = (id: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(userBanRequestAction())

    const { userLogin } = getState()

    if (
      !userLogin ||
      !userLogin.userInfo ||
      userLogin.userInfo.name !== 'Admin User'
    ) {
      throw new Error('403: Not authorized')
    }

    const { token } = userLogin.userInfo as UserProps

    const response: any = await fetch(`/api/v1/users/${id}/ban-user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      dispatch(userBanSuccessAction())
    } else {
      dispatch(userBanFailAction(`${response.status}: Could not get user`))
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch(userBanFailAction(message))
  }
}

// USER UNBAN ACTION CREATORS
const userUnbanRequestAction = (): UserBanUnbanActions => {
  return {
    type: USER_UNBAN_REQUEST,
  }
}

const userUnbanSuccessAction = (): UserBanUnbanActions => {
  return {
    type: USER_UNBAN_SUCCESS,
  }
}

const userUnbanFailAction = (error: string): UserBanUnbanActions => {
  return {
    type: USER_UNBAN_FAIL,
    error,
  }
}

export const unbanUser = (id: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(userUnbanRequestAction())

    const { userLogin } = getState()

    if (!userLogin || !userLogin.userInfo) {
      throw new Error('401: Login to continue')
    }

    const { token } = userLogin.userInfo as UserProps

    const response: any = await fetch(`/api/v1/users/${id}/unban-user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      dispatch(userUnbanSuccessAction())
    } else {
      dispatch(userUnbanFailAction(`${response.status}: Could not get user`))
    }
  } catch (err) {
    dispatch(userUnbanFailAction(err))
  }
}
