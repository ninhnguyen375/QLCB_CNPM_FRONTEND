import React, { Component } from 'react'
import { Card, Select, message, Button, Icon } from 'antd'
import FlightItem from './FlightItem'
import { searchFlightFromDate } from '../../date/handlers'
import { getValueFromObj } from '../../../common/utils/makeupObject'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Lottie from '../../../libraries/Lottie'

export class SearchFlightResult extends Component {
  state = {
    selectedFlightFrom: '',
    selectedFlightTo: '',
    searchFlightResult: {},
    isSearchingFlights: false,
  }

  completeSelect = (values = {}) => {
    this.props.setSearchFlightParams({ selectedFlight: values })
    this.props.next()
  }

  handleSelectFlightFrom = id => {
    const { type } = this.props.searchFlightParams
    this.setState({ selectedFlightFrom: id })
    if (type !== 2) return
    this.completeSelect({ departureFlight: id })
  }

  handleSelectFlightTo = id => {
    const { selectedFlightFrom } = this.state
    if (!selectedFlightFrom) {
      message.error('Vui lòng chọn vé chiều đi trước')
      return
    }
    this.completeSelect({
      departureFlight: selectedFlightFrom,
      returnFlight: id,
    })
  }

  async componentDidMount() {
    const { searchFlightParams } = this.props
    this.setState({ isSearchingFlights: true })
    try {
      const res = await searchFlightFromDate(searchFlightParams)
      this.setState({ searchFlightResult: res, isSearchingFlights: false })
    } catch (err) {
      this.setState({ isSearchingFlights: false })
      // handleError(err, null, notification)
    }
  }

  showFlyFrom = (departureFlights = []) => {
    const { searchFlightParams = {} } = this.props
    let { departureDate, ticketCategoriesInForm } = searchFlightParams
    departureDate = moment(departureDate)
      .format('DD-MM-YYYY')
      .toString()

    return departureFlights.map(f => (
      <FlightItem
        id={f.id}
        key={f.id}
        ticketCategoriesInForm={ticketCategoriesInForm}
        departureDate={departureDate}
        flight={f || {}}
        isSelected={f.id === this.state.selectedFlightFrom}
        onSelectFlight={this.handleSelectFlightFrom}
      />
    ))
  }

  showFlyTo = (returnFlights = []) => {
    const { searchFlightParams = {} } = this.props
    let { returnDate, ticketCategoriesInForm } = searchFlightParams
    returnDate = moment(returnDate)
      .format('DD-MM-YYYY')
      .toString()

    return returnFlights.map(f => (
      <FlightItem
        id={f.id}
        key={f.id}
        ticketCategoriesInForm={ticketCategoriesInForm}
        departureDate={returnDate}
        flight={f || {}}
        isSelected={f.id === this.state.selectedFlightTo}
        onSelectFlight={this.handleSelectFlightTo}
      />
    ))
  }

  render() {
    const { type } = this.props.searchFlightParams
    const { searchFlightResult = {}, isSearchingFlights } = this.state
    const { departureFlights, returnFlights } = searchFlightResult

    if (isSearchingFlights) {
      return (
        <h2 className='tac'>
          <br />
          <div>Đang tìm kiếm. Vui lòng đợi trong giây lát.</div>
          <Lottie
            options={{
              animationData: require('../../../assets/animations/8135-error-screen.json'),
            }}
            width='30%'
          />
        </h2>
      )
    }

    if (!Array.isArray(departureFlights) || departureFlights.length === 0) {
      return (
        <h2 className='tac'>
          <br />
          <div>
            Rất tiếc, hiện tại không tìm thấy chuyến bay phù hợp. <br />
            Mong quý khách vui lòng quay lại sau!{' '}
            <Link to='/'>Quay lại trang chủ.</Link>
          </div>
          <Lottie
            options={{
              animationData: require('../../../assets/animations/5451-search-file.json'),
            }}
            width='30%'
          />
        </h2>
      )
    }

    if (
      type === 1 &&
      (!Array.isArray(returnFlights) || returnFlights.length === 0)
    ) {
      return (
        <h1 style={{ padding: 50 }} className='tac'>
          Không tìm thấy chuyến bay phù hợp
          <br />
          <div>
            <Link to='/'>
              <Button size='large' type='primary'>
                <Icon type='home' />
                Quay lại trang chủ
              </Button>
            </Link>
          </div>
        </h1>
      )
    }

    return (
      <div className='search-flight-result'>
        <p className='title'>
          Tìm chuyến bay từ{' '}
          {getValueFromObj('0.airportFromData.location', departureFlights)} (
          {getValueFromObj('0.airportFromData.id', departureFlights)}) đến{' '}
          {getValueFromObj('0.airportToData.location', departureFlights)} (
          {getValueFromObj('0.airportToData.id', departureFlights)})
        </p>

        <div>
          <div>
            <Card
              style={{
                backgroundColor: 'rgb(0, 21, 41)',
                color: '#fff',
              }}
            >
              <div
                className='d-flex justify-content-between'
                style={{
                  borderLeft: '1px solid #fff',
                  borderWidth: 2,
                  padding: '0 10px 0 10px',
                }}
              >
                <div>
                  <p>CHỌN CHIỀU ĐI</p>
                  <br />
                  <p>
                    {getValueFromObj(
                      '0.airportFromData.location',
                      departureFlights,
                    )}{' '}
                    ({getValueFromObj('0.airportFromData.id', departureFlights)}
                    ) đến{' '}
                    {getValueFromObj(
                      '0.airportToData.location',
                      departureFlights,
                    )}{' '}
                    ({getValueFromObj('0.airportToData.id', departureFlights)})
                  </p>
                </div>
                <div>
                  <p className='tar'>
                    {departureFlights ? departureFlights.length : 0} kết quả
                  </p>
                  <br />
                  <p className='tar'>Giá vé đã bao gồm thuế và phụ phí</p>
                </div>
              </div>
            </Card>
            <div style={{ margin: '10px 0 50px 0' }}>
              <div className='d-flex justify-content-between'>
                <div>
                  <span>Bộ lọc: </span>{' '}
                  <Select
                    style={{ width: 200, marginRight: 5 }}
                    placeholder='Hãng hàng không'
                  >
                    <Select.Option value='1'>VietJet Air</Select.Option>
                    <Select.Option value='2'>Vietnam Airline</Select.Option>
                  </Select>
                  <Select style={{ width: 200 }} placeholder='Hạng vé'>
                    <Select.Option value='1'>1</Select.Option>
                    <Select.Option value='2'>2</Select.Option>
                  </Select>
                </div>
                <div>
                  <span>Giá vé: </span>{' '}
                  <Select style={{ width: 200 }} placeholder='Tăng dần'>
                    <Select.Option value='1'>Tăng dần </Select.Option>
                    <Select.Option value='2'>Giảm dần</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
            <div>{this.showFlyFrom(departureFlights || [])}</div>
          </div>
        </div>
        <div style={{ marginTop: 50 }}></div>
        {type === 1 ? (
          <div>
            <div>
              <Card
                style={{
                  backgroundColor: 'rgb(0, 21, 41)',
                  color: '#fff',
                }}
              >
                <div
                  className='d-flex justify-content-between'
                  style={{
                    borderLeft: '1px solid #fff',
                    borderWidth: 2,
                    padding: '0 10px 0 10px',
                  }}
                >
                  <div>
                    <p>CHỌN CHIỀU VỀ</p>
                    <br />
                    <p>
                      {getValueFromObj(
                        '0.airportToData.location',
                        departureFlights,
                      )}{' '}
                      ({getValueFromObj('0.airportToData.id', departureFlights)}
                      ) đến{' '}
                      {getValueFromObj(
                        '0.airportFromData.location',
                        departureFlights,
                      )}{' '}
                      (
                      {getValueFromObj(
                        '0.airportFromData.id',
                        departureFlights,
                      )}
                      )
                    </p>
                  </div>
                  <div>
                    <p className='tar'>
                      {returnFlights ? returnFlights.length : 0} kết quả
                    </p>
                    <br />
                    <p className='tar'>Giá vé đã bao gồm thuế và phụ phí</p>
                  </div>
                </div>
              </Card>
              <div style={{ margin: '10px 0 50px 0' }}>
                <div className='d-flex justify-content-between'>
                  <div>
                    <span>Bộ lọc: </span>{' '}
                    <Select
                      style={{ width: 200, marginRight: 5 }}
                      placeholder='Hãng hàng không'
                    >
                      <Select.Option value='1'>VietJet Air</Select.Option>
                      <Select.Option value='2'>Vietnam Airline</Select.Option>
                    </Select>
                    <Select style={{ width: 200 }} placeholder='Hạng vé'>
                      <Select.Option value='1'>1</Select.Option>
                      <Select.Option value='2'>2</Select.Option>
                    </Select>
                  </div>
                  <div>
                    <span>Giá vé: </span>{' '}
                    <Select style={{ width: 200 }} placeholder='Tăng dần'>
                      <Select.Option value='1'>Tăng dần </Select.Option>
                      <Select.Option value='2'>Giảm dần</Select.Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div>{this.showFlyTo(returnFlights)}</div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default SearchFlightResult
