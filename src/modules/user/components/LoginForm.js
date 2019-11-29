import React from 'react'
import {
  Card,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  notification,
  Modal,
} from 'antd'
import { Link } from 'react-router-dom'
import modal from '../../../common/components/widgets/Modal'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const { form, login, history } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, values) => {
      if (err) return

      const result = await login(values.email, values.password)
      if (result.success) {
        history.push('/')
      } else {
        notification.error({
          message: result.msg,
        })
      }
    })
  }

  handleShowForgotPasswordForm = values => {
    modal.show(
      <Card>
        Thông tin sẽ được gửi về {values.email}, vui lòng kiểm tra Email của
        bạn.
      </Card>,
      {
        title: <b>QUÊN MẬT KHẨU</b>,
      },
    )
  }

  handleClickForgotPassword = () => {
    const { form } = this.props
    form.validateFields(['email'], (err, values) => {
      if (err) return
      Modal.confirm({
        content: 'Xác nhận quên mật khẩu',
        onOk: () => this.handleShowForgotPasswordForm(values),
      })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Card
        title={
          <Link to='/'>
            <img
              alt='logo'
              src={require('../../../assets/images/logo.png')}
              height={45}
            />
          </Link>
        }
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập Email của bạn!',
                  type: 'email',
                },
              ],
            })(
              <Input
                type='email'
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='Email'
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Vui lòng nhập mật khẩu của bạn!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='password'
                placeholder='Password'
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Ghi nhớ tôi</Checkbox>)}
            <div
              onClick={this.handleClickForgotPassword}
              className='link'
              style={{ float: 'right' }}
            >
              Quên mật khẩu
            </div>
          </Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Log in
          </Button>
        </Form>
      </Card>
    )
  }
}

export default Form.create({ name: 'normal_login' })(LoginForm)
