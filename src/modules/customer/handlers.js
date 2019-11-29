import { fetchAuthLoading, fetchLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setCustomers } from './actions'

export async function getCustomersAsync(
  current = 1,
  pageSize = LIMIT,
  params = {},
) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.getCustomers,
    method: 'GET',
    params: {
      current,
      pageSize,
      ...params,
    },
  })
  return res.data
}

export const getCustomerAsync = async id => {
  const result = await fetchLoading({
    url: ENDPOINTS.getCustomer(id),
    method: 'GET',
  })
  return result.data
}

export const updateCustomer = async (data, id) => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.updateCustomer(id),
    method: 'PUT',
    data: { id, ...data },
  })
  return result.data
}

export async function createCustomerAsync(customer = {}) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.createCustomer,
    method: 'POST',
    data: customer,
  })
  return res.data
}

export default (dispatch, props) => ({
  getCustomers: async (current, pageSize, params) => {
    try {
      const res = await getCustomersAsync(current, pageSize, params)
      dispatch(setCustomers(res))
      return { ...res, success: true }
    } catch (err) {
      dispatch(setCustomers({}))
      return { ...err, success: false }
    }
  },
})
