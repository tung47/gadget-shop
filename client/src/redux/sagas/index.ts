import { all } from 'redux-saga/effects'

import statesSagas from './states'

export default function* rootSaga() {
  yield all([...statesSagas])
}
