import { takeLatest, select } from 'redux-saga/effects'

function* saveState() {
  const state = yield select()
  yield localStorage.setItem('state', JSON.stringify(state))
}

export default [takeLatest('*', saveState)]