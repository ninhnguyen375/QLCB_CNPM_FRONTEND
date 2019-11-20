import React, { Component } from 'react'
import {
  Form,
  Button,
  Card,
  notification,
  Icon,
  InputNumber,
  TimePicker,
  Select,
  Radio,
  Tag,
  Input,
} from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { handleError } from '../../../common/utils/handleError'
import { updateFlight } from '../handlers'
import removeNullObject from '../../../common/utils/removeObjectNull'
import { getAirportsAsync } from '../../airport/handlers'
import moment from 'moment'
import { minutesToTime } from '../../../common/utils/timeFormater'
import { STATUS, STATUS_COLORS } from '../models'
import { getAirlinesAsync } from '../../airline/handlers'

class EditFlightForm extends Component {
  state = {
    loading: false,
    airports: [],
    flightTicketCategories: [],
  }

  getAirports = async (search = {}) => {
    try {
      const values = removeNullObject(search)
      const res = await getAirportsAsync(undefined, undefined, values)
      this.setState({ airports: res.data })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  async componentDidMount() {
    await this.getAirlines()
    await this.getAirports()
  }

  handleSubmit = e => {
    this.setState({ loading: true })
    e.preventDefault()

    const { form, flight } = this.props
    const { flightTicketCategories } = this.state

    if (!flight && !flight.id) {
      this.setState({ loading: false })
      notification.error('ERROR-001: Missing ID')
      return
    }

    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 50 } },
      async (err, values) => {
        if (err) {
          this.setState({ loading: false })
          return
        }

        try {
          // flightTicketCategories.forEach(f => {
          //   delete f.ticketCategory
          // })

          await updateFlight({ ...values, flightTicketCategories }, flight.id)
          await this.props.getFlights()
          notification.success({ message: 'Thành công' })
          Modal.hide()
        } catch (err) {
          handleError(err, form, notification)
        }
      },
    )
    this.setState({ loading: false })
  }

  handleSearchAirline = value => {
    if (this.searchAirlineTimeout) {
      clearTimeout(this.searchAirlineTimeout)
    }
    this.searchAirlineTimeout = setTimeout(() => {
      this.getAirlines({ name: value })
    }, 500)
  }

  getAirlines = async (search = {}) => {
    try {
      const values = removeNullObject(search)
      const res = await getAirlinesAsync(undefined, undefined, values)
      this.setState({ airlines: res.data })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  handleSearchAirport = value => {
    if (this.searchAirportTimeout) {
      clearTimeout(this.searchAirportTimeout)
    }
    this.searchAirportTimeout = setTimeout(() => {
      this.getAirports({ name: value })
    }, 500)
  }

  componentWillUnmount() {
    clearTimeout(this.searchAirportTimeout)
  }

  handleChangeTicketcategoryPrice = (
    flightTicketCategories,
    index,
  ) => value => {
    let editing = [...flightTicketCategories]
    editing[index] = { ...editing[index], price: value }

    this.setState({ flightTicketCategories: editing })
  }

  render() {
    const { form, flight } = this.props
    const { airports, airlines } = this.state
    const { flightTicketCategories = [] } = flight

    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='col-lg-4'>
              <Form.Item hasFeedback label='Mã chuyến bay'>
                <Tag
                  title='Mã Chuyến Bay'
                  className='tac'
                  style={{ fontSize: '1em', padding: '5px 10px', width: 130 }}
                  color='blue'
                >
                  {flight.id}
                </Tag>
              </Form.Item>
            </div>
            <div className='col-lg-4'>
              <Form.Item hasFeedback label='Thời gian bắt đầu (Giờ : phút)'>
                {getFieldDecorator('startTime', {
                  rules: [
                    {
                      required: true,
                      message: 'Thời gian bắt đầu là bắt buộc',
                    },
                  ],
                  initialValue: moment(
                    minutesToTime(flight.startTime),
                    'HH:mm',
                  ),
                })(
                  <TimePicker
                    format='HH:mm'
                    style={{ width: '100%' }}
                    placeholder='Bắt đầu'
                  />,
                )}
              </Form.Item>
            </div>
            <div className='col-lg-4'>
              <Form.Item hasFeedback label='Thời gian bay (Giờ : phút)'>
                {getFieldDecorator('flightTime', {
                  rules: [
                    {
                      required: true,
                      message: 'Thời gian bay là bắt buộc',
                    },
                  ],
                  initialValue: moment(
                    minutesToTime(flight.flightTime),
                    'HH:mm',
                  ),
                })(
                  <TimePicker
                    format='HH:mm'
                    style={{ width: '100%' }}
                    placeholder='Thời gian bay'
                  />,
                )}
              </Form.Item>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
              <Form.Item hasFeedback label='Sân bay đi'>
                {getFieldDecorator('airportFrom', {
                  rules: [
                    {
                      required: true,
                      message: 'Sân bay đi là bắt buộc',
                    },
                  ],
                  initialValue: flight.airportFrom,
                })(
                  <Select
                    showSearch
                    placeholder='Sân bay đi'
                    notFoundContent={null}
                    onSearch={this.handleSearchAirport}
                    filterOption={false}
                  >
                    {Array.isArray(airports)
                      ? airports.map(airport => (
                          <Select.Option value={airport.id} key={airport.id}>
                            {airport ? airport.name || '' : ''}
                            <br />
                            <Tag>
                              <Icon type='environment' />{' '}
                              {airport ? airport.location || '' : ''}
                            </Tag>
                          </Select.Option>
                        ))
                      : ''}
                  </Select>,
                )}
              </Form.Item>
            </div>
            <div className='col-lg-4'>
              <Form.Item hasFeedback label='Sân bay đến'>
                {getFieldDecorator('airportTo', {
                  rules: [
                    {
                      required: true,
                      message: 'Sân bay đến là bắt buộc',
                    },
                  ],
                  initialValue: flight.airportTo,
                })(
                  <Select
                    showSearch
                    placeholder='Sân bay đến'
                    notFoundContent={null}
                    onSearch={this.handleSearchAirport}
                    filterOption={false}
                  >
                    {Array.isArray(airports)
                      ? airports.map(airport => (
                          <Select.Option value={airport.id} key={airport.id}>
                            {airport ? airport.name || '' : ''}
                            <br />
                            <Tag>
                              <Icon type='environment' />{' '}
                              {airport ? airport.location || '' : ''}
                            </Tag>
                          </Select.Option>
                        ))
                      : ''}
                  </Select>,
                )}
              </Form.Item>
            </div>
            <div className='col-lg-4'>
              <Form.Item hasFeedback label='Tổng Số lượng ghế'>
                {getFieldDecorator('seatsCount', {
                  rules: [
                    {
                      required: true,
                      message: 'Tổng Số lượng ghế là bắt buộc',
                    },
                  ],
                  initialValue: flight.seatsCount,
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    placeholder='Tổng Số lượng ghế'
                  />,
                )}
              </Form.Item>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-4'>
              <Form.Item hasFeedback label='Hãng hàng không'>
                {getFieldDecorator('airlineId', {
                  rules: [
                    {
                      required: true,
                      message: 'Hãng hàng không là bắt buộc',
                    },
                  ],
                  initialValue: Array.isArray(airlines) ? flight.airlineId : '',
                })(
                  <Select
                    showSearch
                    placeholder='Hãng hàng không'
                    notFoundContent={null}
                    onSearch={this.handleSearchAirline}
                    filterOption={false}
                  >
                    {Array.isArray(airlines)
                      ? airlines.map(airline => (
                          <Select.Option value={airline.id} key={airline.id}>
                            {airline ? airline.name || '' : ''}
                          </Select.Option>
                        ))
                      : ''}
                  </Select>,
                )}
              </Form.Item>
            </div>
            <div className='col-lg-4'>
              <Form.Item label='Trạng thái'>
                {getFieldDecorator('status', {
                  rules: [
                    {
                      required: true,
                      message: 'Trạng thái là bắt buộc',
                    },
                  ],
                  initialValue: flight.status,
                })(
                  <Radio.Group
                    style={{ display: 'flex', marginTop: 10 }}
                    onChange={this.handleOnChange}
                  >
                    <Radio key={0} value={0}>
                      <Tag color={STATUS_COLORS[0]}>{STATUS[0]}</Tag>
                    </Radio>
                    <Radio key={1} value={1}>
                      <Tag color={STATUS_COLORS[1]}>{STATUS[1]}</Tag>
                    </Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
            </div>
          </div>

          <div className='container'>
            <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
              II. Giá từng loại vé:
            </div>
            <br />
            <div>
              {flightTicketCategories && Array.isArray(flightTicketCategories)
                ? flightTicketCategories.map((item, i) => (
                    <div style={{ marginBottom: 10 }} key={i}>
                      <Input
                        disabled
                        style={{ width: 200, marginRight: 10 }}
                        placeholder='Loại vé'
                        value={item.ticketCategory.name}
                      />
                      <InputNumber
                        style={{ width: 150, marginRight: 10 }}
                        placeholder='Giá vé'
                        min={1}
                        disabled
                        defaultValue={item.price}
                        onChange={this.handleChangeTicketcategoryPrice(
                          flightTicketCategories,
                          i,
                        )}
                      />
                      <b style={{ marginRight: 10 }}>VNĐ</b>
                    </div>
                  ))
                : ''}
            </div>
          </div>

          <div className='d-flex justify-content-end'>
            <Button
              onClick={() => Modal.hide()}
              icon='close-circle'
              style={{ marginRight: 5 }}
            >
              Hủy
            </Button>
            {this.state.loading ? (
              <Button disabled>
                <Icon type='sync' spin />
                Sửa
              </Button>
            ) : (
              <Button htmlType='submit' type='primary' icon='check-circle'>
                Sửa
              </Button>
            )}
          </div>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(EditFlightForm)
