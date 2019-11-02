import { createAction } from 'redux-actions'

export const clearAll = createAction('CLEAR_ALL')
export const setUserLanguage = createAction('SET_USER_LANGUAGE')
export const setRequestTimeout = createAction('SET_USER_TIMEOUT')

export const setLocations = createAction('SET_LOCATIONS')
export const setRoles = createAction('SET_ROLES')
