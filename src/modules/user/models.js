import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'user'

export const ENDPOINTS = {
  login: `${DEFAULT_URL}/auth/login`,
  getUsers: `${DEFAULT_URL}/users`,
  createUser: `${DEFAULT_URL}/users`,
  getUser: id => `${DEFAULT_URL}/users/${id}`,
  updateUser: id => `${DEFAULT_URL}/users/${id}`,
}

export const LIMIT = 10
export const emptyString = '---'

export const STATUS = {
  0: 'NEW',
  1: 'APPROVE',
  2: 'BANNED',
  3: 'DELETED',
}

export const ROLE = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
}

export const STATUS_COLORS = {
  0: 'green',
  1: 'blue',
  2: 'gray',
  3: 'red',
}
