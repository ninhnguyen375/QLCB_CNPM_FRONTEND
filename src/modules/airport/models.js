import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'airport'

export const ENDPOINTS = {
  getAirports: `${DEFAULT_URL}/airports`,
  createAirport: `${DEFAULT_URL}/airports`,
  getAirport: id => `${DEFAULT_URL}/airports/${id}`,
  updateAirport: id => `${DEFAULT_URL}/airports/${id}`,
  deleteAirport: id => `${DEFAULT_URL}/airports/${id}`,
}

export const LIMIT = 10
export const emptyString = '---'
