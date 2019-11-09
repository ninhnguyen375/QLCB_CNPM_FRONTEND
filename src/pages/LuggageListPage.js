import React, { Component } from 'react'
import LuggageList from '../modules/luggage/containers/LuggageList'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'

class LuggageListPage extends Component {
  render() {
    const { history, match } = this.props

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/luggage', icon: 'container', title: 'Loại Hành Lý' },
          ]}
        />
        <LuggageList history={history} match={match}></LuggageList>
      </MainLayout>
    )
  }
}

export default withRouter(LuggageListPage)
