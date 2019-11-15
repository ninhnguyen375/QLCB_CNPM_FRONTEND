import { fetchAuthLoading, fetchLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setFlights } from './actions'

export async function getFlightsAsync(
  current = 1,
  pageSize = LIMIT,
  params = {},
) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.getFlights,
    method: 'GET',
    params: {
      current,
      pageSize,
      ...params,
    },
  })
  return res.data
}

export const getFlightAsync = async id => {
  const result = await fetchLoading({
    url: ENDPOINTS.getFlight(id),
    method: 'GET',
  })
  return result.data
}

export const updateFlight = async (data, id) => {
  const { startTime, flightTime } = data
  if (!startTime || !flightTime) {
    throw new Error('ERR001: Invalid input values')
  }

  const values = {
    ...data,
    startTime: startTime.hour() * 60 + startTime.minute(),
    flightTime: flightTime.hour() * 60 + flightTime.minute(),
  }
  const result = await fetchAuthLoading({
    url: ENDPOINTS.updateFlight(id),
    method: 'PUT',
    data: values,
  })
  return result.data
}

export async function createFlightAsync(flight = {}) {
  let { startTime, flightTime, ticketCategoriesOfFlight } = flight
  if (!startTime || !flightTime) {
    throw new Error('ERR001: Invalid input values')
  }
  ticketCategoriesOfFlight = Array.isArray(ticketCategoriesOfFlight)
    ? ticketCategoriesOfFlight.map(t => {
        delete t.done
        return t
      })
    : undefined

  let data = {
    ...flight,
    startTime: startTime.hour() * 60 + startTime.minute(),
    flightTime: flightTime.hour() * 60 + flightTime.minute(),
  }

  data = ticketCategoriesOfFlight ? { ...data, ticketCategoriesOfFlight } : data

  const res = await fetchAuthLoading({
    url: ENDPOINTS.createFlight,
    method: 'POST',
    data,
  })
  return res.data
}

export default (dispatch, props) => ({
  getFlights: async (current, pageSize, params) => {
    try {
      const res = await getFlightsAsync(current, pageSize, params)
      dispatch(setFlights(res))
      return { ...res, success: true }
    } catch (err) {
      dispatch(setFlights({}))
      return { ...err, success: false }
    }
  },
})
