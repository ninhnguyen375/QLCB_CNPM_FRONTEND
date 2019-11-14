import React, { Component } from 'react'
import { Form, Input, Button, Card, notification, Icon } from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { handleError } from '../../../common/utils/handleError'
import { updateAirport } from '../handlers'

class EditAirportForm extends Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    this.setState({ loading: true })
    e.preventDefault()

    const { form, airport } = this.props

    if (!airport && !airport.id) {
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
          await updateAirport(values, airport.id)
          await this.props.getAirports()
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

  render() {
    const { form, airport } = this.props
    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item hasFeedback label='Tên sân bay'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Tên sân bay là bắt buộc',
                },
              ],
              initialValue: airport ? airport.name || '' : '',
            })(<Input placeholder='Tên sân bay' />)}
          </Form.Item>
          <Form.Item hasFeedback label='Địa Điểm'>
            {getFieldDecorator('location', {
              rules: [
                {
                  required: true,
                  message: 'Địa Điểm',
                },
              ],
              initialValue: airport ? airport.location || '' : '',
            })(<Input placeholder='Địa Điểm' />)}
          </Form.Item>
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

export default Form.create()(EditAirportForm)
