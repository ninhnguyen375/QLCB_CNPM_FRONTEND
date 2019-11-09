import { connect } from 'react-redux'
import LuggageList from '../components/LuggageList'
import handlers from '../handlers'
import { MODULE_NAME } from '../models'

const mapStateToProps = state => ({
  luggages: state[MODULE_NAME].luggages
    ? state[MODULE_NAME].luggages.data || []
    : [],
})

const mapDispatchToProps = handlers

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LuggageList)
