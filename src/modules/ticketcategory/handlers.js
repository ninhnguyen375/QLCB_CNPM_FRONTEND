import { fetchAuthLoading, fetchLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setTicketCategories } from './actions'

export async function getTicketCategoriesAsync(
  current = 1,
  pageSize = LIMIT,
  params = {},
) {
  const res = await fetchLoading({
    url: ENDPOINTS.getTicketCategories,
    method: 'GET',
    params: {
      current,
      pageSize,
      ...params,
    },
  })
  return res.data
}

export const getTicketCategoryAsync = async id => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.getTicketCategory(id),
    method: 'GET',
  })
  return result.data
}

export const updateTicketCategory = async (data, id) => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.updateTicketCategory(id),
    method: 'PUT',
    data,
  })
  return result.data
}

export async function createTicketCategoryAsync(ticketCategory = {}) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.createTicketCategory,
    method: 'POST',
    data: ticketCategory,
  })
  return res.data
}

export default (dispatch, props) => ({
  getTicketCategories: async (current, pageSize, params) => {
    try {
      const res = await getTicketCategoriesAsync(current, pageSize, params)
      dispatch(setTicketCategories(res))
      return { ...res, success: true }
    } catch (err) {
      dispatch(setTicketCategories({}))
      return { ...err, success: false }
    }
  },
  deleteTicketCategory: async id => {
    const res = await fetchAuthLoading({
      url: ENDPOINTS.deleteTicketCategory(id),
      method: 'DELETE',
    })
    return res.data
  },
})
