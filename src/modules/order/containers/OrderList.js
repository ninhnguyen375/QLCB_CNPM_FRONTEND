import { connect } from 'react-redux'
import OrderList from '../components/OrderList'
import handlers from '../handlers'
import { MODULE_NAME } from '../models'

const mapStateToProps = state => ({
  orders: state[MODULE_NAME].orders ? state[MODULE_NAME].orders.data || [] : [],
})

const mapDispatchToProps = handlers

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderList)
