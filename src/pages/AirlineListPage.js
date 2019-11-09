import React, { Component } from 'react'
import AirlineList from '../modules/airline/containers/AirlineList'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'

class AirlineListPage extends Component {
  render() {
    const { history, match } = this.props

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/airline', icon: 'gold', title: 'Sân Bay' },
          ]}
        />
        <AirlineList history={history} match={match}></AirlineList>
      </MainLayout>
    )
  }
}

export default withRouter(AirlineListPage)
