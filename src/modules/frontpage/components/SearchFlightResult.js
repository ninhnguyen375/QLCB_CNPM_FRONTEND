import React, { Component } from 'react'
import { Card, Select, notification } from 'antd'
import FlightItem from './FlightItem'

export class SearchFlightResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFlightFrom: '',
      selectedFlightTo: '',
    }
    this.showFlyFrom = this.showFlyFrom.bind(this)
  }

  completeSelect = values => {
    this.props.setSearchFlightParams({ selectedFlight: values })
    this.props.next()
  }

  handleSelectFlightFrom = id => {
    const { type } = this.props.searchFlightParams
    this.setState({ selectedFlightFrom: id })
    if (type !== 2) return
    this.completeSelect([id])
  }

  handleSelectFlightTo = id => {
    const { selectedFlightFrom } = this.state
    if (!selectedFlightFrom) {
      notification.error({
        message: `Please select selectedFlightFrom`,
      })
      return
    }
    this.completeSelect([this.state.selectedFlightFrom, id])
  }

  componentDidMount() {
    const { searchFlightParams } = this.props
    console.log('Ninh Debug: searchFlightParams', searchFlightParams)
  }

  showFlyFrom() {
    let arr = []
    for (let i = 0; i < 10; i++) {
      const id = `item-fly-from-${i}`
      arr.push(
        <FlightItem
          id={id}
          key={id}
          isSelected={id === this.state.selectedFlightFrom}
          onSelectFlight={this.handleSelectFlightFrom}
        ></FlightItem>,
      )
    }
    return arr
  }

  showFlyTo() {
    let arr = []
    for (let i = 0; i < 5; i++) {
      const id = `item-fly-to${i}`
      arr.push(
        <FlightItem
          id={id}
          key={id}
          isSelected={id === this.state.selectedFlightFrom}
          onSelectFlight={this.handleSelectFlightTo}
        ></FlightItem>,
      )
    }
    return arr
  }

  render() {
    const { type } = this.props.searchFlightParams
    return (
      <div className='search-flight-result'>
        <p className='title'>
          Tìm chuyến bay từ Hà Nội (HAN) đến Hồ Chí Mình (SGN)
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
                  <p>Hà Nội (HAN) đến Hồ Chí Mình (SGN)</p>
                </div>
                <div>
                  <p className='tar'>2 kết quả</p>
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
            <div>{this.showFlyFrom()}</div>
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
                    <p>Hà Nội (HAN) đến Hồ Chí Mình (SGN)</p>
                  </div>
                  <div>
                    <p className='tar'>2 kết quả</p>
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
              <div>{this.showFlyTo()}</div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default SearchFlightResult
