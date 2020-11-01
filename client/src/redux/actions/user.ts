import { Dispatch } from 'redux'
import axios from 'axios'

import {
  UserProps,
  ProductProps,
  UserActions,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_ADD_TO_CART,
  USER_REMOVE_FROM_CART,
  USER_DETAILS_REQUEST,
  USER_UPDATE_REQUEST,
  AdminActions,
  ADMIN_GET_USER,
  ADMIN_UPDATE_USER,
  ADMIN_DELETE_USER,
  AsyncAction,
  ErrorAction,
  ACTION_FAIL,
} from '../../types'

const authFetches = {
  loginFetch: async (email: string, password: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          token: localStorage.getItem('token') as string,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      return res.json()
    } catch (err) {
      console.log('login fetch failed', err)
    }
  },
  registerFetch: async (email: string, password: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          token: localStorage.getItem('token') as string,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      return res.json()
    } catch (err) {
      console.log('signup fetch failed', err)
    }
  },
}

const userRegister = (user: UserProps[]): UserActions => {
  return {
    type: USER_REGISTER,
    payload: {
      user: user,
    },
  }
}

const userLogin = (user: UserProps): UserActions => {
  return {
    type: USER_LOGIN,
    payload: { user: [] },
  }
}

const userLogout = (): UserActions => {
  return {
    type: USER_LOGOUT,
    payload: {
      user: [],
    },
  }
}

const userAddToCart = (product: ProductProps): UserActions => {
  return {
    type: USER_ADD_TO_CART,
    payload: {
      product: product,
    },
  }
}

const userRemoveFromCart = (product: ProductProps): UserActions => {
  return {
    type: USER_REMOVE_FROM_CART,
    payload: {
      product: product,
    },
  }
}

const userDetailsRequest = (user: UserProps[]): UserActions => {
  return {
    type: USER_DETAILS_REQUEST,
    payload: {
      user: user,
    },
  }
}

const userUpdateRequest = (user: UserProps[]): UserActions => {
  return {
    type: USER_UPDATE_REQUEST,
    payload: {
      user: user,
    },
  }
}

const adminGetUser = (userList: UserProps[]): AdminActions => {
  return {
    type: ADMIN_GET_USER,
    payload: {
      userList: userList,
    },
  }
}

const adminUpdateUser = (user: UserProps[]): AdminActions => {
  return {
    type: ADMIN_UPDATE_USER,
    payload: {
      user: user,
    },
  }
}

const adminDeleteUser = (): AdminActions => {
  return {
    type: ADMIN_DELETE_USER,
  }
}

const actionFail = (error: string): ErrorAction => {
  return {
    type: ACTION_FAIL,
    error: error,
  }
}

export const register = (email: string, password: string): AsyncAction => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await authFetches.registerFetch(email, password)
      if (data.token) {
        localStorage.setItem('token', data.token)
        dispatch(userRegister(data))
      } else {
        console.log(data.error)
      }
    } catch (error) {
      return dispatch(
        actionFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const login = (email: string, password: string): AsyncAction => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await authFetches.loginFetch(email, password)
      if (data.token) {
        localStorage.setItem('token', data.token)
        dispatch(userLogin(data))
      } else {
        console.log(data.error)
      }
    } catch (error) {
      return dispatch(
        actionFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const logout = (): AsyncAction => {
  return async (dispatch: Dispatch, getState: any) => {
    localStorage.removeItem('token')
    localStorage.removeItem(getState().cart.cartItems)
    dispatch(userLogout())
  }
}

export const addToUserCart = (product: ProductProps): AsyncAction => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userAddToCart(product))
    } catch (error) {
      return dispatch(
        actionFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const removeFromUserCart = (product: ProductProps): AsyncAction => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userRemoveFromCart(product))
    } catch (error) {
      return dispatch(
        actionFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const getUserDetails = (id: string): AsyncAction => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/users/${id}`,
        config
      )
      dispatch(userDetailsRequest(data))
    } catch (error) {
      return dispatch(
        actionFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const updateUserDetails = (email: string, name: string): AsyncAction => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('token')
      console.log('token from local storage: ', token)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.patch(
        `http://localhost:5000/api/v1/users/profile`,
        { email, name },
        config
      )
      dispatch(userUpdateRequest(data))
    } catch (error) {
      return dispatch(
        actionFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const listUsers = (): AsyncAction => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/users`,
        config
      )

      dispatch(adminGetUser(data))
    } catch (error) {
      return dispatch(
        actionFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const updateUser = (
  _id: string,
  email: string,
  name: string
): AsyncAction => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.patch(
        `http://localhost:5000/api/v1/users/${_id}`,
        { _id, email, name },
        config
      )
      dispatch(adminUpdateUser(data))
    } catch (error) {
      return dispatch(
        actionFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const deleteUser = (id: string): AsyncAction => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await axios.delete(`http://localhost:5000/api/v1/users/${id}`, config)
      dispatch(adminDeleteUser())
    } catch (error) {
      return dispatch(
        actionFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}
