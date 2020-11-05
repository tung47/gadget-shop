import { combineReducers } from 'redux'

import products from './product'
import cart from './cart'
import { userLoginReducer, userRegisterReducer } from './user'

const createRootReducer = () =>
  combineReducers({
    products,
    cart,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
  })

export default createRootReducer
