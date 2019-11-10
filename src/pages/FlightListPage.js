import React, { Component } from 'react'
import FlightList from '../modules/flight/containers/FlightList'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'

class FlightListPage extends Component {
  render() {
    const { history, match } = this.props

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/flight', icon: 'rocket', title: 'Chuyến Bay' },
          ]}
        />
        <FlightList history={history} match={match}></FlightList>
      </MainLayout>
    )
  }
}

export default withRouter(FlightListPage)
