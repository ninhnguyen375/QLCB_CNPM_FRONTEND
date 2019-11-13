import React, { Component } from 'react'
import { Icon, Card, notification, Tag, Divider } from 'antd'
import { getUserRole } from '../../../common/utils/authUtils'
import { handleError } from '../../../common/utils/handleError'
import { getFlightAsync } from '../handlers'
import { minutesToTime } from '../../../common/utils/timeFormater'

class FlightDetail extends Component {
  state = {
    flight: {},
  }

  componentDidMount() {
    this.getFlight()
  }

  getFlight = async () => {
    const { id } = this.props.match.params
    if (!id) {
      throw new Error('Missing Id')
    }

    try {
      const res = await getFlightAsync(id)
      this.setState({ flight: res.data })
    } catch (error) {
      handleError(error, null, notification)
    }
  }

  render() {
    const authRole = getUserRole()
    const { flight } = this.state

    return (
      <Card
        title={<strong>THÔNG TIN CHI TIẾT</strong>}
        style={{ height: '100%' }}
      >
        <div className='container'>
          <h1>
            <b>I. Thông tin chuyến bay:</b>
          </h1>
          <br />
          <div className='row container'>
            <div className='col-lg-4'>
              <h4>
                <b>Chuyến bay:</b>
              </h4>

              <div style={{ marginTop: 10 }}></div>
              <Tag
                title='Mã Chuyến Bay'
                className='tac link'
                style={{
                  fontSize: '0.9em',
                  padding: '2px 10px',
                }}
                color='blue'
              >
                {flight ? flight.id : '---'}
              </Tag>
              <br />
              {flight && flight.airline ? flight.airline.name : '---'}
            </div>

            <div className='col-lg-4'>
              <h4>
                <b>Thời gian khởi hành:</b>
              </h4>
              <div style={{ marginTop: 10 }}></div>
              <Icon type='clock-circle' />{' '}
              {minutesToTime(flight ? flight.startTime : 0)}
            </div>

            <div className='col-lg-4'>
              <h4>
                <b>Thời gian đến:</b>
              </h4>
              <div style={{ marginTop: 10 }}></div>
              <Icon type='clock-circle' />{' '}
              {minutesToTime(flight ? flight.flightTime + flight.startTime : 0)}
            </div>
          </div>
          <br />
          <div className='row container'>
            <div className='col-lg-4'>
              <h4>
                <b>Nơi đi:</b>
              </h4>
              <div style={{ marginTop: 10 }}></div>
              {flight && flight.airportFromData
                ? flight.airportFromData.location
                : '---'}{' '}
              - Sân bay:{' '}
              {flight && flight.airportFromData
                ? flight.airportFromData.name
                : '---'}
            </div>

            <div className='col-lg-4'>
              <h4>
                <b>Nơi đến:</b>
              </h4>
              <div style={{ marginTop: 10 }}></div>
              {flight && flight.airportToData
                ? flight.airportToData.location
                : '---'}{' '}
              - Sân bay:{' '}
              {flight && flight.airportToData
                ? flight.airportToData.name
                : '---'}
            </div>

            <div className='col-lg-4'>
              <h4>
                <b>Tổng Số lượng ghế:</b>
              </h4>

              <div style={{ marginTop: 10 }}></div>

              {flight ? flight.seatsCount : '---'}
            </div>
          </div>
          <Divider />
          <h1>
            <b>II. Thông tin loại vé:</b>
          </h1>
          <br />
          <div className='row container'>
            <div className='col-lg-4'>
              <h4>
                <b>Loại vé:</b>
              </h4>
              <div style={{ marginTop: 10 }}></div>
            </div>
            <div className='col-lg-4'>
              <h4>
                <b>Giá:</b>
              </h4>
              <div style={{ marginTop: 10 }}></div>
            </div>
            <br />
          </div>
          {flight &&
          flight.flightTicketCategories &&
          Array.isArray(flight.flightTicketCategories)
            ? flight.flightTicketCategories.map((t, index) => (
                <div className='row container' key={index}>
                  <div className='col-lg-4'>
                    <div style={{ marginTop: 10 }}></div>

                    {t && t.ticketCategory ? t.ticketCategory.name : ''}
                  </div>
                  <div className='col-lg-4'>
                    <div style={{ marginTop: 10 }}></div>
                    <div className='price-color fwb'>
                      {t
                        ? t.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : 0}{' '}
                      VNĐ
                    </div>
                  </div>
                  <br />
                </div>
              ))
            : ''}
        </div>
        <br />
        <br />
      </Card>
    )
  }
}

export default FlightDetail
