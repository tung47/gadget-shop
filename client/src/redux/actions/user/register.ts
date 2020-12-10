import { Dispatch } from 'redux'
import axios from 'axios'

import {
  UserProps,
  AsyncAction,
  UserRegisterActions,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../../../types'
import { userLoginSuccessAction } from './loginLogout'

// User Register Actions
const userRegisterRequestAction = (): UserRegisterActions => {
  return {
    type: USER_REGISTER_REQUEST,
  }
}

const userRegisterSuccessAction = (user: UserProps): UserRegisterActions => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: {
      userInfo: user,
    },
  }
}

const userRegisterFailAction = (error: string): UserRegisterActions => {
  return {
    type: USER_REGISTER_FAIL,
    error,
  }
}

export const register = (
  name: string,
  email: string,
  password: string
): AsyncAction => async (dispatch: Dispatch) => {
  try {
    dispatch(userRegisterRequestAction())

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

    dispatch(userRegisterSuccessAction(data))
    dispatch(userLoginSuccessAction(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      userRegisterFailAction(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
