import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  orders: {},
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setOrders]: (state, action) => ({
    ...state,
    orders: action.payload,
  }),
}

export default handleActions(handlers, defaultState)
