import { Dispatch } from 'redux'
import axios from 'axios'

import {
  UserProps,
  AsyncAction,
  UserDetailsActions,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  AppState,
} from '../../../types'
// import { userLogoutAction } from './loginLogout'

// User Details Actions
const userDetailsRequestAction = (): UserDetailsActions => {
  return {
    type: USER_DETAILS_REQUEST,
  }
}

const userDetailsSuccessAction = (user: UserProps): UserDetailsActions => {
  return {
    type: USER_DETAILS_SUCCESS,
    payload: {
      user,
    },
  }
}

const userDetailsFailAction = (error: string): UserDetailsActions => {
  return {
    type: USER_DETAILS_FAIL,
    error,
  }
}

export const userDetailsResetAction = (): UserDetailsActions => {
  return {
    type: USER_DETAILS_RESET,
  }
}

export const getUserDetails = (userId: string): AsyncAction => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  try {
    dispatch(userDetailsRequestAction())

    const { userLogin } = getState()

    const { token } = userLogin.userInfo as UserProps

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/users/${userId}`, config)

    dispatch(userDetailsSuccessAction(data))
  } catch (error) {
    // const message =
    //   error.response && error.response.data.message
    //     ? error.response.data.message
    //     : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(userLogoutAction())
    // }
    dispatch(
      userDetailsFailAction(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
