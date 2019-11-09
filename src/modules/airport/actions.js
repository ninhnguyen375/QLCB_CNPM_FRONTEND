import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setAirports = createAction(`${MODULE_NAME}_SET_AIRPORTS`)
