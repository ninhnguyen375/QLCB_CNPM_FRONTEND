import { connect } from 'react-redux'
import FlightList from '../components/FlightList'
import handlers from '../handlers'
import { MODULE_NAME } from '../models'

const mapStateToProps = state => ({
  flights: state[MODULE_NAME].flights
    ? state[MODULE_NAME].flights.data || []
    : [],
})

const mapDispatchToProps = handlers

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightList)
