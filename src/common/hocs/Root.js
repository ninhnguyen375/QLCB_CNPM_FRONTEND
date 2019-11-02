import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import MainPage from './MainPage'

class Root extends Component {
  render () {
    const { store, persistor, history } = this.props
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainPage
            store={store}
            history={history}
            persistor={persistor}
          />
        </PersistGate>
      </Provider>
    )
  }
}

export default Root
