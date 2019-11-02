import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setAdminList = createAction(`${MODULE_NAME}_SET_ADMIN_LIST`)
export const setEmployerList = createAction(`${MODULE_NAME}_SET_EMPLOYER_LIST`)
export const setJobSeekerList = createAction(`${MODULE_NAME}_SET_JOB_SEEKER_LIST`)
export const setUserToken = createAction(`${MODULE_NAME}_SET_USER_TOKEN`)
export const setUserInformation = createAction(`${MODULE_NAME}_SET_USER_INFORMATION`)
export const setFreelancerList = createAction(`${MODULE_NAME}_SET_FREELANCER_LIST`)
export const setPendingFreelancerList = createAction(`${MODULE_NAME}_SET_PENDING_FREELANCER_LIST`)
export const setDeclineFreelancerList = createAction(`${MODULE_NAME}_SET_DECLINE_FREELANCER_LIST`)
