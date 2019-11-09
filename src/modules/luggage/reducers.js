import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  luggages: {},
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setLuggages]: (state, action) => ({
    ...state,
    luggages: action.payload,
  }),
}

export default handleActions(handlers, defaultState)
