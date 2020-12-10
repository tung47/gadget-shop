export * from './loginLogout'
export * from './register'
export * from './details'
export * from './update'

// // User Update Profile Reducers
// const userListInit = {
//   users: null,
//   error: null,
// }

// export function userListReducer(
//   state: UserListState = userListInit,
//   action: UserActions
// ): UserListState {
//   switch (action.type) {
//     case USER_LIST:
//       const { users } = action.payload
//       return { ...state, users }
//     case USER_LIST_RESET: 
//       return { ...state, users: null, error: null }
//     case ACTION_FAIL: {
//       const { error } = action
//       return { ...state, error }
//     }
//     default:
//       return state
//   }
// }