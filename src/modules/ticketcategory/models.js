import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'ticketCategory'

export const ENDPOINTS = {
  getTicketCategories: `${DEFAULT_URL}/ticketCategories`,
  createTicketCategory: `${DEFAULT_URL}/ticketCategories`,
  getTicketCategory: id => `${DEFAULT_URL}/ticketCategories/${id}`,
  updateTicketCategory: id => `${DEFAULT_URL}/ticketCategories/${id}`,
}

export const LIMIT = 10
export const emptyString = '---'
