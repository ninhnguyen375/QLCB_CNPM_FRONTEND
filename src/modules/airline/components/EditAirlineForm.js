import React, { Component } from 'react'
import { Form, Input, Button, Card, notification, Icon } from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { handleError } from '../../../common/utils/handleError'
import { updateAirline } from '../handlers'

class EditAirlineForm extends Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    this.setState({ loading: true })
    e.preventDefault()

    const { form, airline } = this.props

    if (!airline && !airline.id) {
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
          await updateAirline(values, airline.id)
          await this.props.getAirlines()
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
    const { form, airline } = this.props
    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item hasFeedback label='Tên hãng hàng không'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Tên hãng hàng không là bắt buộc',
                },
              ],
              initialValue: airline ? airline.name || '' : '',
            })(<Input placeholder='Tên hãng hàng không' />)}
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

export default Form.create()(EditAirlineForm)
