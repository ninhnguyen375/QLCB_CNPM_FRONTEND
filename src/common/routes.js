import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import UnderContruct from '../pages/UnderContruct'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import Dashboard from '../pages/Dashboard'
import PageNotFound from '../pages/PageNotFound'
import ScrollToTop from './hocs/ScrollToTop'
import SearchFlight from '../modules/frontpage/containers/SearchFlight'
import { ROLE } from '../modules/user/models'
import UserListPage from '../pages/UserListPage'
import UserDetailPage from '../pages/UserDetailPage'
import AirportListPage from '../pages/AirportListPage'
import AirlineListPage from '../pages/AirlineListPage'
import LuggageListPage from '../pages/LuggageListPage'
import TicketCategoryListPage from '../pages/TicketCategoryListPage'
import FlightListPage from '../pages/FlightListPage'

export default class Routes extends Component {
  render() {
    const { store } = this.props
    const { user } = store.getState()
    console.log('DEBUGER: user', user)

    if (!user || !user.user || !user.user.id) {
      return (
        <ScrollToTop>
          <Switch>
            <Route key='home' path='/' exact component={HomePage} />
            <Route
              key='search-flight'
              path='/search-flight'
              exact
              component={SearchFlight}
            />
            <Route key='login' path='/login' exact component={LoginPage} />
            <Route key='null' path='*' component={PageNotFound} />
          </Switch>
        </ScrollToTop>
      )
    }
    if (user.user.role === ROLE.ADMIN) {
      return (
        <ScrollToTop>
          <Switch>
            <Route key='home' path='/' exact component={HomePage} />
            <Route
              key='search-flight'
              path='/search-flight'
              exact
              component={SearchFlight}
            />
            <Route key='dashboard' path='/admin/dashboard' exact>
              <Dashboard mode={user.user.role} />
            </Route>
            <Route key='user' path='/admin/user' exact>
              <UserListPage mode={user.user.role} />
            </Route>
            <Route key='order' path='/admin/order' exact>
              <UserListPage mode={user.user.role} />
            </Route>
            <Route key='airport' path='/admin/airport' exact>
              <AirportListPage mode={user.user.role} />
            </Route>
            <Route key='airline' path='/admin/airline' exact>
              <AirlineListPage mode={user.user.role} />
            </Route>
            <Route key='luggage' path='/admin/luggage' exact>
              <LuggageListPage mode={user.user.role} />
            </Route>
            <Route key='ticket-category' path='/admin/ticket-category' exact>
              <TicketCategoryListPage mode={user.user.role} />
            </Route>
            <Route key='flight' path='/admin/flight' exact>
              <FlightListPage mode={user.user.role} />
            </Route>
            <Route key='date' path='/admin/date' exact>
              <UserListPage mode={user.user.role} />
            </Route>
            <Route key='user' path='/admin/user/:id' exact>
              <UserDetailPage mode={user.user.role} />
            </Route>
            <Route key='null' path='*' component={PageNotFound} />
          </Switch>
        </ScrollToTop>
      )
    }
    if (user.user.role === ROLE.STAFF) {
      return (
        <ScrollToTop>
          <Switch>
            <Route key='home' path='/' exact component={HomePage} />
            <Route
              key='search-flight'
              path='/search-flight'
              exact
              component={SearchFlight}
            />
            <Route key='dashboard' path='/admin/dashboard' exact>
              <Dashboard mode={user.user.role} />
            </Route>
            <Route key='null' path='*' component={PageNotFound} />
          </Switch>
        </ScrollToTop>
      )
    }

    return (
      <ScrollToTop>
        <Switch>
          <Route key='home' path='/' exact component={HomePage} />
          <Route
            key='search-flight'
            path='/search-flight'
            exact
            component={SearchFlight}
          />
          <Route key='null' path='*' component={PageNotFound} />
        </Switch>
      </ScrollToTop>
    )
  }
}
