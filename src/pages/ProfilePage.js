import React, { Component } from 'react'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'
import Profile from '../modules/user/containers/Profile'

class UserDetailPage extends Component {
  render() {
    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            {
              url: this.props.match.url,
              icon: 'user',
              title: 'Thông tin cá nhân',
            },
          ]}
        />
        <Profile />
      </MainLayout>
    )
  }
}

export default withRouter(UserDetailPage)
