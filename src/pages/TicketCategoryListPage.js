import React, { Component } from 'react'
import TicketCategoryList from '../modules/ticketcategory/containers/TicketCategoryList'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'

class TicketCategoryListPage extends Component {
  render() {
    const { history, match } = this.props

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            {
              url: '/admin/ticket-category',
              icon: 'credit-card',
              title: 'Loại Vé',
            },
          ]}
        />
        <TicketCategoryList
          history={history}
          match={match}
        ></TicketCategoryList>
      </MainLayout>
    )
  }
}

export default withRouter(TicketCategoryListPage)
