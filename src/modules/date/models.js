import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'date'

export const ENDPOINTS = {
  getDates: `${DEFAULT_URL}/dates`,
  createDate: `${DEFAULT_URL}/dates`,
  getDate: id => `${DEFAULT_URL}/dates/${id}`,
  updateDate: id => `${DEFAULT_URL}/dates/${id}`,
}

export const LIMIT = 10
export const emptyString = '---'
