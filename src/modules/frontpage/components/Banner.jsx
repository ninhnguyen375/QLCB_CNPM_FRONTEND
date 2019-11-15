import React from 'react'
import { Icon, Card } from 'antd'
import TweenOne from 'rc-tween-one'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import SearchFlightForm from '../containers/SearchFlightForm'

class Banner extends React.PureComponent {
  dataSource = {
    wrapper: {
      className: 'banner0',
      style: {
        backgroundImage: `url(${require('../../../assets/images/wall3.jpeg')})`,
        marginTop: 64,
      },
    },
    textWrapper: { className: 'banner0-text-wrapper' },
    title: {
      className: 'banner0-title',
      children: (
        <img
          src={require('../../../assets/images/logo.png')}
          width='100%'
          alt='logo'
        />
      ),
    },
    content: {
      className: 'banner0-content k16e6w2on7n-editor_css',
      children: (
        <>
          <p>FLY NOW, GET YOUR TICKET NOW</p>
        </>
      ),
    },
    button: { className: 'banner0-button', children: 'Find Flights' },
  }

  render() {
    return (
      <div {...this.props} {...this.dataSource.wrapper}>
        <div className='container d-flex justify-content-center flex-wrap'>
          <div className='col-lg-6' style={{ marginTop: 20 }}>
            <SearchFlightForm history={this.props.history} />
          </div>
          <div className='col-lg-6' style={{ marginTop: 20 }}>
            <Card>
              <Carousel autoPlay={true} interval={1000} infiniteLoop={true}>
                <div>
                  <img
                    alt='img'
                    src={require('../../../assets/images/banner1.jpg')}
                  />
                  <p className='legend'>Legend 1</p>
                </div>
                <div>
                  <img
                    alt='img'
                    src={require('../../../assets/images/banner1.jpg')}
                  />
                  <p className='legend'>Legend 2</p>
                </div>
                <div>
                  <img
                    alt='img'
                    src={require('../../../assets/images/banner1.jpg')}
                  />
                  <p className='legend'>Legend 3</p>
                </div>
              </Carousel>
            </Card>
          </div>
        </div>
        <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000,
          }}
          className='banner0-icon'
          key='icon'
        >
          <Icon type='down' />
        </TweenOne>
      </div>
    )
  }
}
export default Banner
