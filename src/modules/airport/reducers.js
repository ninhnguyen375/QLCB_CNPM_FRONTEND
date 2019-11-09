import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  airports: {},
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setAirports]: (state, action) => ({
    ...state,
    airports: action.payload,
  }),
}

export default handleActions(handlers, defaultState)
