import React from 'react'
import { Row, Col } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import { getChildrenToRender } from './utils'

class Content5 extends React.PureComponent {
  dataSource = {
    wrapper: { className: 'home-page-wrapper content5-wrapper' },
    page: { className: 'home-page content5' },
    OverPack: { playScale: 0.3, className: '' },
    titleWrapper: {
      className: 'title-wrapper',
      children: [
        {
          name: 'title',
          children: (
            <>
              <p>Flight Tickets</p>
            </>
          ),
          className: 'title-h1',
        },
        {
          name: 'content',
          className: 'title-content',
          children: (
            <>
              <p>Choose the flight ticket that suits you best.</p>
            </>
          ),
        },
      ],
    },
    block: {
      className: 'content5-img-wrapper',
      gutter: 16,
      children: [
        {
          name: 'block0',
          className: 'block',
          md: 6,
          xs: 24,
          children: {
            wrapper: { className: 'content5-block-content' },
            img: {
              children: 'https://res.flynow.vn/minprice/SGN-PQC.jpg',
            },
            content: {
              children: (
                <div>
                  <div>Ho Chi Minh - Phu Quoc</div>
                  <p>Departure date 2019-10-28</p>
                </div>
              ),
            },
          },
        },
        {
          name: 'block1',
          className: 'block',
          md: 6,
          xs: 24,
          children: {
            wrapper: { className: 'content5-block-content' },
            img: {
              children: 'https://res.flynow.vn/minprice/SGN-PQC.jpg',
            },
            content: {
              children: (
                <div>
                  <h4>Ho Chi Minh - Phu Quoc</h4>
                  <p>Departure date 2019-10-28</p>
                </div>
              ),
            },
          },
        },
        {
          name: 'block2',
          className: 'block',
          md: 6,
          xs: 24,
          children: {
            wrapper: { className: 'content5-block-content' },
            img: {
              children: 'https://res.flynow.vn/minprice/SGN-PQC.jpg',
            },
            content: {
              children: (
                <div>
                  <h4>Ho Chi Minh - Phu Quoc</h4>
                  <p>Departure date 2019-10-28</p>
                </div>
              ),
            },
          },
        },
        {
          name: 'block3',
          className: 'block',
          md: 6,
          xs: 24,
          children: {
            wrapper: { className: 'content5-block-content' },
            img: {
              children: 'https://res.flynow.vn/minprice/SGN-PQC.jpg',
            },
            content: {
              children: (
                <div>
                  <h4>Ho Chi Minh - Phu Quoc</h4>
                  <p>Departure date 2019-10-28</p>
                </div>
              ),
            },
          },
        },
        {
          name: 'block4',
          className: 'block',
          md: 6,
          xs: 24,
          children: {
            wrapper: { className: 'content5-block-content' },
            img: {
              children: 'https://res.flynow.vn/minprice/SGN-PQC.jpg',
            },
            content: {
              children: (
                <div>
                  <h4>Ho Chi Minh - Phu Quoc</h4>
                  <p>Departure date 2019-10-28</p>
                </div>
              ),
            },
          },
        },
        {
          name: 'block5',
          className: 'block',
          md: 6,
          xs: 24,
          children: {
            wrapper: { className: 'content5-block-content' },
            img: {
              children: 'https://res.flynow.vn/minprice/SGN-PQC.jpg',
            },
            content: {
              children: (
                <div>
                  <h4>Ho Chi Minh - Phu Quoc</h4>
                  <p>Departure date 2019-10-28</p>
                </div>
              ),
            },
          },
        },
        {
          name: 'block6',
          className: 'block',
          md: 6,
          xs: 24,
          children: {
            wrapper: { className: 'content5-block-content' },
            img: {
              children: 'https://res.flynow.vn/minprice/SGN-PQC.jpg',
            },
            content: {
              children: (
                <div>
                  <h4>Ho Chi Minh - Phu Quoc</h4>
                  <p>Departure date 2019-10-28</p>
                </div>
              ),
            },
          },
        },
        {
          name: 'block7',
          className: 'block',
          md: 6,
          xs: 24,
          children: {
            wrapper: { className: 'content5-block-content' },
            img: {
              children: 'https://res.flynow.vn/minprice/SGN-PQC.jpg',
            },
            content: {
              children: (
                <div>
                  <h4>Ho Chi Minh - Phu Quoc</h4>
                  <p>Departure date 2019-10-28</p>
                </div>
              ),
            },
          },
        },
      ],
    },
  }
  getChildrenToRender(data) {
    return data.map(item => {
      return (
        <Col key={item.name} {...item}>
          <div {...item.children.wrapper}>
            <span {...item.children.img}>
              <img src={item.children.img.children} height='100%' alt='img' />
            </span>
            <div {...item.children.content}>
              {item.children.content.children}
            </div>
          </div>
        </Col>
      )
    })
  }

  render() {
    const { ...props } = this.props
    delete props.dataSource
    delete props.isMobile
    const childrenToRender = this.getChildrenToRender(
      this.dataSource.block.children,
    )
    return (
      <div {...props} {...this.dataSource.wrapper}>
        <div {...this.dataSource.page}>
          <div key='title' {...this.dataSource.titleWrapper}>
            {this.dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack
            className={`content-template ${props.className}`}
            {...this.dataSource.OverPack}
          >
            <TweenOneGroup
              component={Row}
              key='ul'
              enter={{
                y: '+=30',
                opacity: 0,
                type: 'from',
                ease: 'easeInOutQuad',
              }}
              leave={{ y: '+=30', opacity: 0, ease: 'easeInOutQuad' }}
              {...this.dataSource.block}
            >
              {childrenToRender}
            </TweenOneGroup>
          </OverPack>
        </div>
      </div>
    )
  }
}

export default Content5
