import React, { Component } from 'react'
import { Steps, Button, message, Card, Form, Icon } from 'antd'
import SearchFlightResult from './SearchFlightResult'
import InformationCustomer from './InformationCustomer'
import FinishStepRegister from './FinishStepRegister'
import Payment from './Payment'
import Nav0 from '../containers/Nav0'
import Footer from './Footer1'
import './less/searchFlight.less'

const { Step } = Steps
const steps = [
  {
    title: 'Tìm Chuyến bay',
  },
  {
    title: 'Thông tin khách hàng',
  },
  {
    title: 'Thanh toán',
  },
  {
    title: 'Hoàn thành',
  },
]

class SearchFlight extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
    }
  }

  componentDidUpdate() {
    window.scrollTo({ top: 0 })
  }

  next() {
    const current = this.state.current
    const { validateFields } = this.props.form
    switch (current) {
      case 0:
        return this.setState({ current: current + 1 })
      case 1:
        validateFields((errors, values) => {
          if (!errors) {
            console.log(values)
            this.props.setSearchFlightParams(values)
            return this.setState({ current: current + 1 })
          }
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
    setTimeout(() => {
      this.props.form.setFieldsValue(this.props.searchFlightParams)
    }, 100)
  }
  showStepContent(current) {
    const { searchFlightParams } = this.props
    switch (current) {
      case 0:
        return (
          <SearchFlightResult
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
      case 2:
        return <Payment></Payment>
      case 3:
        return (
          <FinishStepRegister
            searchFlightParams={searchFlightParams}
          ></FinishStepRegister>
        )
      default:
        return null
    }
  }
  render() {
    const { current } = this.state
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
                {current > 0 && (
                  <Button
                    size='large'
                    style={{ marginRight: 8 }}
                    onClick={() => this.prev()}
                  >
                    Quay lại
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button
                    size='large'
                    type='primary'
                    onClick={() => this.next()}
                  >
                    Tếp theo <Icon type='arrow-right' />
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    size='large'
                    type='primary'
                    onClick={() => message.success('Processing complete!')}
                  >
                    Hoàn tất
                  </Button>
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
