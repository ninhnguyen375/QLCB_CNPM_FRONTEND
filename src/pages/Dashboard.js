import React, { Component } from 'react'
import UnderContruct from './UnderContruct'
import MainLayout from '../common/hocs/MainLayout'

class Dashboard extends Component {
  render() {
    return (
      <MainLayout mode={this.props.mode}>
        <div>
          <UnderContruct />
        </div>
      </MainLayout>
    )
  }
}

export default Dashboard
