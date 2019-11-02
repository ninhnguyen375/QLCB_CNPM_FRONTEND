import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'user'

export const ENDPOINTS = {
  login: `${DEFAULT_URL}/api/auth/login`
}

export const LIMIT = 10

export const STATUS = {
  0: 'NEW',
  1: 'APPROVE',
  2: 'BANNED',
  3: 'DELETED'
}

export const STATUS_COLORS = {
  0: 'green',
  1: 'blue',
  2: 'gray',
  3: 'red'
}
