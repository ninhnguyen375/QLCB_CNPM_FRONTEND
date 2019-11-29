import React, { Component } from 'react'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { withRouter } from 'react-router-dom'
import {
  Card,
  Alert,
  Form,
  Input,
  Button,
  Icon,
  message,
  notification,
} from 'antd'
import { handleError } from '../common/utils/handleError'
import { changeUserPassword } from '../modules/user/handlers'
import { connect } from 'react-redux'
import userHandlers from '../modules/user/handlers'

class ChangePasswordPage extends Component {
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
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            {
              url: '/admin/dashboard',
              icon: null,
              title: 'Đổi mật khẩu',
            },
          ]}
        />
        <Card>
          <Alert
            type='warning'
            message='Đổi mật khẩu'
            description='Để đảm bảo thông tin cá nhân, vui lòng đổi mật khẩu để tiếp tục!'
            showIcon
          ></Alert>
          <br />
          <Form onSubmit={this.handleSubmit}>
            {form.getFieldDecorator('oldPassword', {
              initialValue: '12345678',
            })(<Input hidden />)}
            <div className='row'>
              <Form.Item label='Mật khẩu mới' style={{ marginLeft: 15 }}>
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
              <Form.Item
                label='Nhập lại mật khẩu mới'
                style={{ marginLeft: 15 }}
              >
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
              <Form.Item style={{ marginLeft: 15, marginTop: 37 }}>
                <Button onClick={() => this.props.form.resetFields()}>
                  Reset
                </Button>
              </Form.Item>
              <Form.Item style={{ marginLeft: 15, marginTop: 37 }}>
                <Button htmlType='submit' type='primary'>
                  <Icon type='check' />
                  Xác nhận
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </MainLayout>
    )
  }
}

const mapDispatchToProps = userHandlers

export default connect(
  null,
  mapDispatchToProps,
)(Form.create()(withRouter(ChangePasswordPage)))
