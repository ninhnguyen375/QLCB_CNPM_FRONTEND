import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  Icon,
  Divider,
  notification,
  Tag,
  Select,
} from 'antd'
import point from '../../../assets/images/01-point.png'
import { getValueFromObj } from '../../../common/utils/makeupObject'
import { handleError } from '../../../common/utils/handleError'
import { getFlightAsync } from '../../flight/handlers'
import {
  minutesToTime,
  minutesToTimeWithType,
} from '../../../common/utils/timeFormater'
import moment from 'moment'
import { priceFormat } from '../../../common/utils/stringFormater'
import { getLuggagesAsync } from '../../luggage/handlers'
import { getCount } from '../../../common/utils/numberUtils'

class InformationCustomer extends Component {
  state = {
    departureFlight: {},
    returnFlight: {},
    departureTotalPrice: '',
    returnTotalPrice: '',
    luggages: [],
    departureLuggage: null,
    returnLuggage: null,
  }

  getLuggages = async () => {
    try {
      const res = await getLuggagesAsync(null, 99999)
      this.setState({ luggages: res.data })
    } catch (error) {
      handleError(error, null, notification)
      return {}
    }
  }

  renderInputPassengersForm(ticketCategories = []) {
    const { form, searchFlightParams } = this.props
    const { type } = searchFlightParams
    const { getFieldDecorator } = form
    const { luggages = [] } = this.state

    let arr = []
    let i = 0

    ticketCategories
      .filter(t => t.quantity > 0)
      .forEach(item => {
        const { quantity, id: ticketCategoryId } = item

        for (let j = 0; j < quantity; j++, i++) {
          arr.push(
            <div key={i}>
              <Form.Item
                hasFeedback
                className='text-left'
                label={`Hành khách ${i + 1}:`}
              >
                {getFieldDecorator(`passengers[${i}].passengerName`, {
                  rules: [{ required: true, message: 'Họ và tên là bắt buộc' }],
                })(
                  <Input
                    placeholder='Họ và tên'
                    addonAfter={getFieldDecorator(
                      `passengers[${i}].passengerGender`,
                      {
                        initialValue: 0,
                      },
                    )(
                      <Select>
                        <Select.Option value={0}>Nam</Select.Option>
                        <Select.Option value={1}>Nữ</Select.Option>
                      </Select>,
                    )}
                    style={{ width: '100%' }}
                    placeholder='Họ và tên hành khách'
                  ></Input>,
                )}
              </Form.Item>
              <Form.Item
                hasFeedback
                className='text-left'
                label={`Hành lý mang thêm:`}
              >
                {getFieldDecorator(`passengers[${i}].luggageids[0]`, {
                  initialValue: 1,
                })(
                  <Select
                    onChange={this.handleSelectLuggage(
                      i,
                      0,
                      'departureLuggage',
                    )}
                  >
                    {luggages.map(l => (
                      <Select.Option value={l.id} key={`d${l.id}`}>
                        {l.luggageWeight}Kg + {l.price}VNĐ
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
              {type === 1 ? (
                <Form.Item
                  hasFeedback
                  className='text-left'
                  label={`Hành lý mang thêm khi về:`}
                >
                  {getFieldDecorator(`passengers[${i}].luggageids[1]`, {
                    initialValue: 1,
                  })(
                    <Select
                      onChange={this.handleSelectLuggage(i, 1, 'returnLuggage')}
                    >
                      {luggages.map(l => (
                        <Select.Option value={l.id} key={`r${l.id}`}>
                          {l.luggageWeight}Kg + {l.price}VNĐ
                        </Select.Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>
              ) : (
                ''
              )}
              {getFieldDecorator(`passengers[${i}].ticketCategoryId`, {
                initialValue: ticketCategoryId,
              })(<Input hidden={true} />)}
            </div>,
          )
        }
      })

    return arr
  }

  getFlight = async id => {
    if (!id) {
      throw new Error('Missing Id')
    }

    try {
      const res = await getFlightAsync(id)
      return res.data
    } catch (error) {
      handleError(error, null, notification)
      return {}
    }
  }

  getSelectedFlight = async (departureFlightId, returnFlightId) => {
    const arr = []

    departureFlightId &&
      arr.push(async () => {
        const res = await this.getFlight(departureFlightId)
        this.setState({ departureFlight: res })
      })

    returnFlightId &&
      arr.push(async () => {
        const res = await this.getFlight(returnFlightId)
        this.setState({ returnFlight: res })
      })

    await Promise.all(arr.map(a => a()))
  }

  async componentDidMount() {
    const departureFlightId = getValueFromObj(
      'searchFlightParams.selectedFlight.departureFlight',
      this.props,
    )
    const returnFlightId = getValueFromObj(
      'searchFlightParams.selectedFlight.returnFlight',
      this.props,
    )

    this.getLuggages()
    await this.getSelectedFlight(departureFlightId, returnFlightId)
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

  renderSelectedFlight = (
    flight = {},
    ticketCategoriesInForm,
    departureDate,
    departureLuggage,
  ) => {
    const flightTicketCategories = flight
      ? flight.flightTicketCategories || []
      : []

    return (
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
              <p className='tac'>{minutesToTimeWithType(flight.flightTime)}</p>
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
                  `${departureDate}, ${minutesToTime(flight.startTime)}`,
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
                const quantity = ticketCategoriesInForm[ftc.ticketCategoryId]
                  ? ticketCategoriesInForm[ftc.ticketCategoryId].quantity
                  : 0
                if (quantity === 0) return ''
                return (
                  <p key={ftc.flightId + ftc.ticketCategoryId}>
                    {ticketCategoryName} + {priceFormat(ticketCategoryPrice)}
                    VNĐ
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
                const quantity = ticketCategoriesInForm[ftc.ticketCategoryId]
                  ? ticketCategoriesInForm[ftc.ticketCategoryId].quantity
                  : 0
                if (quantity === 0) return ''
                return (
                  <p className='tac' key={ftc.flightId + ftc.ticketCategoryId}>
                    {quantity}
                  </p>
                )
              })
            : ''}
        </div>
        <Divider type='vertical' style={{ height: 80 }} />
        <div className='tar'>
          <p className='fwb'>Tổng cộng</p>
          {Array.isArray(flightTicketCategories)
            ? flightTicketCategories.map(ftc => {
                const quantity = ticketCategoriesInForm[ftc.ticketCategoryId]
                  ? ticketCategoriesInForm[ftc.ticketCategoryId].quantity
                  : 0
                const ticketCategoryPrice = ftc
                  ? ftc.price || 99999999
                  : 99999999
                if (quantity === 0) return ''
                return (
                  <p key={ftc.flightId + ftc.ticketCategoryId}>
                    {priceFormat(
                      parseFloat(ticketCategoryPrice) * parseFloat(quantity),
                    )}
                    VNĐ
                  </p>
                )
              })
            : ''}
        </div>

        <Divider type='vertical' style={{ height: 80 }} />
        <div>
          <p>Hành lý mang thêm:</p>
          <p>
            {!departureLuggage
              ? 'Không có'
              : `+${priceFormat(departureLuggage)}VNĐ`}
          </p>
        </div>
      </div>
    )
  }

  getLuggageById = id => {
    const { luggages } = this.state
    return luggages.find(l => l.id === id)
  }

  handleSelectLuggage = (passengerIndex, luggageIndex, stateKey) => id => {
    const { form } = this.props
    const { getFieldValue } = form
    const passengers = [...getFieldValue('passengers')]
    passengers[passengerIndex].luggageids[luggageIndex] = id

    const total = this.getTotalLuggagePrice(passengers)

    this.setState({ [stateKey]: total })
  }

  getTotalLuggagePrice = (passengers = []) => {
    let total = 0
    passengers.forEach(p => {
      const { luggageids = [] } = p
      luggageids.forEach(id => {
        const luggage = this.getLuggageById(id) || {}
        const { price } = luggage
        total += parseFloat(price)
      })
    })

    return total
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {
      departureFlight,
      returnFlight,
      departureLuggage,
      returnLuggage,
    } = this.state
    const { searchFlightParams = {} } = this.props
    let {
      departureDate,
      returnDate,
      ticketCategoriesInForm,
      ticketCategories,
    } = searchFlightParams
    departureDate = moment(departureDate)
      .format('DD-MM-YYYY')
      .toString()
    returnDate = moment(returnDate)
      .format('DD-MM-YYYY')
      .toString()

    const departureFlightTicketCategories = departureFlight
      ? departureFlight.flightTicketCategories || []
      : []
    const returnFlightTicketCategories = returnFlight
      ? returnFlight.flightTicketCategories || []
      : []
    const departureTotalPrice = this.getTotalPrice(
      departureFlightTicketCategories || [],
      ticketCategoriesInForm || [],
    )
    const returnTotalPrice = this.getTotalPrice(
      returnFlightTicketCategories || [],
      ticketCategoriesInForm || [],
    )

    const orderTotalPrice = getCount(
      departureTotalPrice,
      returnTotalPrice,
      departureLuggage,
      returnLuggage,
    )

    return (
      <div className='information-customer'>
        <div style={{ marginTop: 30 }}></div>
        <div>
          <div
            style={{
              marginBottom: 10,
              border: '1px solid #1890FF',
              padding: '20px',
              borderRadius: 10,
            }}
          >
            {departureFlight
              ? this.renderSelectedFlight(
                  departureFlight,
                  ticketCategoriesInForm,
                  departureDate,
                  departureLuggage,
                )
              : ''}

            {returnFlight && returnFlight.id ? <Divider /> : ''}

            {returnFlight && returnFlight.id
              ? this.renderSelectedFlight(
                  returnFlight,
                  ticketCategoriesInForm,
                  returnDate,
                  returnLuggage,
                )
              : ''}

            <Divider />
            <div>
              <p className='fwb tar'>
                Số tiền bạn phải trả:{' '}
                <span className='fwb' style={{ color: '#FFA801' }}>
                  {priceFormat(orderTotalPrice)}VNĐ
                </span>
                {getFieldDecorator('totalPrice', {
                  initialValue: orderTotalPrice,
                })(<Input hidden />)}
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 30 }}></div>
        <div className='row'>
          <div className='col-lg-6'>
            <Card
              style={{ height: 436, overflow: 'auto' }}
              title={<b>THÔNG TIN HÀNH KHÁCH</b>}
            >
              <Form>{this.renderInputPassengersForm(ticketCategories)}</Form>
            </Card>
          </div>

          <div className='col-lg-6'>
            <Card title={<b>THÔNG TIN NGƯỜI ĐẶT</b>}>
              <Form>
                <p>
                  Thông tin sẽ được sử dụng để đối chiếu khi quý khách thực hiện
                  thanh toán.
                </p>
                <Form.Item hasFeedback className='text-left' label='CMND'>
                  {getFieldDecorator('customerId', {
                    rules: [
                      {
                        required: true,
                        message: 'CMND là bắt buộc',
                      },
                    ],
                  })(
                    <Input
                      prefix={<Icon type='idcard' />}
                      style={{ width: '100%' }}
                      placeholder='CMND'
                    ></Input>,
                  )}
                </Form.Item>
                <Form.Item hasFeedback className='text-left' label='Họ và tên'>
                  {getFieldDecorator('fullName', {
                    rules: [
                      {
                        required: true,
                        message: 'Họ và tên khách hàng là bắt buộc',
                      },
                    ],
                  })(
                    <Input
                      prefix={<Icon type='user' />}
                      style={{ width: '100%' }}
                      placeholder='Họ và tên'
                    ></Input>,
                  )}
                </Form.Item>
                <Form.Item
                  hasFeedback
                  className='text-left'
                  label='Số điện thoại'
                >
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: 'SĐT khách hàng là bắt buộc',
                      },
                    ],
                  })(
                    <Input
                      prefix={<Icon type='phone' />}
                      style={{ width: '100%' }}
                      placeholder='SĐT'
                    ></Input>,
                  )}
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default InformationCustomer
