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
} from '../../types'

// User Login Actions
const userLoginAction = (user: UserProps): UserLoginAction => {
  return {
    type: USER_LOGIN,
    payload: {
      userInfo: user,
    },
  }
}

export const login = ({ email, password }: UserProps): AsyncAction => async (
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
    dispatch({
      type: ACTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
