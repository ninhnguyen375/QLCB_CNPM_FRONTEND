import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Card,
  notification,
  Icon,
  InputNumber,
  TimePicker,
  Select,
  Radio,
  Tag,
} from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { handleError } from '../../../common/utils/handleError'
import { updateFlight } from '../handlers'
import removeNullObject from '../../../common/utils/removeObjectNull'
import { getAirportsAsync } from '../../airport/handlers'
import moment from 'moment'
import { minutesToTime } from '../../../common/utils/timeFormater'
import { STATUS, STATUS_COLORS } from '../models'

class EditFlightForm extends Component {
  state = {
    loading: false,
    airports: [],
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

  componentDidMount() {
    this.getAirports()
  }

  handleSubmit = e => {
    this.setState({ loading: true })
    e.preventDefault()

    const { form, flight } = this.props

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
          await updateFlight(values, flight.id)
          await this.props.getFlights()
          notification.success({ message: 'Thành công' })
          Modal.hide()
        } catch (err) {
          console.log('Ninh Debug: err', err)
          handleError(err, form, notification)
        }
      },
    )
    this.setState({ loading: false })
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
    clearTimeout(this.searchAirportTimeoutĐiện)
  }

  render() {
    const { form, flight } = this.props
    const { airports } = this.state

    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='col-lg-4'>
              <Form.Item label='Mã chuyến bay'>
                {getFieldDecorator('id', {
                  rules: [
                    {
                      required: true,
                      message: 'Mã chuyến bay là bắt buộc',
                    },
                  ],
                  initialValue: flight.id,
                })(<Input placeholder='Mã chuyến bay' />)}
              </Form.Item>
            </div>
            <div className='col-lg-4'>
              <Form.Item label='Thời gian bắt đầu (Giờ : phút)'>
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
              <Form.Item label='Thời gian bay (Giờ : phút)'>
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
              <Form.Item label='Sân bay đi'>
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
                          </Select.Option>
                        ))
                      : ''}
                  </Select>,
                )}
              </Form.Item>
            </div>
            <div className='col-lg-4'>
              <Form.Item label='Sân bay đến'>
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
                          </Select.Option>
                        ))
                      : ''}
                  </Select>,
                )}
              </Form.Item>
            </div>
            <div className='col-lg-4'>
              <Form.Item label='Tổng Số lượng ghế'>
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
            <div className='col'>
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
                    style={{ display: 'flex' }}
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
