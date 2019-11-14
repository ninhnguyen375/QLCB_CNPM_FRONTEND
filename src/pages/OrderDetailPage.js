import React, { Component } from 'react'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'
import OrderDetail from '../modules/order/components/OrderDetail'

class OrderDetailPage extends Component {
  render() {
    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/order', icon: 'bars', title: 'Đơn Hàng' },
            {
              url: this.props.match.url,
              title: 'Thông tin chi tiết',
            },
          ]}
        />
        <OrderDetail />
      </MainLayout>
    )
  }
}

export default withRouter(OrderDetailPage)
