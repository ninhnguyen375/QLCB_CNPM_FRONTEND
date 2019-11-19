import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setAirlines } from './actions'

export async function getAirlinesAsync(
  current = 1,
  pageSize = LIMIT,
  params = {},
) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.getAirlines,
    method: 'GET',
    params: {
      current,
      pageSize,
      ...params,
    },
  })
  return res.data
}

export const getAirlineAsync = async id => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.getAirline(id),
    method: 'GET',
  })
  return result.data
}

export const updateAirline = async (data, id) => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.updateAirline(id),
    method: 'PUT',
    data,
  })
  return result.data
}

export async function createAirlineAsync(airline = {}) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.createAirline,
    method: 'POST',
    data: airline,
  })
  return res.data
}

export default (dispatch, props) => ({
  getAirlines: async (current, pageSize, params) => {
    try {
      const res = await getAirlinesAsync(current, pageSize, params)
      dispatch(setAirlines(res))
      return { ...res, success: true }
    } catch (err) {
      dispatch(setAirlines({}))
      return { ...err, success: false }
    }
  },
  deleteAirline: async id => {
    const res = await fetchAuthLoading({
      url: ENDPOINTS.deleteAirline(id),
      method: 'DELETE',
    })
    return res.data
  },
})
