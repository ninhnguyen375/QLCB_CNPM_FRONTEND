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
              <p>TẠI SAO LẠI LỰA CHỌN FLYNOW?</p>
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
                    <p>Thanh toán nhanh chóng và tiện lợi</p>
                  </>
                ),
              },
              {
                name: 'content',
                children: (
                  <>
                    <p>Dễ dàng và đáng tin cậy.</p>
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
                    <p>Chất lượng</p>
                  </>
                ),
              },
              {
                name: 'content',
                children: (
                  <>
                    <p>Dẫn đầu thế giới về chất lượng.</p>
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
                    <p>Khách hàng</p>
                  </>
                ),
              },
              {
                name: 'content',
                children: (
                  <>
                    <p>Tỷ lệ khách hàng sử dụng dịch vụ tăng nhanh.</p>
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
