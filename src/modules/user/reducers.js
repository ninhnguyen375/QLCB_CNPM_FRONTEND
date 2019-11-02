import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  token: null,
  user: {}
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setUserInformation]: (state, action) => {
    return ({
      ...state,
      user: action.payload
    })
  },
  [actions.setUserToken]: (state, action) => ({
    ...state,
    token: action.payload
  })
}

export default handleActions(handlers, defaultState)
