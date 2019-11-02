import React, { Component } from 'react'
import { Steps, Button, message, Card, Form, Icon, notification } from 'antd'
import SearchFlightResult from './SearchFlightResult'
import InformationCustomer from './InformationCustomer'
import FinishStepRegister from './FinishStepRegister'
import Payment from './Payment'
import Nav0 from '../containers/Nav0'
import Footer from './Footer1'
import './less/searchFlight.less'
import { Link } from 'react-router-dom'

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
          if (errors) return

          this.props.setSearchFlightParams(values)
          this.handleCompleteOrder()
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

  handleCompleteOrder = async () => {
    this.setState({ onCreateOrder: true })
    const { searchFlightParams } = this.props
    console.log('DEBUGER: searchFlightParams', searchFlightParams)
    await setTimeout(() => {
      notification.success({ message: ' Thành công ' })
      this.setState({ onCreateOrder: false, current: 2 })
    }, 1000)
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
