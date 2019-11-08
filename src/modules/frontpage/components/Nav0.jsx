import React from 'react'
import { Menu, notification } from 'antd'
import { getChildrenToRender } from './utils'
import { logout } from '../../../common/effects'
import TweenOne from 'rc-tween-one'
import { enquireScreen } from 'enquire-js'

const { Item } = Menu

let isMobile
enquireScreen(b => {
  isMobile = b
})
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneOpen: undefined,
      isMobile,
    }
    this.phoneClick = this.phoneClick.bind(this)
    this.dataSource = {
      wrapper: { className: 'header0 home-page-wrapper' },
      page: { className: 'home-page' },
      logo: {
        className: 'header0-logo',
        children: require('../../../assets/images/logo.png'),
      },
      Menu: {
        className: 'header0-menu',
        children: [
          {
            name: 'item1',
            className: 'header0-item',
            visible: 'UNSIGNINED',
            children: {
              href: '#/login',
              children: [{ children: 'ĐĂNG NHẬP', name: 'text' }],
            },
          },
          {
            name: 'item4',
            className: 'header0-item',
            visible: 'SIGNINED',
            children: {
              href: '#/',
              children: [{ children: 'ĐĂNG XUẤT', name: 'text' }],
            },
            onClick: () => {
              logout()
              notification.success({ message: 'Tạm biệt!' })
            },
          },
          {
            name: 'item3',
            className: 'header0-item',
            visible: 'SIGNINED',
            children: {
              href: '#/admin/dashboard',
              children: [{ children: 'TRANG QUẢN TRỊ', name: 'text' }],
            },
          },
        ],
      },
      mobileMenu: { className: 'header0-mobile-menu' },
    }
  }

  componentDidMount() {
    enquireScreen(b => {
      this.setState({ isMobile: !!b })
    })
  }

  phoneClick() {
    const phoneOpen = !this.state.phoneOpen
    this.setState({
      phoneOpen,
    })
  }

  render() {
    const { user } = this.props
    const { isMobile } = this.state
    const visibleCode = user && user.id ? 'SIGNINED' : 'UNSIGNINED'
    const { phoneOpen } = this.state
    const navData = this.dataSource.Menu.children
    const navChildren = navData.map(item => {
      const { children: a, visible, ...itemProps } = item
      if (visible === visibleCode || visible === 'ALL') {
        return (
          <Item key={item.name} {...itemProps}>
            <a {...a} className={`header0-item-block ${a.className}`.trim()}>
              {a.children.map(getChildrenToRender)}
            </a>
          </Item>
        )
      }
      return null
    })

    const moment = phoneOpen === undefined ? 300 : null
    return (
      <TweenOne component='header' {...this.dataSource.wrapper}>
        <div
          {...this.dataSource.page}
          className={`${this.dataSource.page.className}${
            phoneOpen ? ' open' : ''
          }`}
        >
          <a href='#/'>
            <div {...this.dataSource.logo}>
              <img width='100%' src={this.dataSource.logo.children} alt='img' />
            </div>
          </a>
          {isMobile && (
            <div
              {...this.dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick()
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...this.dataSource.Menu}
            animation={
              isMobile
                ? {
                    height: 0,
                    duration: 300,
                    onComplete: e => {
                      if (this.state.phoneOpen) {
                        e.target.style.height = 'auto'
                      }
                    },
                    ease: 'easeInOutQuad',
                  }
                : null
            }
            moment={moment}
            reverse={!!phoneOpen}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={['sub0']}
              theme='dark'
            >
              {visibleCode === 'SIGNINED' && (
                <Item key='user-avatar'>
                  <a
                    className='header0-item-block header0-item'
                    href='#dashboard'
                  >
                    <img
                      src={require('../../../assets/images/user.svg')}
                      alt='avatar'
                      width={35}
                    />
                    <span style={{ marginLeft: 10 }}>{user.email || ''}</span>
                  </a>
                </Item>
              )}
              {navChildren}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    )
  }
}

export default Header
