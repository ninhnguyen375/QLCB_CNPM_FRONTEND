import React, { Component } from 'react'
import CustomerList from '../modules/customer/containers/CustomerList'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'

class CustomerListPage extends Component {
  render() {
    const { history, match } = this.props

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/customer', icon: 'user', title: 'Khách hàng' },
          ]}
        />
        <CustomerList history={history} match={match}></CustomerList>
      </MainLayout>
    )
  }
}

export default withRouter(CustomerListPage)
