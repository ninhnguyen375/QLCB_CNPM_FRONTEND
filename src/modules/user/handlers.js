import { loading, fetch, fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS } from './models'
import { setJobSeekerList, setUserInformation, setUserToken } from './actions'
import { setRoles } from '../../common/actions/common'

export function getRoles() {
  return fetchAuthLoading({
    url: ENDPOINTS.getRoles,
    method: 'GET',
  }).then(response => {
    return response.data
  })
}

export function getMyInformation() {
  return fetchAuthLoading({
    url: ENDPOINTS.getUser,
    method: 'GET',
  }).then(response => {
    return response.data
  })
}

export default (dispatch, props) => ({
  getUser: async () => {
    const result = await getMyInformation()
    if (result && result.success) {
      if (result.data.userTypeOfUser.code === 'EMPLOYER') {
      }
      const parsedData = result.data

      dispatch(
        setUserInformation({
          ...result.data,
          [parsedData.type]: parsedData.detail,
        }),
      )
      return result.data
    }
    return false
  },
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
        console.log('DEBUGER: result', result)
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
      console.log('DEBUGER: error', error)
      if (error && error.response && error.response.data) {
        const { message } = error.response.data
        return { success: false, msg: message }
      }
      return { success: false, msg: 'Server error.' }
    }
  },
  getRoles: async () => {
    try {
      const result = await loading(async () => {
        const roles = await getRoles()
        if (roles && roles.success) {
          dispatch(setRoles(roles.data))
          return roles.data
        }
        return false
      })
      return result
    } catch (err) {
      return false
    }
  },
  handlerSetSearchNull() {
    dispatch(setJobSeekerList([]))
  },
})
