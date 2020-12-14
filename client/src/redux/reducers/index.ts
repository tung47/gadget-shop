import { combineReducers } from 'redux'

import products from './product'
import cart from './cart'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
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
  })

export default createRootReducer
