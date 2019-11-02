import { setSearchFlightParams } from './actions'

export default (dispatch, props) => ({
  setSearchFlightParams: (values = {}) => {
    dispatch(setSearchFlightParams(values))
  },
})
