import React, { Component } from 'react'
import { Steps, Button, message, Card, Form, Icon, notification } from 'antd'
import SearchFlightResult from './SearchFlightResult'
import InformationCustomer from './InformationCustomer'
import FinishStepRegister from './FinishStepRegister'
import Nav0 from '../containers/Nav0'
import Footer from './Footer1'
import './less/searchFlight.less'
import { Link } from 'react-router-dom'
import { handleError } from '../../../common/utils/handleError'
import { createOrderAsync } from '../../order/handlers'
import moment from 'moment'

const { Step } = Steps
const steps = [
  {
    title: 'Tìm Chuyến bay',
  },
  {
    title: 'Thông tin khách hàng',
  },
  // {
  //   title: 'Thanh toán',
  // },
  {
    title: 'Hoàn thành',
  },
]

class SearchFlight extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      onCreateOrder: false,
    }
  }

  componentDidUpdate(nextProps, nextState) {
    nextState.current !== this.state.current && window.scrollTo({ top: 0 })
  }

  next() {
    const current = this.state.current
    const { validateFields } = this.props.form

    switch (current) {
      case 1:
        validateFields((errors, values) => {
          if (errors) {
            message.error('Vui lòng điền đầy đủ thông tin')
            return
          }

          this.props.setSearchFlightParams(values)
          this.handleCompleteOrder(values)
        })
        break
      default:
        return this.setState({ current: current + 1 })
    }
  }

  prev() {
    this.setState({
      current: this.state.current - 1,
    })
  }

  showStepContent(current) {
    const { searchFlightParams } = this.props
    switch (current) {
      case 0:
        return (
          <SearchFlightResult
            next={() => this.next()}
            setSearchFlightParams={this.props.setSearchFlightParams}
            searchFlightParams={searchFlightParams}
          ></SearchFlightResult>
        )
      case 1:
        return (
          <InformationCustomer
            searchFlightParams={searchFlightParams}
            form={this.props.form}
          ></InformationCustomer>
        )
      // case 2:
      //   return <Payment></Payment>
      case 2:
        return (
          <FinishStepRegister
            searchFlightParams={searchFlightParams}
          ></FinishStepRegister>
        )
      default:
        return null
    }
  }

  handleCompleteOrder = async values => {
    try {
      this.setState({ onCreateOrder: true })
      const { searchFlightParams } = this.props
      const dataTmp = {
        ...searchFlightParams,
        ...values,
      }
      console.log('Ninh Debug: dataTmp', dataTmp)
      let passengerCount = dataTmp.passengers.length

      passengerCount = isNaN(passengerCount) ? 0 : passengerCount
      const ticketCount =
        dataTmp.type === 1 ? passengerCount * 2 : passengerCount

      const data = {
        customerId: dataTmp.customerId,
        fullName: dataTmp.fullName,
        phone: dataTmp.phone,
        ticketCount: ticketCount,
        totalPrice: dataTmp.totalPrice,
        returnDate: moment(dataTmp.returnDate)
          .format('YYYY-MM-DD')
          .toString(),
        departureDate: moment(dataTmp.departureDate)
          .format('YYYY-MM-DD')
          .toString(),
        flightIds: Object.values(dataTmp.selectedFlight),
        passengers: dataTmp.passengers,
      }
      console.log('Ninh Debug: data', data)

      const res = await createOrderAsync(data)
      notification.success({ message: ' Thành công ' })
      const { orderId } = res.data[0]
      this.props.setSearchFlightParams({ ...data, orderId })
      this.setState({ onCreateOrder: false, current: 2 })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  render() {
    const { current, onCreateOrder } = this.state
    return (
      <div>
        <Nav0 />
        <div className='margin-navbar'></div>
        <Card bordered={false} style={{ margin: 24 }}>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className='steps-content'>
            <div style={{ padding: '0 50px' }}>
              {this.showStepContent(current)}
              <div style={{ marginTop: 20 }}></div>
              <div className='d-flex justify-content-end'>
                {current > 0 && current !== steps.length - 1 && (
                  <Button
                    size='large'
                    style={{ marginRight: 8 }}
                    onClick={() => this.prev()}
                  >
                    <Icon type='arrow-left' /> Quay lại
                  </Button>
                )}

                {current === steps.length - 2 && (
                  <Button
                    size='large'
                    type='primary'
                    onClick={() => this.next()}
                    loading={onCreateOrder}
                  >
                    Hoàn tất
                  </Button>
                )}

                {current === steps.length - 1 && (
                  <Link to='/'>
                    <Button size='large' type='primary'>
                      Quay lại trang chủ
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Card>
        <Footer />
      </div>
    )
  }
}

export default Form.create({ name: 'step-form' })(SearchFlight)
