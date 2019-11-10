import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  dates: {},
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setDates]: (state, action) => ({
    ...state,
    dates: action.payload,
  }),
}

export default handleActions(handlers, defaultState)
