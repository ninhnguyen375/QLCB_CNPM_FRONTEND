import React, { Component } from 'react'
import { Form, Input, Button, Card, notification } from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { createUserAsync } from '../handlers'
import { handleError } from '../../../common/utils/handleError'

class AddUserForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form } = this.props
    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 50 } },
      async (err, values) => {
        if (err) {
          return
        }

        try {
          await createUserAsync(values)
          await this.props.getUsers()
          notification.success({ message: 'Thành công' })
          Modal.hide()
        } catch (err) {
          console.log('Ninh Debug: err', err)
          handleError(err, form, notification)
        }
      },
    )
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label='CMND'>
            {getFieldDecorator('identifier', {
              rules: [
                {
                  pattern: '[0-9]{9,}',
                  message: 'Vui lòng nhập đúng định dạng CMND',
                },
                {
                  required: true,
                  message: 'CMND là bắt buộc',
                },
              ],
            })(<Input placeholder='CMND' />)}
          </Form.Item>
          <Form.Item label='Họ tên'>
            {getFieldDecorator('fullname', {
              rules: [
                {
                  required: true,
                  message: 'Họ tên là bắt buộc',
                },
              ],
            })(<Input placeholder='Họ tên' />)}
          </Form.Item>
          <Form.Item label='SĐT'>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: 'SĐT là bắt buộc',
                },
                {
                  pattern: '[0-9]{10}',
                  message: 'Vui lòng nhập đúng định dạng SĐT',
                },
              ],
            })(<Input placeholder='SĐT' />)}
          </Form.Item>
          <Form.Item label='Email'>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Email là bắt buộc',
                },
                {
                  type: 'email',
                  message: 'Vui lòng nhập đúng định dạng Email',
                },
              ],
            })(<Input placeholder='Email' />)}
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <Button onClick={() => Modal.hide()} style={{ marginRight: 5 }}>
              Hủy
            </Button>
            <Button htmlType='submit' type='primary'>
              Thêm
            </Button>
          </div>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(AddUserForm)
