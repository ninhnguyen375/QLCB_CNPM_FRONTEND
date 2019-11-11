import { connect } from 'react-redux'
import CustomerList from '../components/CustomerList'
import handlers from '../handlers'
import { MODULE_NAME } from '../models'

const mapStateToProps = state => ({
  customers: state[MODULE_NAME].customers
    ? state[MODULE_NAME].customers.data || []
    : [],
})

const mapDispatchToProps = handlers

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerList)
