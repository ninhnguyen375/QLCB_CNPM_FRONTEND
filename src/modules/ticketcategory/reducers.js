import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  ticketCategories: {},
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setTicketCategories]: (state, action) => ({
    ...state,
    ticketCategories: action.payload,
  }),
}

export default handleActions(handlers, defaultState)
