// MODULE NAMES
import { MODULE_NAME as MODULE_USER } from './user/models'
import { MODULE_NAME as MODULE_AIRPORT } from './airport/models'
import { MODULE_NAME as MODULE_AIRLINE } from './airline/models'
import { MODULE_NAME as MODULE_LUGGAGE } from './luggage/models'
import { MODULE_NAME as MODULE_FLIGHT } from './flight/models'
import { MODULE_NAME as MODULE_TICKETCATEGORY } from './ticketcategory/models'
import { MODULE_NAME as MODULE_FRONT } from './frontpage/models'
// MODULE REDUCERS
import userReducers from './user/reducers'
import airportReducers from './airport/reducers'
import airlineReducers from './airline/reducers'
import luggageReducers from './luggage/reducers'
import flightReducers from './flight/reducers'
import ticketCategoryReducers from './ticketcategory/reducers'
import frontReducers from './frontpage/reducers'

export const MODULE_REDUCERS = {
  [MODULE_USER]: userReducers,
  [MODULE_AIRPORT]: airportReducers,
  [MODULE_FRONT]: frontReducers,
  [MODULE_AIRLINE]: airlineReducers,
  [MODULE_LUGGAGE]: luggageReducers,
  [MODULE_FLIGHT]: flightReducers,
  [MODULE_TICKETCATEGORY]: ticketCategoryReducers,
}
