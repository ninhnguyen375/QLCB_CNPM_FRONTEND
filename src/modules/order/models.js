import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'order'

export const ENDPOINTS = {
  getOrders: `${DEFAULT_URL}/orders`,
  createOrder: `${DEFAULT_URL}/orders`,
  getOrder: id => `${DEFAULT_URL}/orders/${id}`,
  updateOrder: id => `${DEFAULT_URL}/orders/${id}`,
}

export const LIMIT = 10
export const emptyString = '---'
