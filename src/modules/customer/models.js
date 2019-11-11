import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'customer'

export const ENDPOINTS = {
  getCustomers: `${DEFAULT_URL}/customers`,
  createCustomer: `${DEFAULT_URL}/customers`,
  getCustomer: id => `${DEFAULT_URL}/customers/${id}`,
  updateCustomer: id => `${DEFAULT_URL}/customers/${id}`,
}

export const LIMIT = 10
export const emptyString = '---'
