import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setCustomers = createAction(`${MODULE_NAME}_SET_CUSTOMERS`)
