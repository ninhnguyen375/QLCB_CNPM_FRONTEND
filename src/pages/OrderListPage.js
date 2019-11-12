import React, { Component } from 'react'
import OrderList from '../modules/order/containers/OrderList'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'

class OrderListPage extends Component {
  render() {
    const { history, match } = this.props

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/order', icon: 'idcard', title: 'Đơn Hàng' },
          ]}
        />
        <OrderList history={history} match={match}></OrderList>
      </MainLayout>
    )
  }
}

export default withRouter(OrderListPage)
