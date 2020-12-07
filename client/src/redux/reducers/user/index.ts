export * from './loginLogout'
export * from './register'


// // User Details Reducers
// const userDetailsInit = {
//   user: null,
//   error: null,
// }

// export function userDetailsReducer(
//   state: UserDetailsState = userDetailsInit,
//   action: UserActions
// ): UserDetailsState {
//   switch (action.type) {
//     case USER_DETAILS:
//       const { user } = action.payload
//       return { ...state, user }
//     case USER_REGISTER_RESET: 
//       return { ...state, user: null, error: null }  
//     case ACTION_FAIL: {
//       const { error } = action
//       return { ...state, error }
//     }
//     default:
//       return state
//   }
// }

// // User Update Profile Reducers
// const userUpdateProfileInit = {
//   success: false,
//   userInfo: null,
//   error: null,
// }

// export function userUpdateProfileReducer(
//   state: UserUpdateProfileState = userUpdateProfileInit,
//   action: UserActions
// ): UserUpdateProfileState {
//   switch (action.type) {
//     case USER_UPDATE_PROFILE:
//       const { userInfo } = action.payload
//       return { ...state, success: true, userInfo }
//     case USER_UPDATE_PROFILE_RESET: 
//       return { ...state, userInfo: null, error: null }
//     case ACTION_FAIL: {
//       const { error } = action
//       return { ...state, error }
//     }
//     default:
//       return state
//   }
// }

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