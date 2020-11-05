import { combineReducers } from 'redux'

import products from './product'
import cart from './cart'
import { userLoginReducer } from './user'

const createRootReducer = () =>
  combineReducers({
    products,
    cart,
    userLogin: userLoginReducer,
  })

export default createRootReducer
