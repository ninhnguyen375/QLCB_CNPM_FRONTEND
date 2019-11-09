import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'luggage'

export const ENDPOINTS = {
  getLuggages: `${DEFAULT_URL}/luggages`,
  createLuggage: `${DEFAULT_URL}/luggages`,
  getLuggage: id => `${DEFAULT_URL}/luggages/${id}`,
  updateLuggage: id => `${DEFAULT_URL}/luggages/${id}`,
}

export const LIMIT = 10
export const emptyString = '---'
