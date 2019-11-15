import React, { Component } from 'react'
import point from '../../../assets/images/01-point.png'
import TweenOne from 'rc-tween-one'
import { Button, Card, Divider, Tag } from 'antd'
import {
  minutesToTime,
  minutesToTimeWithType,
} from '../../../common/utils/timeFormater'
import moment from 'moment'
import { getValueFromObj } from '../../../common/utils/makeupObject'
import { priceFormat } from '../../../common/utils/stringFormater'

export class FlightItem extends Component {
  state = {
    isShowDetails: false,
  }

  toggleShowDetails = () => {
    this.setState({ isShowDetails: !this.state.isShowDetails })
  }

  getTotalPrice = (
    flightTicketCategories = [],
    ticketCategoriesInForm = [],
  ) => {
    let totalPrice = 0

    flightTicketCategories.forEach(ftc => {
      const quantity = ticketCategoriesInForm[ftc.ticketCategoryId]
        ? ticketCategoriesInForm[ftc.ticketCategoryId].quantity
        : 0
      const ticketCategoryPrice = ftc ? ftc.price || 99999999 : 99999999
      totalPrice += parseFloat(ticketCategoryPrice) * parseFloat(quantity)
    })
    return totalPrice
  }

  render() {
    const { id, onSelectFlight, isSelected, flight = {} } = this.props
    const { departureDate, ticketCategoriesInForm = [] } = this.props
    const { flightTicketCategories = [] } = flight

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
                src={require('../../../assets/images/airline.png')}
              />
              <div>
                <a
                  href={`https://www.google.com/search?q=${
                    flight.airline ? flight.airline.name : ''
                  }`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {flight.airline ? flight.airline.name : 'No Airline Name'}
                </a>
                <br />
                <Tag
                  title='Mã Hãng Hàng Không'
                  style={{ marginTop: 5 }}
                  color='blue'
                >
                  {flight.airline ? flight.airline.id : 'No Airline Id'}
                </Tag>
              </div>
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
                {minutesToTime(flight.startTime + flight.flightTime)}
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
              <p className='fwb' style={{ color: '#FFA801' }}>
                {priceFormat(
                  this.getTotalPrice(
                    flightTicketCategories || [],
                    ticketCategoriesInForm || [],
                  ),
                )}
                VNĐ
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
                <div className='row d-flex justify-content-between'>
                  <div className='col'>
                    <p className='fwb'>
                      {flight.airportFromData
                        ? flight.airportFromData.location
                        : 'No Location Name'}
                    </p>
                    <p>
                      <Tag>
                        {minutesToTime(flight.startTime)}, {departureDate}
                      </Tag>
                    </p>
                    <p>
                      Sân bay{' '}
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
                    <p>
                      <Tag>
                        {moment(
                          `${departureDate}, ${minutesToTime(
                            flight.startTime,
                          )}`,
                          'DD-MM-YYYY, HH:mm',
                        )
                          .add(flight.flightTime, 'minutes')
                          .format('HH:mm, DD-MM-YYYY')
                          .toString()}
                      </Tag>
                    </p>
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
                  {Array.isArray(flightTicketCategories)
                    ? flightTicketCategories.map(ftc => {
                        const ticketCategoryName = getValueFromObj(
                          'ticketCategory.name',
                          ftc,
                        )
                        const ticketCategoryPrice = ftc
                          ? ftc.price || 99999999
                          : 99999999
                        const quantity = ticketCategoriesInForm[
                          ftc.ticketCategoryId
                        ]
                          ? ticketCategoriesInForm[ftc.ticketCategoryId]
                              .quantity
                          : 0
                        if (quantity === 0) return ''
                        return (
                          <p key={ftc.flightId + ftc.ticketCategoryId}>
                            {ticketCategoryName} +{' '}
                            {priceFormat(ticketCategoryPrice)}VNĐ
                          </p>
                        )
                      })
                    : ''}
                </div>
                <Divider type='vertical' style={{ height: 80 }} />
                <div>
                  <p>Số lượng:</p>
                  {Array.isArray(flightTicketCategories)
                    ? flightTicketCategories.map(ftc => {
                        const quantity = ticketCategoriesInForm[
                          ftc.ticketCategoryId
                        ]
                          ? ticketCategoriesInForm[ftc.ticketCategoryId]
                              .quantity
                          : 0
                        if (quantity === 0) return ''
                        return (
                          <p
                            className='tac'
                            key={ftc.flightId + ftc.ticketCategoryId}
                          >
                            {quantity}
                          </p>
                        )
                      })
                    : ''}
                </div>
                <Divider type='vertical' style={{ height: 80 }} />
                <div>
                  <p className='fwb'>Tổng cộng</p>
                  {Array.isArray(flightTicketCategories)
                    ? flightTicketCategories.map(ftc => {
                        const quantity = ticketCategoriesInForm[
                          ftc.ticketCategoryId
                        ]
                          ? ticketCategoriesInForm[ftc.ticketCategoryId]
                              .quantity
                          : 0
                        const ticketCategoryPrice = ftc
                          ? ftc.price || 99999999
                          : 99999999
                        return (
                          <p
                            className='tac'
                            key={ftc.flightId + ftc.ticketCategoryId}
                          >
                            {priceFormat(
                              parseFloat(ticketCategoryPrice) *
                                parseFloat(quantity),
                            )}
                            VNĐ
                          </p>
                        )
                      })
                    : ''}
                </div>
              </div>
              <Divider />
              <div>
                <p className='fwb tar'>
                  Số tiền bạn phải trả:{' '}
                  <span className='fwb' style={{ color: '#FFA801' }}>
                    {priceFormat(
                      this.getTotalPrice(
                        flightTicketCategories || [],
                        ticketCategoriesInForm || [],
                      ),
                    )}
                    VNĐ
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
