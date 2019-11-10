import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setDates } from './actions'

export async function getDatesAsync(
  current = 1,
  pageSize = LIMIT,
  params = {},
) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.getDates,
    method: 'GET',
    params: {
      current,
      pageSize,
      ...params,
    },
  })
  return res.data
}

export const getDateAsync = async id => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.getDate(id),
    method: 'GET',
  })
  return result.data
}

export const updateDate = async (data, id) => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.updateDate(id),
    method: 'PUT',
    data,
  })
  return result.data
}

export async function createDateAsync(date = {}) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.createDate,
    method: 'POST',
    data: date,
  })
  return res.data
}

export default (dispatch, props) => ({
  getDates: async (current, pageSize, params) => {
    try {
      const res = await getDatesAsync(current, pageSize, params)
      dispatch(setDates(res))
      return { ...res, success: true }
    } catch (err) {
      dispatch(setDates({}))
      return { ...err, success: false }
    }
  },
})
