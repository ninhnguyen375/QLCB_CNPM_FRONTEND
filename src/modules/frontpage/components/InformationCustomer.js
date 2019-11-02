import React, { Component } from 'react'
import { Card, Form, Input, Icon, Divider } from 'antd'
import point from '../../../assets/images/01-point.png'

class InformationCustomer extends Component {
  showCustomer(count) {
    const { getFieldDecorator } = this.props.form
    let arr = []
    for (let i = 0; i < count; i++) {
      arr.push(
        <Form.Item key={i} className='text-left' label={`Khách hàng ${i + 1}`}>
          {getFieldDecorator(`customers[${i}]`)(
            <Input
              prefix={<Icon type='user' />}
              style={{ width: '100%' }}
              placeholder='Họ và tên khách hàng'
            ></Input>,
          )}
        </Form.Item>,
      )
    }
    return arr
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { count } = this.props.searchFlightParams
    return (
      <div className='information-customer'>
        <h5 className='title'>
          Tìm chuyến bay từ Hà Nội (HAN) đến Hồ Chí Mình (SGN)
        </h5>
        <div>
          <div
            style={{
              marginBottom: 10,
              border: '1px solid #1890FF',
              padding: '20px',
              borderRadius: 10,
            }}
          >
            <div className='d-flex flex-wrap justify-content-between'>
              <div className='row d-flex align-items-center justify-content-between'>
                <div className='col'>
                  <p className='fwb'>Hà Nội</p>
                  <p>21:15, 12/11/2019</p>
                  <p>Sân Bay Nội Bài</p>
                </div>
                <div className='col'>
                  <img
                    alt='point'
                    style={{ paddingBottom: 10, paddingLeft: 7 }}
                    src={point}
                  />
                </div>
                <div className='col'>
                  <p className='fwb'>Hồ Chí Minh</p>
                  <p>21:15, 12/11/2019</p>
                  <p>Sân Bay Tân Sơn Nhất</p>
                </div>
              </div>
              <Divider type='vertical' style={{ height: 80 }} />
              <div>
                <p>Loại vé:</p>
                <p>Vé loại 1</p>
              </div>
              <Divider type='vertical' style={{ height: 80 }} />
              <div>
                <p>Số lượng:</p>
                <p>2</p>
              </div>
              <Divider type='vertical' style={{ height: 80 }} />
              <div>
                <p>Giá vé:</p>
                <p>200.000đ</p>
              </div>
              <Divider type='vertical' style={{ height: 80 }} />
              <div>
                <p className='fwb'>Tổng cộng</p>
                <p>400.000đ</p>
              </div>
            </div>
            <Divider />
            <div>
              <p className='fwb tar'>
                Số tiền bạn phải trả:{' '}
                <span className='fwb' style={{ color: '#FFA801' }}>
                  400.000đ
                </span>
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 30 }}></div>
        <div className='row'>
          <div className='col-lg-6'>
            <Card title={<b>THÔNG TIN KHÁCH HÀNG</b>}>
              <Form>{this.showCustomer(count)}</Form>
            </Card>
          </div>
          <div className='col-lg-6'>
            <Card title={<b>THÔNG TIN NGƯỜI ĐẶT</b>}>
              <Form>
                <Form.Item className='text-left' label='Họ và tên'>
                  {getFieldDecorator('fullname_customer_book')(
                    <Input
                      prefix={<Icon type='user' />}
                      style={{ width: '100%' }}
                    ></Input>,
                  )}
                </Form.Item>
                <Form.Item className='text-left' label='Email'>
                  {getFieldDecorator('email_customer_book')(
                    <Input
                      prefix={<Icon type='mail' />}
                      style={{ width: '100%' }}
                    ></Input>,
                  )}
                </Form.Item>
                <Form.Item className='text-left' label='Số điện thoại'>
                  {getFieldDecorator('phonenumber_customer_book')(
                    <Input
                      prefix={<Icon type='phone' />}
                      style={{ width: '100%' }}
                    ></Input>,
                  )}
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default InformationCustomer
