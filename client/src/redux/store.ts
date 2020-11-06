import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { AppState } from '../types'
import createRootReducer from './reducers'
import rootSaga from './sagas'

const userLoginFromStorage = localStorage.getItem('userLogin') || null

let initState: AppState = {
  products: {
    product: [],
    loading: false,
    error: null,
    productList: [],
  },
  cart: {
    cartItems: [],
  },
  userLogin: {
    userInfo: userLoginFromStorage ? JSON.parse(userLoginFromStorage) : null,
    error: null,
  },
  userRegister: {
    userInfo: null,
    error: null,
  }, 
  userDetails: {
    user: null,
    error: null,
  }, 
  userUpdateProfile: {
    userInfo: null,
    error: null,
    success: false,
  }
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
