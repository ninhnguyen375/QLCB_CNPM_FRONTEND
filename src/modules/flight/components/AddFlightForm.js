import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Card,
  notification,
  Icon,
  TimePicker,
  Select,
  InputNumber,
  message,
  Tag,
} from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { createFlightAsync } from '../handlers'
import { handleError } from '../../../common/utils/handleError'
import { getAirportsAsync } from '../../airport/handlers'
import removeNullObject from '../../../common/utils/removeObjectNull'
import { getTicketCategoriesAsync } from '../../ticketcategory/handlers'
import { getAirlinesAsync } from '../../airline/handlers'
import { loading } from '../../../common/effects'

class AddFlightForm extends Component {
  state = {
    loading: false,
    airports: [],
    airlines: [],
    ticketCategories: [],
    addTicketCategories: {
      count: 0,
      selectedKeys: [],
    },
    ticketCategoriesOfFlight: {},
    isShowAddTCButton: true,
  }

  getTicketCategories = async (search = {}) => {
    try {
      const values = removeNullObject(search)
      const res = await getTicketCategoriesAsync(undefined, undefined, {
        ...values,
        pageSize: 999,
      })
      this.setState({ ticketCategories: res.data })
    } catch (err) {
      handleError(err, null, notification)
    }
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

  getAirlines = async (search = {}) => {
    try {
      const values = removeNullObject(search)
      const res = await getAirlinesAsync(undefined, undefined, values)
      this.setState({ airlines: res.data })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  componentDidMount() {
    loading(async () => {
      await Promise.all([
        this.getAirports(),
        this.getTicketCategories(),
        this.getAirlines(),
      ])
    })
  }

  renderTicketAddTicketInput = count => {
    const { ticketCategories, ticketCategoriesOfFlight } = this.state
    let arr = []
    const options = Array.isArray(ticketCategories)
      ? ticketCategories.map(t => (
          <Select.Option key={t.id} value={t.id}>
            {t.name}
          </Select.Option>
        ))
      : ''

    for (let i = 0; i < count; i++) {
      const key = `ticketCategory_${i}`
      const item = ticketCategoriesOfFlight[key]

      arr.push(
        <div
          className='d-flex align-items-center'
          style={{ marginBottom: 10 }}
          key={i}
        >
          <Select
            disabled={item ? item.done : false}
            style={{ width: 200, marginRight: 10 }}
            placeholder='Loại vé'
            onChange={this.handleSelectTicketCategory(key)}
          >
            {options}
          </Select>
          <InputNumber
            style={{ width: 150, marginRight: 10 }}
            placeholder='Giá vé'
            min={1}
            onChange={this.handleInputPriceForTicketCategory(key)}
          />
          <b style={{ marginRight: 10 }}>VNĐ</b>
          {!(item && item.done) ? (
            <Button
              type='primary'
              disabled={!(item && item.ticketCategoryId && item.price)}
              onClick={() => {
                this.setState(
                  {
                    ticketCategoriesOfFlight: {
                      ...ticketCategoriesOfFlight,
                      [key]: {
                        ...ticketCategoriesOfFlight[key],
                        done: true,
                      },
                    },
                    isShowAddTCButton: true,
                  },
                  () => {
                    const {
                      ticketCategoryId,
                    } = this.state.ticketCategoriesOfFlight[key]
                    this.setState({
                      ticketCategories: [
                        ...this.state.ticketCategories.filter(
                          t => t.id !== ticketCategoryId,
                        ),
                      ],
                    })
                  },
                )
              }}
            >
              Thêm
            </Button>
          ) : (
            <Icon
              type='check-circle'
              theme='filled'
              style={{ color: '#0bab0b', fontSize: '1.4em', marginLeft: 10 }}
            />
          )}
        </div>,
      )
    }
    return arr
  }

  handleSelectTicketCategory = name => value => {
    const { ticketCategoriesOfFlight } = this.state
    this.setState({
      ticketCategoriesOfFlight: {
        ...ticketCategoriesOfFlight,
        [name]: {
          ...ticketCategoriesOfFlight[name],
          ticketCategoryId: value,
        },
      },
    })
  }

  handleInputPriceForTicketCategory = name => value => {
    const { ticketCategoriesOfFlight } = this.state
    this.setState({
      ticketCategoriesOfFlight: {
        ...ticketCategoriesOfFlight,
        [name]: {
          ...ticketCategoriesOfFlight[name],
          price: value,
        },
      },
    })
  }

  handleClickAddTicketCategories = () => {
    this.setState({
      addTicketCategories: {
        ...this.state.addTicketCategories,
        count: this.state.addTicketCategories.count + 1,
      },
      isShowAddTCButton: false,
    })
  }

  getTCById = id => {
    const { ticketCategories } = this.state
    return ticketCategories.find(t => t.id === id)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { form } = this.props
    let { ticketCategoriesOfFlight } = this.state

    const flightTicketCategories = Object.values(
      ticketCategoriesOfFlight,
    ).filter(t => t.done)

    // Check required ticketCategories
    flightTicketCategories.filter(
      t =>
        t.ticketCategoryId === 1 ||
        t.ticketCategoryId === 2 ||
        t.ticketCategoryId === 3,
    )
    if (flightTicketCategories.length !== 3) {
      this.setState({ loading: false })
      message.error(
        `Vui lòng nhập đủ 3 loại vé cơ bản: "${this.getTCById(1).name}", "${
          this.getTCById(2).name
        }", "${this.getTCById(3).name}"`,
      )
    }

    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 50 } },
      async (err, values) => {
        if (err) {
          this.setState({ loading: false })
          return
        }

        try {
          await createFlightAsync({ ...values, flightTicketCategories })
          await this.props.getFlights()
          notification.success({ message: 'Thành công' })
          Modal.hide()
        } catch (err) {
          handleError(err, form, notification)
        }
        this.setState({ loading: false })
      },
    )
  }

  handleSearchAirport = value => {
    if (this.searchAirportTimeout) {
      clearTimeout(this.searchAirportTimeout)
    }
    this.searchAirportTimeout = setTimeout(() => {
      this.getAirports({ name: value })
    }, 500)
  }

  handleSearchAirline = value => {
    if (this.searchAirlineTimeout) {
      clearTimeout(this.searchAirlineTimeout)
    }
    this.searchAirlineTimeout = setTimeout(() => {
      this.getAirlines({ name: value })
    }, 500)
  }

  componentWillUnmount() {
    clearTimeout(this.searchAirportTimeout)
    clearTimeout(this.searchAirlineTimeout)
  }

  render() {
    const { form } = this.props
    const { airports, addTicketCategories, airlines } = this.state
    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
            I. Thông tin chuyến bay:
          </div>
          <br />
          <div className='row'>
            <div className='col-lg-4'>
              <Form.Item hasFeedback label='Mã chuyến bay'>
                {getFieldDecorator('id', {
                  rules: [
                    {
                      required: true,
                      message: 'Mã chuyến bay là bắt buộc',
                    },
                  ],
                })(<Input placeholder='Mã chuyến bay' />)}
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
          </div>

          <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
            II. Giá từng loại vé:
          </div>
          <br />
          <div className=''>
            {this.renderTicketAddTicketInput(addTicketCategories.count)}
            <br />
            <Button
              icon='plus-circle'
              disabled={!this.state.isShowAddTCButton}
              onClick={this.handleClickAddTicketCategories}
            >
              Thêm loại vé
            </Button>
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
              <Button disabled type='primary'>
                <Icon type='sync' spin />
                Thêm
              </Button>
            ) : (
              <Button htmlType='submit' type='primary' icon='plus-circle'>
                Thêm
              </Button>
            )}
          </div>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(AddFlightForm)
