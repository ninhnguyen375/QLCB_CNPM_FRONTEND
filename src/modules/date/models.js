import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'date'

export const ENDPOINTS = {
  getDates: `${DEFAULT_URL}/dates`,
  createDate: `${DEFAULT_URL}/dates`,
  getDate: id => `${DEFAULT_URL}/dates/${id}`,
  updateDate: id => `${DEFAULT_URL}/dates/${id}`,
  addFlightsToDate: id => `${DEFAULT_URL}/dates/${id}/addflights`,
  removeFlightFromDate: id => `${DEFAULT_URL}/dates/${id}/removeflight`,
  searchFlightFromDate: `${DEFAULT_URL}/searchflights`,
}

export const LIMIT = 10
export const emptyString = '---'
export const STATUS = {
  0: 'HẾT CHỖ',
  1: 'CÒN CHỖ',
}
export const STATUS_COLOR = {
  0: 'orange',
  1: 'green',
}
