import { fetchAuthLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setOrders } from './actions'

export async function getOrdersAsync(
  current = 1,
  pageSize = LIMIT,
  params = {},
) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.getOrders,
    method: 'GET',
    params: {
      current,
      pageSize,
      ...params,
    },
  })
  return res.data
}

export const getOrderAsync = async id => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.getOrder(id),
    method: 'GET',
  })
  return result.data
}

export const updateOrder = async (data, id) => {
  const result = await fetchAuthLoading({
    url: ENDPOINTS.updateOrder(id),
    method: 'PUT',
    data,
  })
  return result.data
}

export async function createOrderAsync(order = {}) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.createOrder,
    method: 'POST',
    data: order,
  })
  return res.data
}

export default (dispatch, props) => ({
  getOrders: async (current, pageSize, params) => {
    try {
      const res = await getOrdersAsync(current, pageSize, params)
      dispatch(setOrders(res))
      return { ...res, success: true }
    } catch (err) {
      dispatch(setOrders({}))
      return { ...err, success: false }
    }
  },
})
