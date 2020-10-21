import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { AppState } from '../types'
import createRootReducer from './reducers'

const cartItemsFromState = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')!)
  : []

const initialState: AppState = {
  products: {
    loading: true,
    error: null,
    productList: [],
  },
  cart: {
    cartItems: cartItemsFromState,
  },
}

const middleware = [thunk]

const store = createStore(
  createRootReducer(),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
