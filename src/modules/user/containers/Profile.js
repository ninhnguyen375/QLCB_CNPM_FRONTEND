import { connect } from 'react-redux'
import handlers from '../handlers'
import { MODULE_NAME } from '../models'
import Profile from '../components/Profile'

const mapStateToProps = state => ({
  user: state[MODULE_NAME].user ? state[MODULE_NAME].user || {} : {},
})

const mapDispatchToProps = handlers

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
