export * from './loginLogout'
export * from './register'
export * from './details'
export * from './update'


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