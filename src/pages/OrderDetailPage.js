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
  Button,
  notification,
} from 'antd'
import { getCustomerAsync, updateCustomer } from '../modules/customer/handlers'
import removeNullObject from '../common/utils/removeObjectNull'
import CustomBreadcrumb from '../common/components/widgets/CustomBreadcrumb'
import MainLayout from '../common/hocs/MainLayout'
import { handleError } from '../common/utils/handleError'
import { withRouter } from 'react-router-dom'
import { getUserRole } from '../common/utils/authUtils'

class OrderDetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: {},
      isEditing: {
        name: false,
        identifier: false,
        phone: false,
        email: false,
        birthday: false,
      },
      isShowHandleEditButtons: false,
    }
    this.getOrder = this.getOrder.bind(this)
    this.edit = this.edit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  async getOrder() {
    if (this.props.match.params.id) {
      try {
        let result = await getCustomerAsync(this.props.match.params.id)
        console.log('Ninh Debug: result', result)
        this.setState({
          order: result.data,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  componentDidMount() {
    this.getOrder()
  }

  edit(key) {
    this.setState({
      ...this.state,
      isShowHandleEditButtons: true,
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
        await updateCustomer(values, this.props.match.params.id)
        notification.success({
          message: 'Cập nhật thành công',
        })

        this.setState({
          isShowHandleEditButtons: false,
          isEditing: {
            name: false,
            identifier: false,
            phone: false,
            email: false,
            birthday: false,
          },
        })
        await this.getOrder()
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
      isShowHandleEditButtons: false,
    })
  }

  render() {
    const { order, isEditing } = this.state
    const { getFieldDecorator } = this.props.form
    const authRole = getUserRole()

    return (
      <MainLayout mode={this.props.mode}>
        <CustomBreadcrumb
          items={[
            { url: '/admin/dashboard', icon: 'home', title: 'Bảng Điều Khiển' },
            { url: '/admin/customer', icon: 'idcard', title: 'Khách hàng' },
            {
              url: this.props.match.url,
              icon: 'idcard',
              title: 'Thông tin chi tiết',
            },
          ]}
        />
        <Row style={{ display: 'flex' }} gutter={5}>
          <Col lg={7}>
            <Card style={{ height: '100%' }}>
              <Typography.Title
                style={{ textAlign: 'center', marginTop: 15 }}
                level={3}
              >
                {order ? order.fullName : null}
              </Typography.Title>
            </Card>
          </Col>
          <Col lg={17}>
            <Card
              title={<strong>THÔNG TIN CHI TIẾT</strong>}
              style={{ height: '100%' }}
            >
              {order ? (
                <Form onSubmit={this.handleSubmit}>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item
                      label={
                        <strong className='link'>
                          <Icon type='order' /> Họ và tên
                        </strong>
                      }
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <span>{order.fullName}</span>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <strong className='link'>
                          <Icon type='idcard' /> CMND
                        </strong>
                      }
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <span>{order.id}</span>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <strong className='link'>
                          <Icon type='phone' /> SDT
                        </strong>
                      }
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <span>{order.phone}</span>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<strong className='link'>Số lần đặt</strong>}
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <span>{order.bookingCount}</span>
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                  {this.state.isShowHandleEditButtons ? (
                    <div style={{ marginTop: 10, textAlign: 'right' }}>
                      <Button
                        onClick={this.handleReset}
                        style={{ margin: '0px 5px' }}
                      >
                        Hủy
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

export default withRouter(Form.create()(OrderDetailPage))
