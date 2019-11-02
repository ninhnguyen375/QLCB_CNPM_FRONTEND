import { connect } from 'react-redux'
import Nav0 from '../components/Nav0'
import { MODULE_NAME as MODULE_USER } from '../../user/models'

const mapStateToProps = (state, props) => {
  // TODO: Only map something usefull
  return {
    user: state[MODULE_USER].user || {}
  }
}

export default connect(mapStateToProps)(Nav0)
