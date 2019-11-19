import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'airline'

export const ENDPOINTS = {
  getAirlines: `${DEFAULT_URL}/airlines`,
  createAirline: `${DEFAULT_URL}/airlines`,
  getAirline: id => `${DEFAULT_URL}/airlines/${id}`,
  updateAirline: id => `${DEFAULT_URL}/airlines/${id}`,
  deleteAirline: id => `${DEFAULT_URL}/airlines/${id}`,
}

export const LIMIT = 10
export const emptyString = '---'
