import { combineReducers } from 'redux'

import products from './product'
import cart from './cart'

const createRootReducer = () =>
  combineReducers({
    products,
    cart,
  })

export default createRootReducer