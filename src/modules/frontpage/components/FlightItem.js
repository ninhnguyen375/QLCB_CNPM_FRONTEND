import React, { Component } from 'react'
import point from '../../../assets/images/01-point.png'
import TweenOne from 'rc-tween-one'
import { Button, Card, Divider } from 'antd'

export class FlightItem extends Component {
  state = {
    isShowDetails: false,
  }

  toggleShowDetails = () => {
    this.setState({ isShowDetails: !this.state.isShowDetails })
  }

  render() {
    const { id, onSelectFlight, isSelected } = this.props
    return (
      <div style={{ width: '100%', marginBottom: 10 }}>
        <Card style={{ borderRadius: 5 }}>
          <div
            style={{ color: '#6A6A6A' }}
            className='d-flex flex-wrap justify-content-between'
          >
            <div className='d-flex flex-wrap'>
              <img
                alt='flight'
                style={{
                  width: 50,
                  marginRight: 10,
                  borderRadius: 5,
                }}
                src={require('../../../assets/images/logo.png')}
              />
              <span>Vietjet Air</span>
            </div>
            <div>
              <p className='fwb'>21:15</p>
              <p>Hà Nội</p>
            </div>
            <div>
              <p className='tac'>1h</p>
              <img alt='flight' src={point} />
            </div>
            <div>
              <p className='tac fwb'>22:15</p>
              <p className='tac'>Hồ Chí Minh</p>
            </div>
            <div>
              <p
                onClick={this.toggleShowDetails}
                style={{ color: '#4469B0', cursor: 'pointer' }}
              >
                Xem chi tiết
              </p>
            </div>
            <div>
              <p className='fwb' style={{ color: '#FFA801' }}>
                200.000đ
              </p>
            </div>
            <div>
              {isSelected ? (
                <Button
                  disabled
                  style={{ backgroundColor: '#21c321', color: '#fff' }}
                >
                  CHỌN
                </Button>
              ) : (
                <Button onClick={() => onSelectFlight(id)} type='primary'>
                  CHỌN
                </Button>
              )}
            </div>
          </div>
        </Card>

        {this.state.isShowDetails ? (
          <TweenOne
            animation={[{ y: '-=30', opacity: 0, type: 'from' }]}
            key='flightItem'
          >
            <Card style={{ color: '#6A6A6A', marginTop: '-1px' }}>
              <div className='d-flex flex-wrap justify-content-between'>
                <div className='row d-flex align-items-center justify-content-between'>
                  <div className='col'>
                    <p className='fwb'>Hà Nội</p>
                    <p>21:15, 12/11/2019</p>
                    <p>Sân Bay Nội Bài</p>
                  </div>
                  <div className='col'>
                    <img
                      alt='point'
                      style={{ paddingBottom: 10, paddingLeft: 7 }}
                      src={point}
                    />
                  </div>
                  <div className='col'>
                    <p className='fwb'>Hồ Chí Minh</p>
                    <p>21:15, 12/11/2019</p>
                    <p>Sân Bay Tân Sơn Nhất</p>
                  </div>
                </div>
                <Divider type='vertical' style={{ height: 80 }} />
                <div>
                  <p>Loại vé:</p>
                  <p>Vé loại 1</p>
                </div>
                <Divider type='vertical' style={{ height: 80 }} />
                <div>
                  <p>Số lượng:</p>
                  <p>2</p>
                </div>
                <Divider type='vertical' style={{ height: 80 }} />
                <div>
                  <p>Giá vé:</p>
                  <p>200.000đ</p>
                </div>
                <Divider type='vertical' style={{ height: 80 }} />
                <div>
                  <p className='fwb'>Tổng cộng</p>
                  <p>400.000đ</p>
                </div>
              </div>
              <Divider />
              <div>
                <p className='fwb tar'>
                  Số tiền bạn phải trả:{' '}
                  <span className='fwb' style={{ color: '#FFA801' }}>
                    400.000đ
                  </span>
                </p>
              </div>
            </Card>
          </TweenOne>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default FlightItem
