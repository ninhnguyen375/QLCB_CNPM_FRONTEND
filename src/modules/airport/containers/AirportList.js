import { connect } from 'react-redux'
import AirportList from '../components/AirportList'
import handlers from '../handlers'
import { MODULE_NAME } from '../models'

const mapStateToProps = state => ({
  airports: state[MODULE_NAME].airports
    ? state[MODULE_NAME].airports.data || []
    : [],
})

const mapDispatchToProps = handlers

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AirportList)
