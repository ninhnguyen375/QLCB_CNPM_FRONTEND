import React, { Component } from 'react'
import { Row, Col, Card, Divider } from 'antd'
import Lottie from '../../../libraries/Lottie'
import { priceFormat } from '../../../common/utils/stringFormater'

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
                <span className='fwb'>Mã hóa đơn: </span>
                <span>{searchFlightParams.orderId || '--'}</span>
              </div>
              <div className='p10'>
                <span className='fwb'>Khách hàng: </span>
                <span>{searchFlightParams.fullName || '--'}</span>
              </div>
              <div className='p10'>
                <span className='fwb'>CMND: </span>
                <span>{searchFlightParams.customerId || '--'}</span>
              </div>
              <div className='p10'>
                <span className='fwb'>Số điện thoại: </span>
                <span>{searchFlightParams.phone || '012456789'}</span>
              </div>
              <div className='p10'>
                <span className='fwb'>Thành tiền: </span>
                <span className='fwb' style={{ color: '#FFA801' }}>
                  {priceFormat(searchFlightParams.totalPrice)}VNĐ
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
