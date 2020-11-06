import { combineReducers } from 'redux'

import products from './product'
import cart from './cart'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './user'

const createRootReducer = () =>
  combineReducers({
    products,
    cart,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer, 
    userUpdateProfile: userUpdateProfileReducer
  })

export default createRootReducer
