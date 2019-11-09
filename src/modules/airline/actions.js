import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setAirlines = createAction(`${MODULE_NAME}_SET_AIRLINES`)
