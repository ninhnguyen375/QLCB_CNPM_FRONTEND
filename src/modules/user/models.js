import { DEFAULT_URL } from '../../configs'

export const MODULE_NAME = 'user'

export const ENDPOINTS = {
  login: `${DEFAULT_URL}/auth/login`,
  getUsers: `${DEFAULT_URL}/users`,
  createUser: `${DEFAULT_URL}/users`,
  getUser: id => `${DEFAULT_URL}/users/${id}`,
  updateUser: id => `${DEFAULT_URL}/users/${id}`,
  blockUser: id => `${DEFAULT_URL}/users/${id}/block`,
  unblockUser: id => `${DEFAULT_URL}/users/${id}/unblock`,
  deleteUser: id => `${DEFAULT_URL}/users/${id}`,
  getMe: `${DEFAULT_URL}/auth/me`,
  changeUserPassword: `${DEFAULT_URL}/auth/changepassword`,
  resetUserPassword: id => `${DEFAULT_URL}/users/${id}/resetpassword`,
}

export const LIMIT = 10
export const emptyString = '---'

export const STATUS = {
  1: ' ĐANG HOẠT ĐỘNG ',
  2: ' ĐÃ KHÓA ',
  // 3: ' ĐÃ XÓA ',
  4: ' MỚI ',
}

export const STATUS_CODE = {
  ACTIVE: 1,
  BANNED: 2,
  // DELETED: 3,
  NEW: 4,
}

export const ROLE = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
}

export const STATUS_COLORS = {
  1: 'green',
  2: 'red',
  3: 'gray',
}
