import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  customers: {},
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setCustomers]: (state, action) => ({
    ...state,
    customers: action.payload,
  }),
}

export default handleActions(handlers, defaultState)
