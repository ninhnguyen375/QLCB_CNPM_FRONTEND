import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Layout, Menu, Icon, notification, Dropdown, Tag } from 'antd'
import storeAccessible from '../utils/storeAccessible'
import { clearAll } from '../actions/common'
import { ROLE } from '../../modules/user/models'
import { getUserRole } from '../utils/authUtils'
const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

notification.config({
  placement: 'topRight',
})

const FULL_PAGES = ['/login']

class MenuPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
    this.MENUS = []
    if (
      props.user &&
      props.user.user_type_id === 3 &&
      props.user.jobSeekerOfUser
    ) {
      this.setMenus(props.mode, props.user.jobSeekerOfUser.type)
    } else {
      this.setMenus(props.mode)
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.changePage = this.changePage.bind(this)
  }

  setMenus(mode, type) {
    switch (mode) {
      case ROLE.ADMIN:
        this.MENUS = [
          {
            key: 'admin/dashboard',
            title: (
              <span>
                <Icon type='home' />
                <span>Bảng Điều Khiển</span>
              </span>
            ),
          },
          {
            key: 'admin/user',
            title: (
              <span>
                <Icon type='user' />
                <span>Nhân Viên</span>
              </span>
            ),
          },
          {
            key: 'admin/customer',
            title: (
              <span>
                <Icon type='user' />
                <span>Khách hàng</span>
              </span>
            ),
          },
          {
            key: 'admin/order',
            title: (
              <span>
                <Icon type='unordered-list' />
                <span>Đơn Hàng</span>
              </span>
            ),
          },
          {
            key: 'admin/airport',
            title: (
              <span>
                <Icon type='gold' />
                <span>Sân Bay</span>
              </span>
            ),
          },
          {
            key: 'admin/airline',
            title: (
              <span>
                <Icon type='stock' />
                <span>Hãng Hàng Không</span>
              </span>
            ),
          },
          {
            key: 'admin/luggage',
            title: (
              <span>
                <Icon type='container' />
                <span>Loại Hành Lý</span>
              </span>
            ),
          },
          {
            key: 'admin/ticket-category',
            title: (
              <span>
                <Icon type='credit-card' />
                <span>Loại Vé</span>
              </span>
            ),
          },
          {
            key: 'admin/flight',
            title: (
              <span>
                <Icon type='rocket' style={{ transform: 'rotate(30deg)' }} />
                <span>Chuyến Bay</span>
              </span>
            ),
          },
          {
            key: 'admin/date',
            title: (
              <span>
                <Icon type='calendar' />
                <span>Ngày Bay</span>
              </span>
            ),
          },
          {
            key: 'logout',
            title: (
              <span>
                <Icon type='logout' />
                <span>Đăng xuất</span>
              </span>
            ),
          },
        ]
        break
      case ROLE.STAFF:
        this.MENUS = [
          {
            key: 'admin/dashboard',
            title: (
              <span>
                <Icon type='home' />
                <span>Bảng Điều Khiển</span>
              </span>
            ),
          },
          {
            key: 'admin/customer',
            title: (
              <span>
                <Icon type='user' />
                <span>Khách hàng</span>
              </span>
            ),
          },
          {
            key: 'admin/order',
            title: (
              <span>
                <Icon type='unordered-list' />
                <span>Đơn Hàng</span>
              </span>
            ),
          },
          {
            key: 'admin/airport',
            title: (
              <span>
                <Icon type='gold' />
                <span>Sân Bay</span>
              </span>
            ),
          },
          {
            key: 'admin/airline',
            title: (
              <span>
                <Icon type='stock' />
                <span>Hãng Hàng Không</span>
              </span>
            ),
          },
          {
            key: 'admin/luggage',
            title: (
              <span>
                <Icon type='container' />
                <span>Loại Hành Lý</span>
              </span>
            ),
          },
          {
            key: 'admin/ticket-category',
            title: (
              <span>
                <Icon type='credit-card' />
                <span>Loại Vé</span>
              </span>
            ),
          },
          {
            key: 'admin/flight',
            title: (
              <span>
                <Icon type='rocket' style={{ transform: 'rotate(30deg)' }} />
                <span>Chuyến Bay</span>
              </span>
            ),
          },
          {
            key: 'admin/date',
            title: (
              <span>
                <Icon type='calendar' />
                <span>Ngày Bay</span>
              </span>
            ),
          },
          {
            key: 'logout',
            title: (
              <span>
                <Icon type='logout' />
                <span>Đăng xuất</span>
              </span>
            ),
          },
        ]
        break
      default:
        this.MENUS = [
          {
            key: 'dashboard',
            title: (
              <span>
                <Icon type='home' />
                <span>Dashboard</span>
              </span>
            ),
          },
          {
            key: 'logout',
            title: (
              <span>
                <Icon type='logout' />
                <span>Logout</span>
              </span>
            ),
          },
        ]
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { language, user, mode } = nextProps
    if (language !== this.props.language) {
      if (user && user.user_type_id === 3 && user.jobSeekerOfUser) {
        this.setMenus(mode, user.jobSeekerOfUser.type)
      } else {
        this.setMenus(mode)
      }
    }
  }

  changePage(e) {
    const { history } = this.props
    const item = this.MENUS.find(data => data.key === e.key)
    history.push(item.redirect)
  }

  handleToggle() {
    const { collapsed } = this.state
    this.setState({
      collapsed: !collapsed,
    })
  }

  handleClick(value) {
    const { history } = this.props
    switch (value.key) {
      case 'logout':
        this.handleLogout()
        break
      default:
        history.push(`/${value.key}`)
        break
    }
  }

  handleLogout = () => {
    const { history } = this.props
    storeAccessible.dispatch(clearAll())
    history.push('/')
  }

  render() {
    const { collapsed } = this.state
    const { children, history, userName } = this.props
    const authRole = getUserRole()

    if (FULL_PAGES.includes(history.location.pathname)) {
      return children
    }

    return (
      <Layout className='menu-page' style={{ height: '100vh' }}>
        <Sider
          breakpoint='md'
          collapsedWidth='0'
          onCollapse={this.handleToggle}
          collapsed={collapsed}
          theme='light'
          style={{ boxShadow: '#c3c3c3 1px 74px 28px' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: !collapsed ? 'space-between' : 'center',
              alignItems: 'center',
              height: 55,
              padding: '0px 15px',
              borderBottom: '1px solid #d1d7e2',
            }}
          >
            {!collapsed ? (
              <a href='#/'>
                <img
                  alt='logo'
                  src={require('../../assets/images/logo.png')}
                  height={45}
                />
              </a>
            ) : null}
          </div>
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['admin/dashboard']}
            selectedKeys={[
              'admin/' + this.props.location.pathname.split('/')[2],
            ]}
            theme='light'
            mode='inline'
            style={{
              borderRight: '1px solid #d1d7e2',
              height: 'calc(100% - 55px)',
              overflow: 'auto',
            }}
          >
            {this.MENUS.map(item => {
              if (item.children) {
                return (
                  <SubMenu key={item.key} title={item.title}>
                    {item.children.map(child => {
                      return (
                        <Menu.Item key={child.key}>{child.title}</Menu.Item>
                      )
                    })}
                  </SubMenu>
                )
              }
              return <Menu.Item key={item.key}>{item.title}</Menu.Item>
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: 'white',
              padding: 0,
              paddingLeft: 20,
              paddingRight: 30,
              height: 55,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderBottom: '1px solid #d1d7e2',
              boxShadow: 'rgb(195, 195, 195) -2px 1px 32px',
              minWidth: 260,
            }}
          >
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item>
                    <div className='d-flex' style={{ paddingBottom: 5 }}>
                      <img
                        src={require('../../assets/images/user.svg')}
                        alt='avatar'
                        width={35}
                        style={{ marginRight: 10, paddingTop: 10 }}
                      />
                      <div>
                        <span>{userName || ''}</span>
                        <br />
                        <Tag color='blue'>{authRole}</Tag>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Divider></Menu.Divider>
                  {authRole === ROLE.STAFF && (
                    <Menu.Item onClick={() => history.push(`/admin/profile`)}>
                      <Icon type='user' /> Thông tin cá nhân
                    </Menu.Item>
                  )}
                  <Menu.Item onClick={this.handleLogout}>
                    <Icon type='logout' /> Đăng xuất
                  </Menu.Item>
                </Menu>
              }
            >
              <div className='d-flex align-items-center'>
                <img
                  src={require('../../assets/images/user.svg')}
                  alt='avatar'
                  width={35}
                />
              </div>
            </Dropdown>
          </Header>
          <Content
            style={{
              overflow: 'auto',
              minWidth: '260px',
            }}
          >
            <div className='main-content-margin'>
              {/* {React.cloneElement(this.props.children, { ...this.props })} */}
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default connect(state => {
  return {
    user: state.user.user,
    userName: state.user.user ? state.user.user.email : 'N',
  }
})(withRouter(MenuPage))
