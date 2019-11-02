import React, { Component } from 'react'
import {
  Form,
  Radio,
  Input,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Button,
  Icon,
  Card,
} from 'antd'
import moment from 'moment'

const nowDate = new Date()

class SearchFlightForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 1,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeType = this.handleChangeType.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    const { form, setSearchFlightParams, history } = this.props
    form.validateFields((errors, values) => {
      if (!errors) {
        setSearchFlightParams(values)
        history.push('/search-flight')
      }
    })
  }
  handleChangeType() {
    this.setState({
      type: this.state.type === 1 ? 2 : 1,
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { searchFlightParams } = this.props
    const { type } = this.state
    return (
      <Card title={<b>TÌM CHUYẾN BAY</b>}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('type', {
              initialValue: searchFlightParams.type || 2,
            })(
              <Radio.Group onChange={this.handleChangeType}>
                <Radio value={1}>Khứ hồi</Radio>
                <Radio value={2}>Một chiều</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label='Điểm đi'>
            {getFieldDecorator('from', {
              initialValue: searchFlightParams
                ? searchFlightParams.from || 'Ha Noi'
                : '',
            })(
              <Input
                placeholder='Điểm đi'
                size={'large'}
                prefix={<Icon type='environment' />}
              />,
            )}
          </Form.Item>
          <Form.Item label='Điểm đến'>
            {getFieldDecorator('to', {
              initialValue: searchFlightParams
                ? searchFlightParams.to || 'Da Nang'
                : '',
            })(
              <Input
                placeholder='Điểm đến'
                size={'large'}
                prefix={<Icon type='environment' />}
              />,
            )}
          </Form.Item>
          <Row gutter={6}>
            <Col lg={type === 1 ? 12 : 24}>
              <Form.Item label='Ngày đi'>
                {getFieldDecorator('date_from', {
                  initialValue: moment(nowDate),
                })(
                  <DatePicker
                    style={{ width: '100%' }}
                    size={'large'}
                  ></DatePicker>,
                )}
              </Form.Item>
            </Col>
            {type === 1 ? (
              <Col lg={12}>
                <Form.Item label='Ngày về'>
                  {getFieldDecorator('date_to', {
                    initialValue: moment(nowDate),
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      size={'large'}
                    ></DatePicker>,
                  )}
                </Form.Item>
              </Col>
            ) : null}
          </Row>
          <Row gutter={6}>
            <Col lg={12}>
              <Form.Item label='Số người'>
                {getFieldDecorator('count', {
                  initialValue: searchFlightParams
                    ? searchFlightParams.count || 1
                    : 1,
                })(
                  <InputNumber
                    min={1}
                    prefix={<Icon type='user' />}
                    style={{ width: '100%' }}
                    size={'large'}
                  ></InputNumber>,
                )}
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item style={{ marginTop: 39 }}>
                <Button
                  size='large'
                  style={{ width: '100%' }}
                  type='primary'
                  htmlType='submit'
                >
                  <Icon type='search' /> TÌM CHUYẾN BAY
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}

export default Form.create({ name: 'form-create' })(SearchFlightForm)
