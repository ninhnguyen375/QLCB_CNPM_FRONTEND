import { connect } from 'react-redux'
import AirlineList from '../components/AirlineList'
import handlers from '../handlers'
import { MODULE_NAME } from '../models'

const mapStateToProps = state => ({
  airlines: state[MODULE_NAME].airlines
    ? state[MODULE_NAME].airlines.data || []
    : [],
})

const mapDispatchToProps = handlers

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AirlineList)
