import React, { Component } from 'react'
import DateList from '../modules/date/containers/DateList'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'

class DateListPage extends Component {
  render() {
    const { history, match } = this.props

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            {
              url: '/admin/date',
              icon: 'calendar',
              title: 'Ngày Bay',
            },
          ]}
        />
        <DateList history={history} match={match}></DateList>
      </MainLayout>
    )
  }
}

export default withRouter(DateListPage)
