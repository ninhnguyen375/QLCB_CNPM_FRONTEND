// MODULE NAMES
import { MODULE_NAME as MODULE_USER } from './user/models'
import { MODULE_NAME as MODULE_AIRPORT } from './airport/models'
import { MODULE_NAME as MODULE_FRONT } from './frontpage/models'
// MODULE REDUCERS
import userReducers from './user/reducers'
import airportReducers from './airport/reducers'
import frontReducers from './frontpage/reducers'

export const MODULE_REDUCERS = {
  [MODULE_USER]: userReducers,
  [MODULE_AIRPORT]: airportReducers,
  [MODULE_FRONT]: frontReducers,
}
