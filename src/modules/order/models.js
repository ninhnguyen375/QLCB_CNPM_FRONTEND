import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'order'

export const ENDPOINTS = {
  getOrders: `${DEFAULT_URL}/orders`,
  createOrder: `${DEFAULT_URL}/orders`,
  getOrder: id => `${DEFAULT_URL}/orders/${id}`,
  updateOrder: id => `${DEFAULT_URL}/orders/${id}`,
  refuseOrder: id => `${DEFAULT_URL}/orders/${id}/refuse`,
  acceptOrder: id => `${DEFAULT_URL}/orders/${id}/accept`,
}

export const LIMIT = 10
export const emptyString = '---'

export const STATUS = {
  0: 'MỚI',
  1: 'ĐÃ THANH TOÁN',
  2: 'BỊ HỦY',
}

export const STATUS_COLOR = {
  0: 'blue',
  1: 'green',
  2: 'gray',
}
