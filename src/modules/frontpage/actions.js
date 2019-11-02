import { createAction } from 'redux-actions'

import { MODULE_NAME } from './models'

export const setSearchFlightParams = createAction(
  `${MODULE_NAME}_SET_SEARCH_FLIGHT_PARAMS`,
)
