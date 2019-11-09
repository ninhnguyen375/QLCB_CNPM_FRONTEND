import { MODULE_NAME } from '../../modules/user/models'
import storeAccessible from './storeAccessible'

export const getUserRole = () => {
  const user = storeAccessible.getState(MODULE_NAME)

  return user && user.user ? user.user.role : null
}
