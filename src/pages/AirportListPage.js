import React, { Component } from 'react'
import AirportList from '../modules/airport/containers/AirportList'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'

class AirportListPage extends Component {
  render() {
    const { history, match } = this.props

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/airport', icon: 'gold', title: 'Sân Bay' },
          ]}
        />
        <AirportList history={history} match={match}></AirportList>
      </MainLayout>
    )
  }
}

export default withRouter(AirportListPage)
