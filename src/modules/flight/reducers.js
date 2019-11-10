import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  flights: {},
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setFlights]: (state, action) => ({
    ...state,
    flights: action.payload,
  }),
}

export default handleActions(handlers, defaultState)
