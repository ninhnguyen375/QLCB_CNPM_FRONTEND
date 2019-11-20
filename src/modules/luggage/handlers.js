import { fetchAuthLoading, fetchLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setLuggages } from './actions'

export async function getLuggagesAsync(
  current = 1,
  pageSize = LIMIT,
  params = {},
) {
  const res = await fetchLoading({
    url: ENDPOINTS.getLuggages,
    method: 'GET',
    params: {
      current,
      pageSize,
      ...params,
    },
  })
  return res.data
}

export const getLuggageAsync = async id => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.getLuggage(id),
    method: 'GET',
  })
  return result.data
}

export const updateLuggage = async (data, id) => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.updateLuggage(id),
    method: 'PUT',
    data: { id, ...data },
  })
  return result.data
}

export async function createLuggageAsync(luggage = {}) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.createLuggage,
    method: 'POST',
    data: luggage,
  })
  return res.data
}

export default (dispatch, props) => ({
  getLuggages: async (current, pageSize, params) => {
    try {
      const res = await getLuggagesAsync(current, pageSize, params)
      dispatch(setLuggages(res))
      return { ...res, success: true }
    } catch (err) {
      dispatch(setLuggages({}))
      return { ...err, success: false }
    }
  },
  deleteLuggage: async id => {
    const res = await fetchAuthLoading({
      url: ENDPOINTS.deleteLuggage(id),
      method: 'DELETE',
    })
    return res.data
  },
})
