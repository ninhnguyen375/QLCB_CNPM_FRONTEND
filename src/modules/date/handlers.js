import { fetchAuthLoading, fetchLoading } from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import { setDates } from './actions'
import moment from 'moment'

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

export async function searchFlightFromDate(data = {}) {
  const params = {
    airportFrom: data.airportFrom,
    airportTo: data.airportTo,
    departureDate: data.departureDate,
    returnDate: data.returnDate,
    ticketCategories: data.ticketCategories,
  }

  // format to valid Date
  params.departureDate = moment(params.departureDate)
    .format('YYYY-MM-DD')
    .toString()

  params.returnDate
    ? (params.returnDate = params.returnDate = moment(params.returnDate)
        .format('YYYY-MM-DD')
        .toString())
    : delete params.returnDate

  const res = await fetchLoading({
    url: ENDPOINTS.searchFlightFromDate,
    method: 'GET',
    params: params,
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
    data: {
      id,
      departureDate: moment(data.departureDate)
        .format('YYYY-MM-DD')
        .toString(),
    },
  })
  return result.data
}

export async function createDateAsync(date) {
  const res = await fetchAuthLoading({
    url: ENDPOINTS.createDate,
    method: 'POST',
    data: {
      departureDate: moment(date.departureDate)
        .format('YYYY-MM-DD')
        .toString(),
    },
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
  addFlightsToDate: async (id, flightIds) => {
    if (!flightIds || !Array.isArray(flightIds)) {
      throw new Error('Invalide flightIds')
    }

    if (flightIds.length === 0) return

    const res = await fetchAuthLoading({
      url: ENDPOINTS.addFlightsToDate(id),
      method: 'POST',
      data: { dateFlights: flightIds.map(id => ({ flightId: id })) },
    })
    return res.data
  },
  removeFlightFromDate: async (id, flightId) => {
    if (!flightId) {
      throw new Error('Missing params id or flightId')
    }

    const res = await fetchAuthLoading({
      url: ENDPOINTS.removeFlightFromDate(id),
      method: 'DELETE',
      data: { flightId: flightId },
    })
    return res.data
  },
  deleteDate: async id => {
    const res = await fetchAuthLoading({
      url: ENDPOINTS.deleteDate(id),
      method: 'DELETE',
    })
    return res.data
  },
})
