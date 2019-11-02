import React from 'react'
import QueueAnim from 'rc-queue-anim'
import { Row, Col } from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import { getChildrenToRender } from './utils'

class Content extends React.PureComponent {
  dataSource = {
    wrapper: { className: 'home-page-wrapper content0-wrapper' },
    page: { className: 'home-page content0' },
    OverPack: { playScale: 0.3, className: '' },
    titleWrapper: {
      className: 'title-wrapper',
      children: [
        {
          name: 'title',
          children: (
            <>
              <p>WHY CHOOSED?</p>
            </>
          ),
        },
      ],
    },
    childWrapper: {
      className: 'content0-block-wrapper',
      children: [
        {
          name: 'block0',
          className: 'content0-block',
          md: 8,
          xs: 24,
          children: {
            className: 'content0-block-item',
            children: [
              {
                name: 'image',
                className: 'content0-block-icon',
                children:
                  'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
              },
              {
                name: 'title',
                className: 'content0-block-title',
                children: (
                  <>
                    <p>Quick and convenience payment</p>
                  </>
                ),
              },
              {
                name: 'content',
                children: (
                  <>
                    <p>Easy and trust.</p>
                  </>
                ),
              },
            ],
          },
        },
        {
          name: 'block1',
          className: 'content0-block',
          md: 8,
          xs: 24,
          children: {
            className: 'content0-block-item',
            children: [
              {
                name: 'image',
                className: 'content0-block-icon',
                children:
                  'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
              },
              {
                name: 'title',
                className: 'content0-block-title',
                children: (
                  <>
                    <p>Quality</p>
                  </>
                ),
              },
              {
                name: 'content',
                children: (
                  <>
                    <p>Leading the world in quality.</p>
                  </>
                ),
              },
            ],
          },
        },
        {
          name: 'block2',
          className: 'content0-block',
          md: 8,
          xs: 24,
          children: {
            className: 'content0-block-item',
            children: [
              {
                name: 'image',
                className: 'content0-block-icon',
                children:
                  'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
              },
              {
                name: 'title',
                className: 'content0-block-title',
                children: (
                  <>
                    <p>Customer</p>
                  </>
                ),
              },
              {
                name: 'content',
                children: (
                  <>
                    <p>
                      The rate of customers using the service increased rapidly.
                    </p>
                  </>
                ),
              },
            ],
          },
        },
      ],
    },
  }
  render() {
    const { isMobile, ...props } = this.props
    const {
      wrapper,
      titleWrapper,
      page,
      OverPack: overPackData,
      childWrapper,
    } = this.dataSource
    return (
      <div {...props} {...wrapper}>
        <div {...page}>
          <div {...titleWrapper}>
            {titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack {...overPackData}>
            <QueueAnim
              type='bottom'
              key='block'
              leaveReverse
              component={Row}
              componentProps={childWrapper}
            >
              {childWrapper.children.map((block, i) => {
                const { children: item, ...blockProps } = block
                return (
                  <Col key={i.toString()} {...blockProps}>
                    <div {...item}>
                      {item.children.map(getChildrenToRender)}
                    </div>
                  </Col>
                )
              })}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    )
  }
}

export default Content
