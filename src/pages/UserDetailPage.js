import React, { Component } from 'react'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'
import UserDetail from '../modules/user/components/UserDetail'

class UserDetailPage extends Component {
  render() {
    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/user', icon: 'user', title: 'Nhân Viên' },
            {
              url: this.props.match.url,
              icon: 'user',
              title: 'Thông tin chi tiết',
            },
          ]}
        />
        <UserDetail />
      </MainLayout>
    )
  }
}

export default withRouter(UserDetailPage)
