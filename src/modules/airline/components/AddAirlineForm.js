import React, { Component } from 'react'
import { Form, Input, Button, Card, notification, Icon } from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { createAirlineAsync } from '../handlers'
import { handleError } from '../../../common/utils/handleError'

class AddAirlineForm extends Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { form } = this.props
    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 50 } },
      async (err, values) => {
        if (err) {
          this.setState({ loading: false })
          return
        }

        try {
          await createAirlineAsync(values)
          await this.props.getAirlines()
          notification.success({ message: 'Thành công' })
          Modal.hide()
        } catch (err) {
          console.log('Ninh Debug: err', err)
          handleError(err, form, notification)
        }
        this.setState({ loading: false })
      },
    )
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label='Mã hãng hàng không'>
            {getFieldDecorator('id', {
              rules: [
                {
                  required: true,
                  message: 'Mã hãng hàng không là bắt buộc',
                },
              ],
            })(<Input placeholder='Mã hãng hàng không' />)}
          </Form.Item>
          <Form.Item label='Tên hãng hàng không'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Tên hãng hàng không là bắt buộc',
                },
              ],
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

export default Form.create()(AddAirlineForm)
