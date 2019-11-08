import { connect } from 'react-redux'
import UserList from '../components/UserList'
import handlers from '../handlers'
import { MODULE_NAME } from '../models'

const mapStateToProps = state => ({
  users: state[MODULE_NAME].users ? state[MODULE_NAME].users.data || [] : [],
})

const mapDispatchToProps = handlers

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList)
