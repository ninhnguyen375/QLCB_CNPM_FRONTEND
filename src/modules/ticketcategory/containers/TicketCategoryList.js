import { connect } from 'react-redux'
import TicketCategoryList from '../components/TicketCategoryList'
import handlers from '../handlers'
import { MODULE_NAME } from '../models'

const mapStateToProps = state => ({
  ticketCategories: state[MODULE_NAME].ticketCategories
    ? state[MODULE_NAME].ticketCategories.data || []
    : [],
})

const mapDispatchToProps = handlers

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketCategoryList)
