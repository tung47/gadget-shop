export * from './loginLogout'

// import { Dispatch } from 'redux'
// import axios from 'axios'

// import {
//   UserProps,
//   AsyncAction,
//   UserLoginLogoutActions,
//   UserRegisterActions,
//   UserListActions,
//   UserDetailsActions,
//   UserUpdateActions,
//   UserDeleteActions,
//   UserBanUnbanActions,
//   LoginInfo,
//   USER_LIST_REQUEST,
//   USER_LIST_SUCCESS,
//   USER_LIST_FAIL,
//   USER_LIST_RESET,
//   USER_BAN_REQUEST,
//   USER_BAN_SUCCESS,
//   USER_BAN_FAIL,
//   USER_UNBAN_REQUEST,
//   USER_UNBAN_SUCCESS,
//   USER_UNBAN_FAIL,
//   USER_BAN_UNBAN_RESET,
//   USER_DETAILS_REQUEST,
//   USER_DETAILS_SUCCESS,
//   USER_DETAILS_FAIL,
//   USER_DETAILS_RESET,
//   USER_DELETE_REQUEST,
//   USER_DELETE_SUCCESS,
//   USER_DELETE_FAIL,
//   USER_UPDATE_REQUEST,
//   USER_UPDATE_SUCCESS,
//   USER_UPDATE_FAIL,
//   USER_UPDATE_RESET,
//   USER_REGISTER_REQUEST,
//   USER_REGISTER_SUCCESS,
//   USER_REGISTER_FAIL,
//   USER_LOGOUT,
// } from '../../../types'

// // User Register Actions
// const userRegisterAction = (user: UserProps): UserRegisterAction => {
//   return {
//     type: USER_REGISTER,
//     payload: {
//       userInfo: user,
//     },
//   }
// }

// const userRegisterResetAction = (): UserRegisterResetAction => {
//   return {
//     type: USER_REGISTER_RESET,
//   }
// }

// export const register = (
//   name: string,
//   email: string,
//   password: string
// ): AsyncAction => async (dispatch: Dispatch) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }

//     const { data } = await axios.post(
//       '/api/v1/users',
//       { name, email, password },
//       config
//     )

//     dispatch(userRegisterAction(data))
//     dispatch(userLoginAction(data))

//     localStorage.setItem('userInfo', JSON.stringify(data))
//   } catch (error) {
//     dispatch(failAction(error))
//   }
// }

// // User Details Actions
// const userDetailsAction = (user: UserProps): UserDetailsAction => {
//   return {
//     type: USER_DETAILS,
//     payload: {
//       user: user,
//     },
//   }
// }

// export const userDetailsResetAction = (): UserDetailsResetAction => {
//   return {
//     type: USER_DETAILS_RESET,
//   }
// }

// export const getUserDetails = (id: string): AsyncAction => async (
//   dispatch: Dispatch,
//   getState: () => AppState
// ) => {
//   try {
//     const { userLogin } = getState()

//     const { token } = userLogin.userInfo as UserProps

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }

//     const { data } = await axios.get(`/api/v1/users/${id}`, config)

//     dispatch(userDetailsAction(data))
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(userLogoutAction())
//     }
//     dispatch(failAction(message))
//   }
// }

// // User Update Profile Actions
// const userUpdateProfileAction = (user: UserProps): UserUpdateProfileAction => {
//   return {
//     type: USER_UPDATE_PROFILE,
//     payload: {
//       userInfo: user,
//     },
//   }
// }

// export const userUpdateProfileResetAction = (): UserUpdateProfileResetAction => {
//   return {
//     type: USER_UPDATE_PROFILE_RESET,
//   }
// }

// export const updateUserProfile = (user: UserProps): AsyncAction => async (
//   dispatch: Dispatch,
//   getState: () => AppState
// ) => {
//   try {
//     const { userLogin } = getState()

//     if (!userLogin || !userLogin.userInfo) {
//       throw new Error('401: Login to continue')
//     }

//     const { token } = userLogin.userInfo as UserProps

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     }

//     const { data } = await axios.put(`/api/v1/users/profile`, user, config)

//     dispatch(userUpdateProfileAction(data))
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(userLogoutAction())
//     }
//     dispatch(failAction(message))
//   }
// }

// // User List Actions
// const userListAction = (users: UserProps[]): UserListAction => {
//   return {
//     type: USER_LIST,
//     payload: {
//       users: users,
//     },
//   }
// }

// export const userListResetAction = (): UserListResetAction => {
//   return {
//     type: USER_LIST_RESET,
//   }
// }

// export const listUsers = (): AsyncAction => async (
//   dispatch: Dispatch,
//   getState: () => AppState
// ) => {
//   try {
//     const { userLogin } = getState()

//     if (!userLogin || !userLogin.userInfo) {
//       throw new Error('401: Login to continue')
//     }

//     const { token } = userLogin.userInfo as UserProps

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }

//     const { data } = await axios.put(`/api/v1/users/`, config)

//     dispatch(userListAction(data))
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(userLogoutAction())
//     }
//     dispatch(failAction(message))
//   }
// }