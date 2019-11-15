import React, { Component } from 'react'
import {
  Form,
  Radio,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Button,
  Icon,
  Card,
  Select,
  notification,
} from 'antd'
import moment from 'moment'
import removeNullObject from '../../../common/utils/removeObjectNull'
import { getAirportsAsync } from '../../airport/handlers'
import { handleError } from '../../../common/utils/handleError'
import { getTicketCategoriesAsync } from '../../ticketcategory/handlers'

const nowDate = new Date()

class SearchFlightForm extends Component {
  state = {
    airports: [],
    type: this.props.searchFlightParams
      ? this.props.searchFlightParams.type || 1
      : 1,
    ticketCategories: [],
  }

  componentWillUnmount() {
    clearTimeout(this.searchAirportTimeout)
  }

  handleSearchAirport = value => {
    if (this.searchAirportTimeout) {
      clearTimeout(this.searchAirportTimeout)
    }
    this.searchAirportTimeout = setTimeout(() => {
      this.getAirports({ location: value })
    }, 500)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, setSearchFlightParams, history } = this.props

    form.validateFields((errors, values) => {
      if (errors) return

      // Mapping ticketCategories
      const ticketCategories = []
      Array.isArray(values.ticketCategoriesInForm) &&
        values.ticketCategoriesInForm.forEach((t, i) => {
          ticketCategories.push({
            id: i,
            ...t,
          })
        })

      setSearchFlightParams({ ...values, ticketCategories })
      history.push('/search-flight')
    })
  }

  handleChangeType = () => {
    this.setState({
      type: this.state.type === 1 ? 2 : 1,
    })
  }

  disabledDate = current => {
    return current && current < moment().startOf('day')
  }

  getAirports = async (search = {}) => {
    try {
      const values = removeNullObject(search)
      const res = await getAirportsAsync(undefined, undefined, {
        ...values,
        pageSize: 9999,
      })
      this.setState({ airports: res.data })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  getTicketCategories = async (search = {}) => {
    try {
      const values = removeNullObject(search)
      const res = await getTicketCategoriesAsync(undefined, undefined, {
        ...values,
        pageSize: 9999,
      })
      this.setState({ ticketCategories: res.data })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  componentDidMount() {
    this.getAirports()
    this.getTicketCategories()
  }

  renderTicketCategories = (ticketCategories = []) => {
    if (!Array.isArray(ticketCategories)) {
      throw new Error('ticketCategories must be array')
    }

    const { searchFlightParams, form } = this.props
    const { getFieldDecorator } = form

    return ticketCategories.map(t => (
      <Form.Item key={t.id} label={t ? t.name : '--'} style={{ width: '30%' }}>
        {getFieldDecorator(`ticketCategoriesInForm[${t.id}].quantity`, {
          initialValue:
            searchFlightParams &&
            searchFlightParams.ticketCategoriesInForm &&
            searchFlightParams.ticketCategoriesInForm[t.id]
              ? searchFlightParams.ticketCategoriesInForm[t.id].quantity
              : 1,
        })(
          <InputNumber
            min={0}
            max={9}
            prefix={<Icon type='user' />}
            style={{ width: '100%' }}
            size={'large'}
          ></InputNumber>,
        )}
      </Form.Item>
    ))
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { searchFlightParams } = this.props
    const { airports, ticketCategories, type } = this.state

    return (
      <Card
        style={{ height: '583px', overflow: 'auto' }}
        title={<b>TÌM CHUYẾN BAY</b>}
      >
        <Form onSubmit={this.handleSubmit}>
          <div className='tac'>
            {getFieldDecorator('type', {
              initialValue: searchFlightParams.type || 1,
            })(
              <Radio.Group size='large' onChange={this.handleChangeType}>
                <Radio value={1}>Khứ hồi</Radio>
                <Radio value={2}>Một chiều</Radio>
              </Radio.Group>,
            )}
          </div>

          <div>
            <Form.Item label='Điểm đi'>
              {getFieldDecorator('airportFrom', {
                rules: [{ required: true, message: 'Vui lòng chọn điểm đi' }],
                initialValue: searchFlightParams
                  ? searchFlightParams.airportFrom
                  : '',
              })(
                <Select
                  suffixIcon={
                    <span>
                      ĐIỂM ĐI <Icon type='down' />
                    </span>
                  }
                  size='large'
                  showSearch
                  placeholder='Điểm đi'
                  notFoundContent={null}
                  onSearch={this.handleSearchAirport}
                  filterOption={false}
                  menuItemSelectedIcon={<Icon type='environment' />}
                >
                  {Array.isArray(airports)
                    ? airports.map(airport => (
                        <Select.Option value={airport.id} key={airport.id}>
                          {airport ? airport.location || '' : ''}
                        </Select.Option>
                      ))
                    : ''}
                </Select>,
              )}
            </Form.Item>
          </div>

          <div>
            <Form.Item label='Điểm đến'>
              {getFieldDecorator('airportTo', {
                rules: [{ required: true, message: 'Vui lòng chọn điểm đến' }],
                initialValue: searchFlightParams
                  ? searchFlightParams.airportTo
                  : '',
              })(
                <Select
                  suffixIcon={
                    <div>
                      ĐIỂM ĐẾN <Icon type='down' />
                    </div>
                  }
                  size='large'
                  showSearch
                  placeholder='Điểm đến'
                  notFoundContent={null}
                  onSearch={this.handleSearchAirport}
                  filterOption={false}
                  menuItemSelectedIcon={<Icon type='environment' />}
                >
                  {Array.isArray(airports)
                    ? airports.map(airport => (
                        <Select.Option value={airport.id} key={airport.id}>
                          {airport ? airport.location || '' : ''}
                        </Select.Option>
                      ))
                    : ''}
                </Select>,
              )}
            </Form.Item>
          </div>

          <Row style={{ marginTop: 10 }} gutter={6}>
            <Col lg={type === 1 ? 12 : 24}>
              <Form.Item label='Ngày đi'>
                {getFieldDecorator('departureDate', {
                  rules: [{ required: true, message: 'Vui lòng chọn ngày đi' }],
                  initialValue: moment(nowDate),
                })(
                  <DatePicker
                    disabledDate={this.disabledDate}
                    style={{ width: '100%' }}
                    size={'large'}
                  ></DatePicker>,
                )}
              </Form.Item>
            </Col>
            {type === 1 ? (
              <Col lg={12}>
                <Form.Item label='Ngày về'>
                  {getFieldDecorator('returnDate', {
                    rules: [
                      { required: true, message: 'Vui lòng chọn ngày về' },
                    ],
                    initialValue: moment(nowDate),
                  })(
                    <DatePicker
                      disabledDate={this.disabledDate}
                      style={{ width: '100%' }}
                      size={'large'}
                    ></DatePicker>,
                  )}
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
          </Row>

          <div className='d-flex justify-content-between flex-wrap'>
            {this.renderTicketCategories(ticketCategories || [])}
          </div>

          <div>
            <Button
              size='large'
              style={{ width: '100%' }}
              type='primary'
              htmlType='submit'
            >
              <Icon type='search' /> TÌM CHUYẾN BAY
            </Button>
          </div>
        </Form>
      </Card>
    )
  }
}

export default Form.create({ name: 'form-create' })(SearchFlightForm)
