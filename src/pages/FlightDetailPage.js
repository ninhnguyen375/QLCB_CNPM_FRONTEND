import React, { Component } from 'react'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'
import FlightDetail from '../modules/flight/components/FlightDetail'

class FlightDetailPage extends Component {
  render() {
    const { history, match } = this.props

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/flight', icon: 'rocket', title: 'Chuyến bay' },
            {
              url: this.props.match.url,
              title: 'Thông tin chi tiết',
            },
          ]}
        />
        <FlightDetail history={history} match={match}></FlightDetail>
      </MainLayout>
    )
  }
}

export default withRouter(FlightDetailPage)
