import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'flight'

export const ENDPOINTS = {
  getFlights: `${DEFAULT_URL}/flights`,
  createFlight: `${DEFAULT_URL}/flights`,
  getFlight: id => `${DEFAULT_URL}/flights/${id}`,
  updateFlight: id => `${DEFAULT_URL}/flights/${id}`,
}

export const LIMIT = 10
export const emptyString = '---'

export const STATUS = {
  0: 'KHÔNG HOẠT ĐỘNG',
  1: 'HOẠT ĐỘNG',
}

export const STATUS_COLORS = {
  0: 'gray',
  1: 'green',
}
