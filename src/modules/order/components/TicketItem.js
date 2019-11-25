import React, { Component } from 'react'
import { Card, Divider, Tag } from 'antd'
import point from '../../../assets/images/01-point.png'
import RcTweenOne from 'rc-tween-one'
import {
  minutesToTime,
  minutesToTimeWithType,
} from '../../../common/utils/timeFormater'
import { priceFormat } from '../../../common/utils/stringFormater'
import moment from 'moment'
import { Link } from 'react-router-dom'
class TicketItem extends Component {
  state = {
    isShowDetails: false,
  }

  toggleShowDetails = () => {
    this.setState({ isShowDetails: !this.state.isShowDetails })
  }

  render() {
    let { ticket } = this.props
    ticket = ticket ? ticket || {} : {}
    const flight = ticket && ticket.flight ? ticket.flight || {} : {}
    const date = ticket && ticket.date ? ticket.date || {} : {}

    return (
      <div style={{ width: '100%', marginBottom: 10 }}>
        <Card style={{ borderRadius: 5 }}>
          <div>
            <b>Hành khách:</b> {ticket.passengerName} - <b>Giới tính:</b>{' '}
            {ticket.passengerGender === 1 ? 'Nam' : 'Nữ'}
          </div>
          <Divider />

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
                src={require('../../../assets/images/ticketCategory.png')}
              />
              <div>
                <div>Mã Vé: </div>
                <Tag
                  title=''
                  className='tac link'
                  style={{ marginTop: 5 }}
                  color='blue'
                >
                  {ticket.id}
                </Tag>
              </div>
            </div>
            <div>
              <p>
                <b>Mã Chuyến Bay</b>
              </p>
              <p className='tac'>
                <Link to={`/admin/flight/${flight.id}`}>
                  <Tag
                    title='Mã Chuyến Bay'
                    className='tac link'
                    style={{
                      fontSize: '0.9em',
                      padding: '2px 5px',
                      marginTop: 5,
                    }}
                    color='blue'
                  >
                    {flight.id}
                  </Tag>
                </Link>
              </p>
            </div>
            <div>
              <p className='tac fwb'>{minutesToTime(flight.startTime)}</p>
              <p className='tac'>
                {flight.airportFromData
                  ? flight.airportFromData.location
                  : 'No Location Name'}
              </p>
            </div>
            <div>
              <p className='tac'>{minutesToTimeWithType(flight.flightTime)}</p>
              <img alt='flight' src={point} />
            </div>
            <div>
              <p className='tac fwb'>
                {moment(
                  `${date.departureDate}, ${minutesToTime(flight.startTime)}`,
                  'DD-MM-YYYY, HH:mm',
                )
                  .add(flight.flightTime, 'minutes')
                  .format('HH:mm')
                  .toString()}
              </p>
              <p className='tac'>
                {flight.airportToData
                  ? flight.airportToData.location
                  : 'No Location Name'}
              </p>
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
              <p className='fwb price-color'>{priceFormat(ticket.price)}VNĐ</p>
            </div>
          </div>
        </Card>

        {this.state.isShowDetails ? (
          <RcTweenOne
            animation={[{ y: '-=30', opacity: 0, type: 'from' }]}
            key='flightItem'
          >
            <Card style={{ color: '#6A6A6A', marginTop: '-1px' }}>
              <div className='d-flex flex-wrap justify-content-between'>
                <div className='row d-flex align-items-center justify-content-between'>
                  <div className='col'>
                    <p className='fwb'>
                      {flight.airportFromData
                        ? flight.airportFromData.location
                        : 'No Location Name'}
                    </p>
                    <Tag>
                      {minutesToTime(flight.startTime)},{' '}
                      {moment(date.departureDate).format('DD-MM-YYYY')}
                    </Tag>
                    <p>
                      Sân Bay{' '}
                      {flight.airportFromData
                        ? flight.airportFromData.name
                        : 'No Airport Name'}
                    </p>
                  </div>
                  <div className='col'>
                    <div>
                      <p className='tac'>
                        {minutesToTimeWithType(flight.flightTime)}
                      </p>
                      <img
                        alt='point'
                        style={{ paddingBottom: 10, paddingLeft: 7 }}
                        src={point}
                      />
                    </div>
                  </div>
                  <div className='col'>
                    <p className='fwb'>
                      {flight.airportToData
                        ? flight.airportToData.location
                        : 'No Location Name'}
                    </p>
                    <Tag>
                      {moment(date.departureDate)
                        .add(flight.startTime + flight.flightTime, 'minutes')
                        .format('HH:mm, DD-MM-YYYY')
                        .toString()}
                    </Tag>
                    <p>
                      Sân Bay{' '}
                      {flight.airportToData
                        ? flight.airportToData.name
                        : 'No Airport Name'}
                    </p>
                  </div>
                </div>
                <Divider type='vertical' style={{ height: 80 }} />
                <div>
                  <p>Loại vé:</p>
                  <p>
                    {ticket.ticketCategory ? ticket.ticketCategory.name : '--'}
                  </p>
                </div>
                <Divider type='vertical' style={{ height: 80 }} />
                <div>
                  <p>Hành lý mang thêm:</p>
                  <p>
                    {ticket.luggage
                      ? ticket.luggage.luggageWeight === 0
                        ? 'Không có'
                        : ticket.luggage.luggageWeight +
                          ' Kg + ' +
                          priceFormat(ticket.luggage.price) +
                          'VNĐ'
                      : 'Không có'}
                  </p>
                </div>
                <Divider type='vertical' style={{ height: 80 }} />
                <div>
                  <p className='fwb'>Tổng cộng:</p>
                  <p className='price-color fwb'>
                    {priceFormat(ticket.price)}VNĐ
                  </p>
                </div>
              </div>
            </Card>
          </RcTweenOne>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default TicketItem
