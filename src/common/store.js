import { createHashHistory } from 'history'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createStore } from 'redux'
import commonReducers from './reducers/common'
import { MODULE_REDUCERS } from '../modules'

export const history = createHashHistory()

const config = {
  key: 'cnpm_qlvcb',
  storage,
  blacklist: ['session', 'compiler'],
}

const createReducers = reducers => {
  return persistCombineReducers(config, {
    common: commonReducers,
    ...MODULE_REDUCERS,
    ...reducers,
  })
}

const buildStore = reducers => {
  const initialState = {}
  const store = createStore(createReducers(reducers), initialState)
  const persistor = persistStore(store)

  store.reducers = createReducers(reducers)
  return { persistor, store }
}

export default buildStore()
