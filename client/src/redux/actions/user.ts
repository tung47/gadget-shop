import { Dispatch } from 'redux'
import axios from 'axios'
import bcrypt from 'bcryptjs'

import { UserProps, UserActions, USER_LOGIN, USER_LOGOUT } from '../../types'

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

const login = (user: UserProps): UserActions => {
  return {
    type: USER_LOGIN,
    payload: { user: [] },
  }
}

const logout = (user: UserProps): UserActions => {
  return {
    type: USER_LOGOUT,
    payload: {
      user: [],
    },
  }
}
