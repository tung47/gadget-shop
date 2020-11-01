import { combineReducers } from 'redux'

import products from './product'
import cart from './cart'
import users from './user'

const createRootReducer = () =>
  combineReducers({
    products,
    cart,
    users,
  })

export default createRootReducer