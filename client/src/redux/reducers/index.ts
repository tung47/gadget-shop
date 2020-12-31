import { combineReducers } from 'redux'

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from './product'
import { cartReducer } from './cart'
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
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userEdit: userEditReducer,
  })

export default createRootReducer
