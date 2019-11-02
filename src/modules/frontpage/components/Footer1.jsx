import React from 'react'
import TweenOne from 'rc-tween-one'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import QueueAnim from 'rc-queue-anim'
import { Row, Col } from 'antd'
import { getChildrenToRender, isImg } from './utils'

class Footer extends React.Component {
  dataSource = {
    wrapper: { className: 'home-page-wrapper footer1-wrapper' },
    OverPack: { className: 'footer1', playScale: 0.2 },
    block: {
      className: 'home-page',
      gutter: 0,
      children: [
        {
          name: 'block0',
          xs: 24,
          md: 6,
          className: 'block',
          title: {
            className: 'logo',
            children: (
              <img
                src={require('../../../assets/images/logo.png')}
                alt='logo'
                width={150}
              />
            ),
          },
          childWrapper: {
            className: 'slogan',
            children: [
              {
                name: 'content0',
                children:
                  'Animation specification and components of Ant Design.',
              },
            ],
          },
        },
        {
          name: 'block1',
          xs: 24,
          md: 6,
          className: 'block',
          title: { children: 'product' },
          childWrapper: {
            children: [
              { name: 'link0', href: '#', children: 'product' },
              { name: 'link1', href: '#', children: 'product' },
              { name: 'link2', href: '#', children: 'product' },
              { name: 'link3', href: '#', children: 'product' },
            ],
          },
        },
        {
          name: 'block2',
          xs: 24,
          md: 6,
          className: 'block',
          title: { children: 'product' },
          childWrapper: {
            children: [
              { href: '#', name: 'link0', children: 'FAQ' },
              { href: '#', name: 'link1', children: 'product' },
            ],
          },
        },
        {
          name: 'block3',
          xs: 24,
          md: 6,
          className: 'block',
          title: { children: 'product' },
          childWrapper: {
            children: [
              { href: '#', name: 'link0', children: 'product' },
              { href: '#', name: 'link1', children: 'product' },
            ],
          },
        },
      ],
    },
    copyrightWrapper: { className: 'copyright-wrapper' },
    copyrightPage: { className: 'home-page' },
    copyright: {
      className: 'copyright',
      children: (
        <>
          <span>©2019 by Flynow&nbsp;All Rights Reserved</span>
        </>
      ),
    },
  }
  getLiChildren(data) {
    return data.map((item, i) => {
      const { title, childWrapper, ...itemProps } = item
      return (
        <Col key={i.toString()} {...itemProps} title={null} content={null}>
          <h2 {...title}>
            {typeof title.children === 'string' &&
            title.children.match(isImg) ? (
              <img src={title.children} width='100%' alt='img' />
            ) : (
              title.children
            )}
          </h2>
          <div {...childWrapper}>
            {childWrapper.children.map(getChildrenToRender)}
          </div>
        </Col>
      )
    })
  }

  render() {
    const { ...props } = this.props
    delete props.dataSource
    delete props.isMobile
    const childrenToRender = this.getLiChildren(this.dataSource.block.children)
    return (
      <div {...props} {...this.dataSource.wrapper}>
        <OverPack {...this.dataSource.OverPack}>
          <QueueAnim
            type='bottom'
            key='ul'
            leaveReverse
            component={Row}
            {...this.dataSource.block}
          >
            {childrenToRender}
          </QueueAnim>
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            key='copyright'
            {...this.dataSource.copyrightWrapper}
          >
            <div {...this.dataSource.copyrightPage}>
              <div {...this.dataSource.copyright}>
                {this.dataSource.copyright.children}
              </div>
            </div>
          </TweenOne>
        </OverPack>
      </div>
    )
  }
}

export default Footer
