import React from 'react'
import { Card, Form, Icon, Input, Button, Checkbox, notification } from 'antd'

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

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Card
        title={
          <a href='/'>
            <img
              alt='logo'
              src={require('../../../assets/images/logo.png')}
              height={45}
            />
          </a>
        }
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Please input your email!',
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
                { required: true, message: 'Please input your Password!' },
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
            })(<Checkbox>Remember me</Checkbox>)}
            <a href='/' style={{ float: 'right' }}>
              Forgot password
            </a>
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
