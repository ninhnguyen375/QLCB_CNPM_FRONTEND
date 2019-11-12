import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setOrders = createAction(`${MODULE_NAME}_SET_ORDERS`)
