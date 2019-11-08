import React, { Component } from 'react'
import UserList from '../modules/user/containers/UserList'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'

class UserListPage extends Component {
  render() {
    const { history, match } = this.props

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/user', icon: 'user', title: 'Nhân Viên' },
          ]}
        />
        <UserList history={history} match={match}></UserList>
      </MainLayout>
    )
  }
}

export default withRouter(UserListPage)
