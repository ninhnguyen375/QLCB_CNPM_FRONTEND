import { fetchAuthLoading, fetchLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setAirports } from './actions'

export async function getAirportsAsync(
  current = 1,
  pageSize = LIMIT,
  params = {},
) {
  const res = await fetchLoading({
    url: ENDPOINTS.getAirports,
    method: 'GET',
    params: {
      current,
      pageSize,
      ...params,
    },
  })
  return res.data
}

export const getAirportAsync = async id => {
  const result = await fetchLoading({
    url: ENDPOINTS.getAirport(id),
    method: 'GET',
  })
  return result.data
}

export const updateAirport = async (data, id) => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.updateAirport(id),
    method: 'PUT',
    data,
  })
  return result.data
}

export async function createAirportAsync(airport = {}) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.createAirport,
    method: 'POST',
    data: airport,
  })
  return res.data
}

export default (dispatch, props) => ({
  getAirports: async (current, pageSize, params) => {
    try {
      const res = await getAirportsAsync(current, pageSize, params)
      dispatch(setAirports(res))
      return { ...res, success: true }
    } catch (err) {
      dispatch(setAirports({}))
      return { ...err, success: false }
    }
  },
})
