import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  airlines: {},
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setAirlines]: (state, action) => ({
    ...state,
    airlines: action.payload,
  }),
}

export default handleActions(handlers, defaultState)
