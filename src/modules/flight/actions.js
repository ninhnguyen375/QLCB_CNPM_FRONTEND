import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setFlights = createAction(`${MODULE_NAME}_SET_FLIGHTS`)
