import axios from 'axios'
import { TIMEOUT } from './models'
import { loadEnd } from './actions/session'
import { clearAll } from './actions/common'
import storeAccessible from './utils/storeAccessible'
import { MODULE_NAME as MODULE_USER } from '../modules/user/models'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

export async function loading(fetchingProcess, done = undefined) {
  nprogress.start()
  try {
    const ret = await fetchingProcess()
    storeAccessible.dispatch(loadEnd({ config: { key: 'loading' } }))
    if (done) {
      await done()
    }
    nprogress.done()
    return ret
  } catch (error) {
    nprogress.done()
    console.error('ERROR', error)
    throw error
  }
}

export async function loadingProcess(fetchingProcess, done = undefined) {
  nprogress.start()
  try {
    const ret = await fetchingProcess()
    nprogress.done()
    if (done) {
      await done()
    }
    return ret
  } catch (error) {
    nprogress.done()
    console.error('ERROR', error)
    throw error
  }
}

export function fetch({ url, headers, ...options }) {
  return axios({
    method: 'GET',
    timeout: TIMEOUT,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...options,
  })
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

export function fetchLoading({ url, headers, ...options }) {
  nprogress.start()
  return axios({
    method: 'get',
    timeout: TIMEOUT,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...options,
  })
    .then(response => {
      nprogress.done()
      return response
    })
    .catch(err => {
      nprogress.done()
      throw err
    })
}

export function fetchAuth({ url, headers, ...options }) {
  const user = storeAccessible.getState(MODULE_USER)
  if (!user || !user.token) {
    throw new Error('MISSING_USER_TOKEN')
  }
  return axios({
    method: 'GET',
    timeout: TIMEOUT,
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
      ...headers,
    },
    ...options,
  })
    .then(response => {
      return response
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        logout()
      }
      throw error
    })
}

export function fetchAuthLoading({ url, headers, ...options }) {
  const user = storeAccessible.getState(MODULE_USER)
  if (!user || !user.token) {
    throw new Error('MISSING_USER_TOKEN')
  }
  nprogress.start()
  return axios({
    method: 'get',
    timeout: TIMEOUT,
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
      ...headers,
    },
    ...options,
  })
    .then(response => {
      nprogress.done()
      return response
    })
    .catch(error => {
      nprogress.done()
      if (error.response && error.response.status === 401) {
        logout()
      }
      throw error
    })
}

export function logout() {
  storeAccessible.dispatch(clearAll())
}
