import React, { Component } from 'react'
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Descriptions,
  Icon,
  Form,
  Input,
  Button,
  notification,
  DatePicker,
} from 'antd'
import moment from 'moment'
import { getUserAsync, updateUser } from '../modules/user/handlers'
import removeNullObject from '../common/utils/removeObjectNull'
import { emptyString } from '../modules/user/models'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { handleError } from '../common/utils/handleError'
import { withRouter } from 'react-router-dom'

class UserDetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      isEditing: {
        name: false,
        identifier: false,
        phone: false,
        email: false,
        birthday: false,
      },
    }
    this.getUser = this.getUser.bind(this)
    this.edit = this.edit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.showEdittingButton = this.showEdittingButton.bind(this)
  }
  async getUser() {
    if (this.props.match.params.id) {
      try {
        let result = await getUserAsync(this.props.match.params.id)
        console.log('Ninh Debug: result', result)
        this.setState({
          user: result.user,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  componentDidMount() {
    this.getUser()
  }
  edit(key) {
    this.setState({
      ...this.state,
      isEditing: {
        ...this.state.isEditing,
        [key]: !this.state.isEditing[key],
      },
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const { form } = this.props
    form.validateFields(async (errors, values) => {
      if (errors) return
      try {
        values = removeNullObject(values)
        let result = await updateUser(values, this.props.match.params.id)
        notification.success({
          message: 'Cập nhật thành công',
        })
        this.setState({
          isEditing: {
            name: false,
            identifier: false,
            phone: false,
            email: false,
            birthday: false,
          },
        })
        await this.getUser()
      } catch (err) {
        handleError(err, form, notification)
      }
    })
  }
  handleReset() {
    this.setState({
      isEditing: {
        name: false,
        identifier: false,
        phone: false,
        email: false,
        birthday: false,
      },
    })
    this.props.form.resetFields()
  }

  showEdittingButton() {
    const { isEditing } = this.state
    const values = this.props.form.getFieldsValue()
    for (const key in values) {
      if (isEditing[key] !== values[key]) return true
    }
    return false
  }
  render() {
    const { user, isEditing } = this.state
    const { getFieldDecorator } = this.props.form
    console.log(this.props)

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng điều khiển' },
            { url: '/admin/user', icon: 'user', title: 'Nhân viên' },
            {
              url: this.props.match.url,
              icon: 'user',
              title: 'Thông tin chi tiết',
            },
          ]}
        />
        <Row style={{ display: 'flex' }} gutter={5}>
          <Col lg={7}>
            <Card style={{ height: '100%' }}>
              <Avatar
                style={{
                  width: '100%',
                  height: 200,
                  maxWidth: 200,
                  minWidth: 200,
                  display: 'block',
                  margin: 'auto',
                }}
                src={require('../assets/images/user.svg')}
              />
              <Typography.Title
                style={{ textAlign: 'center', marginTop: 15 }}
                level={3}
              >
                {user ? user.fullName : null}
              </Typography.Title>
            </Card>
          </Col>
          <Col lg={17}>
            <Card
              title={<strong>Thông tin cá nhân</strong>}
              style={{ height: '100%' }}
            >
              {user ? (
                <Form onSubmit={this.handleSubmit}>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label={<strong>Họ và tên</strong>}>
                      <div style={{ overflow: 'hidden' }}>
                        {isEditing.fullName ? (
                          <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator('fullName', {
                              rules: [
                                {
                                  required: true,
                                  message: 'Mời điền họ và tên',
                                },
                              ],
                              initialValue: user.fullName,
                            })(<Input placeholder='Mời điền họ và tên' />)}
                          </Form.Item>
                        ) : (
                          <span>{user.fullName}</span>
                        )}
                        {isEditing.fullName ? null : (
                          <span style={{ float: 'right' }}>
                            <Icon
                              onClick={() => this.edit('fullName')}
                              type='edit'
                              style={{ color: 'blue' }}
                            />
                          </span>
                        )}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>CMND</strong>}>
                      <div style={{ overflow: 'hidden' }}>
                        {isEditing.identifier ? (
                          <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator('identifier', {
                              rules: [
                                {
                                  required: true,
                                  message: 'Mời điền CMND',
                                },
                              ],
                              initialValue: user.identifier,
                            })(<Input placeholder='Mời điền CMND' />)}
                          </Form.Item>
                        ) : (
                          <span>{user.identifier}</span>
                        )}
                        {isEditing.identifier ? null : (
                          <span style={{ float: 'right' }}>
                            <Icon
                              onClick={() => this.edit('identifier')}
                              type='edit'
                              style={{ color: 'blue' }}
                            />
                          </span>
                        )}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>SDT</strong>}>
                      <div style={{ overflow: 'hidden' }}>
                        {isEditing.phone ? (
                          <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator('phone', {
                              initialValue: user.phone,
                            })(<Input placeholder='Mời điền SDT' />)}
                          </Form.Item>
                        ) : user.phone ? (
                          <span>{user.phone}</span>
                        ) : (
                          emptyString
                        )}

                        {isEditing.phone ? null : (
                          <span style={{ float: 'right' }}>
                            <Icon
                              onClick={() => this.edit('phone')}
                              type='edit'
                              style={{ color: 'blue' }}
                            />
                          </span>
                        )}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>Email</strong>}>
                      <div style={{ overflow: 'hidden' }}>
                        {isEditing.email ? (
                          <Form.Item style={{ marginBottom: 0 }}>
                            {getFieldDecorator('email', {
                              rules: [
                                {
                                  required: true,
                                  message: 'Mời điền email',
                                },
                              ],
                              initialValue: user.email,
                            })(<Input placeholder='Mời điền email' />)}
                          </Form.Item>
                        ) : (
                          <span>{user.email}</span>
                        )}
                        {isEditing.email ? null : (
                          <span style={{ float: 'right' }}>
                            <Icon
                              onClick={() => this.edit('email')}
                              type='edit'
                              style={{ color: 'blue' }}
                            />
                          </span>
                        )}
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                  {this.showEdittingButton() ? (
                    <div style={{ marginTop: 5, textAlign: 'right' }}>
                      <Button
                        onClick={this.handleReset}
                        style={{ margin: '0px 5px' }}
                      >
                        Làm mới
                      </Button>
                      <Button htmlType='submit' type='primary'>
                        Lưu lại
                      </Button>
                    </div>
                  ) : null}
                </Form>
              ) : null}
            </Card>
          </Col>
        </Row>
      </MainLayout>
    )
  }
}

export default withRouter(Form.create()(UserDetailPage))
