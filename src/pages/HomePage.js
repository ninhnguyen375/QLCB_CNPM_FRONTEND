import React, { Component } from 'react'
import Home from '../modules/frontpage/components/Home'

class HomePage extends Component {
  render() {
    const { history } = this.props
    return (
      <div>
        <Home history={history} />
      </div>
    )
  }
}
export default HomePage
