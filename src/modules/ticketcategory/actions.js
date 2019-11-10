import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setTicketCategories = createAction(
  `${MODULE_NAME}_SET_TICKETCATEGORYS`,
)
