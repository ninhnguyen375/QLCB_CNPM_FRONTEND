import * as actions from './actions'
import { handleActions } from 'redux-actions'

const initialState = {
  searchFlightParams: {},
}

const handlers = {
  [actions.setSearchFlightParams]: (state, action) => ({
    ...state,
    searchFlightParams: { ...state.searchFlightParams, ...action.payload },
  }),
}

export default handleActions(handlers, initialState)
