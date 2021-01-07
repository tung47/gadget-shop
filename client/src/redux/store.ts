import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { AppState } from '../types'
import createRootReducer from './reducers'
import rootSaga from './sagas'

const cartFromStorage = localStorage.getItem('cartItems')
const cartItemsFromStorage = cartFromStorage ? JSON.parse(cartFromStorage) : []

const userLoginFromStorage = localStorage.getItem('userLogin') || null
const userInfoFromStorage = userLoginFromStorage
  ? JSON.parse(userLoginFromStorage)
  : null

const addressFromStorage = localStorage.getItem('shippingAddress') || null
const shippingAddressFromStorage = addressFromStorage
  ? JSON.parse(addressFromStorage)
  : null

let initState: AppState = {
  productList: {
    loading: false,
    error: null,
    products: [],
  },
  productDetails: {
    loading: false,
    error: null,
    product: null,
  },
  productDelete: {
    loading: false,
    error: null,
    success: false,
  },
  productCreate: {
    loading: false,
    error: null,
    success: false,
    product: null,
  },
  productUpdate: {
    loading: false,
    error: null,
    success: false,
    product: null,
  },
  productReview: {
    loading: false,
    error: null,
    success: false,
  },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: null,
  },
  userLogin: {
    loading: false,
    error: null,
    userInfo: userInfoFromStorage,
  },
  userRegister: {
    loading: false,
    error: null,
    success: false,
    userInfo: null,
  },
  userDetails: {
    loading: false,
    error: null,
    user: null,
  },
  userUpdate: {
    loading: false,
    error: null,
    success: false,
    userInfo: null,
  },
  userList: {
    loading: false,
    error: null,
    users: [],
  },
  userDelete: {
    loading: false,
    error: null,
    success: false,
  },
  userEdit: {
    loading: false,
    error: null,
    success: false,
    user: [],
  },
}

const savedState = localStorage.getItem('state') || ''
if (savedState) {
  initState = JSON.parse(savedState)
}

export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, thunk]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  sagaMiddleware.run(rootSaga)

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
