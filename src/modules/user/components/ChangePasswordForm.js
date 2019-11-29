import React, { Component } from 'react'
import { Form, notification, message, Button, Icon, Input, Card } from 'antd'
import { changeUserPassword } from '../handlers'
import { handleError } from '../../../common/utils/handleError'
import Modal from '../../../common/components/widgets/Modal'

class ChangePasswordForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, getMe } = this.props
    form.validateFields(async (err, values) => {
      if (err) {
        message.error('Vui lòng nhập đủ thông tin')
        return
      }

      try {
        await changeUserPassword(values)
        notification.success({ message: 'Thành công' })
        await getMe()
        Modal.hide()
      } catch (err) {
        handleError(err, form, notification)
      }
    })
  }

  compareConfirmPassword = async (rule, value) => {
    const password = this.props.form.getFieldValue('newPassword')
    if (password !== value) {
      throw new Error('Mật khẩu xác nhận không khớp')
    }
  }

  render() {
    const { form } = this.props
    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label='Mật khẩu cũ'>
            {form.getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu cũ',
                },
                {
                  pattern: '.{6,}',
                  message: 'Mật khẩu phải lớn hơn 6 ký tự',
                },
              ],
            })(
              <Input.Password
                autoComplete='false'
                placeholder='Nhập mật khẩu cũ'
              />,
            )}
          </Form.Item>
          <Form.Item label='Mật khẩu mới'>
            {form.getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu mới',
                },
                {
                  pattern: '.{6,}',
                  message: 'Mật khẩu phải lớn hơn 6 ký tự',
                },
              ],
            })(
              <Input.Password
                autoComplete='false'
                placeholder='Nhập mật khẩu mới'
              />,
            )}
          </Form.Item>
          <Form.Item label='Nhập lại mật khẩu mới'>
            {form.getFieldDecorator('confirmNewPassword', {
              rules: [
                {
                  validator: this.compareConfirmPassword,
                },
              ],
            })(
              <Input.Password
                autoComplete='false'
                placeholder='Nhập mật khẩu mới'
              />,
            )}
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <Button onClick={() => Modal.hide()} style={{ marginRight: 10 }}>
              Hủy
            </Button>{' '}
            <Button htmlType='submit' type='primary'>
              <Icon type='check' />
              Xác nhận
            </Button>
          </div>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ChangePasswordForm)
