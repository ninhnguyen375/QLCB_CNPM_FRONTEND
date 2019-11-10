import {
  loading,
  fetch,
  fetchAuthLoading,
  fetchLoading,
} from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setUserInformation, setUserToken, setUsers } from './actions'

export async function getUsersAsync(
  current = 1,
  pageSize = LIMIT,
  params = {},
) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.getUsers,
    method: 'GET',
    params: {
      current,
      pageSize,
      ...params,
    },
  })
  return res.data
}

export const getUserAsync = async id => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.getUser(id),
    method: 'GET',
  })
  return result.data
}

export const updateUser = async (data, id) => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.updateUser(id),
    method: 'PUT',
    data,
  })
  return result.data
}

export async function createUserAsync(user = {}) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.createUser,
    method: 'POST',
    data: user,
  })
  return res.data
}

export default (dispatch, props) => ({
  login: async (email, password) => {
    try {
      const result = await loading(async () => {
        const result = await fetch({
          url: ENDPOINTS.login,
          method: 'POST',
          data: {
            email,
            password,
          },
        })
        if (result.data && result.data.success && result.data.user) {
          dispatch(setUserToken(result.data.token))
          dispatch(
            setUserInformation({
              ...result.data.user,
            }),
          )
        }
        return result.data
      })
      return result
    } catch (error) {
      if (error && error.response && error.response.data) {
        const { message } = error.response.data
        return { success: false, msg: message }
      }
      return { success: false, msg: 'Server error.' }
    }
  },
  getUsers: async (current, pageSize, params) => {
    try {
      const res = await getUsersAsync(current, pageSize, params)
      dispatch(setUsers(res))
      return { ...res, success: true }
    } catch (err) {
      dispatch(setUsers({}))
      return { ...err, success: false }
    }
  },
  getMe: async () => {
    try {
      const result = await loading(async () => {
        const result = await fetchAuthLoading({
          url: ENDPOINTS.getMe,
          method: 'POST',
        })
        if (result.data && result.data.success && result.data.user) {
          dispatch(setUserToken(result.data.token))
          dispatch(
            setUserInformation({
              ...result.data.user,
            }),
          )
          console.log('Ninh Debug: result', result)
        }
        return result.data
      })
      return result
    } catch (error) {
      if (error && error.response && error.response.data) {
        const { message } = error.response.data
        return { success: false, msg: message }
      }
      return { success: false, msg: 'Server error.' }
    }
  },
  blockUser: async id => {
    const result = await fetchAuthLoading({
      url: ENDPOINTS.blockUser(id),
      method: 'PUT',
    })
    return result.data
  },
  unblockUser: async id => {
    const result = await fetchAuthLoading({
      url: ENDPOINTS.unblockUser(id),
      method: 'PUT',
    })
    return result.data
  },
})
