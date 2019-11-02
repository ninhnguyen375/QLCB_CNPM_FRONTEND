import { connect } from 'react-redux'
import SearchFlightForm from '../components/SearchFlightForm'
import handlers from '../handlers'
import { MODULE_NAME as MODULE_FRONT } from '../models'

const mapStateToProps = state => ({
  searchFlightParams: state[MODULE_FRONT].searchFlightParams || {},
})

const mapDispatchToProps = (dispatch, props) => handlers(dispatch, props)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchFlightForm)
