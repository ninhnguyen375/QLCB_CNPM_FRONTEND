import React from 'react'
import { enquireScreen } from 'enquire-js'

import Nav0 from '../containers/Nav0'
import Banner from './Banner'
import Content0 from './Content0'
import Content5 from './Content5'
import Footer1 from './Footer1'

import './less/antMotionStyle.less'
import { BackTop } from 'antd'

let isMobile
enquireScreen(b => {
  isMobile = b
})

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile,
    }
  }

  componentDidMount() {
    enquireScreen(b => {
      this.setState({ isMobile: !!b })
    })
  }

  render() {
    console.log(this.props)
    const children = [
      <Nav0 id='Nav0_0' key='Nav0_0' />,
      <Banner id='Banner0_1' key='Banner0_1' history={this.props.history} />,
      <Content5
        id='Content5_0'
        key='Content5_0'
        isMobile={this.state.isMobile}
      />,
      <Content0
        id='Content0_0'
        key='Content0_0'
        isMobile={this.state.isMobile}
      />,
      <Footer1 id='Footer1_0' key='Footer1_0' isMobile={this.state.isMobile} />,
    ]
    return (
      <div
        className='templates-wrapper'
        ref={d => {
          this.dom = d
        }}
      >
        {children}
        <BackTop />
      </div>
    )
  }
}
