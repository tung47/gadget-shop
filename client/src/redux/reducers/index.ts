import { combineReducers } from 'redux'

import products from './product'
import cart from './cart'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
} from './user'

const createRootReducer = () =>
  combineReducers({
    products,
    cart,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
  })

export default createRootReducer
