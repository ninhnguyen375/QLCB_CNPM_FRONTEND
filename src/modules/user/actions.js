import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setUserToken = createAction(`${MODULE_NAME}_SET_USER_TOKEN`)
export const setUserInformation = createAction(
  `${MODULE_NAME}_SET_USER_INFORMATION`,
)
export const setUsers = createAction(`${MODULE_NAME}_SET_USERS`)
