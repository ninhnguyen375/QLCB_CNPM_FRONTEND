import React, { Component } from 'react'
import { Row, Col, Card, Divider } from 'antd'
import Lottie from '../../../libraries/Lottie'

export class FinishStepRegister extends Component {
  render() {
    const { searchFlightParams } = this.props
    return (
      <div className='finish-step-register'>
        <Row>
          <Col sm={24} lg={12}>
            <div>
              <Lottie
                options={{
                  animationData: require('../../../assets/animations/1708-success.json'),
                  loop: false,
                }}
                style={{
                  height: 300,
                  margin: 0,
                  padding: 0,
                }}
              />
            </div>
          </Col>
          <Col className='tal border' sm={24} lg={12}>
            <Card style={{ height: '100%' }}>
              <div className='p10'>
                <span className='fwb'>Khách hàng: </span>
                <span>
                  {searchFlightParams.fullname_customer_book ||
                    'Nguyễn Văn Tèo'}
                </span>
              </div>
              <div className='p10'>
                <span className='fwb'>Email: </span>
                <span>
                  {searchFlightParams.email_customer_book ||
                    'teonguyen@gmail.com'}
                </span>
              </div>
              <div className='p10'>
                <span className='fwb'>Số điện thoại: </span>
                <span>
                  {searchFlightParams.phonenumber_customer_book || '012456789'}
                </span>
              </div>
              <div className='p10'>
                <span className='fwb'>Thành tiền: </span>
                <span className='fwb' style={{ color: '#FFA801' }}>
                  400.000đ
                </span>
              </div>
              <Divider />
              <div className='fwb'>
                Đơn hàng của bạn đã được ghi nhận. <br />
                Vui lòng đến chi nhánh gần nhất để thanh toán.
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FinishStepRegister
