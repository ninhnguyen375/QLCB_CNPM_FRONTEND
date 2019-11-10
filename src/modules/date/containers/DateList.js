import { connect } from 'react-redux'
import DateList from '../components/DateList'
import handlers from '../handlers'
import { MODULE_NAME } from '../models'

const mapStateToProps = state => ({
  dates: state[MODULE_NAME].dates ? state[MODULE_NAME].dates.data || [] : [],
})

const mapDispatchToProps = handlers

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DateList)
