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
  userEditReducer,
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
    userEdit: userEditReducer,
  })

export default createRootReducer
