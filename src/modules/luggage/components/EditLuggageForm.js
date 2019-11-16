import React, { Component } from 'react'
import { Form, Input, Button, Card, notification, Icon } from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { handleError } from '../../../common/utils/handleError'
import { updateLuggage } from '../handlers'

class EditLuggageForm extends Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    this.setState({ loading: true })
    e.preventDefault()

    const { form, luggage } = this.props

    if (!luggage && !luggage.id) {
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
          await updateLuggage(values, luggage.id)
          await this.props.getLuggages()
          notification.success({ message: 'Thành công' })
          Modal.hide()
        } catch (err) {
          handleError(err, form, notification)
        }
      },
    )
    this.setState({ loading: false })
  }

  render() {
    const { form, luggage } = this.props
    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item hasFeedback label='Giá tiền'>
            {getFieldDecorator('price', {
              rules: [
                {
                  required: true,
                  message: 'Giá tiền là bắt buộc',
                },
              ],
              initialValue: luggage ? luggage.price || 0 : 0,
            })(<Input placeholder='Giá tiền' />)}
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

export default Form.create()(EditLuggageForm)
