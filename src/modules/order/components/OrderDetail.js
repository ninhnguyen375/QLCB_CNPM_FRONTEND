import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { handleError } from '../../../common/utils/handleError'
import { getOrderAsync } from '../handlers'
import { notification, Card, Icon, Tag, Divider } from 'antd'
import TicketItem from './TicketItem'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { priceFormat } from '../../../common/utils/stringFormater'
import { STATUS, STATUS_COLOR } from '../models'

class OrderDetail extends Component {
  state = {
    order: {},
  }

  getOrder = async () => {
    if (
      !this.props.match ||
      !this.props.match.params ||
      !this.props.match.params.id
    ) {
      throw new Error('Missing this.props.match.params.id')
    }
    try {
      let res = await getOrderAsync(this.props.match.params.id)
      this.setState({
        order: res.data,
      })
    } catch (error) {
      handleError(error, null, notification)
    }
  }

  componentDidMount() {
    this.getOrder()
  }

  render() {
    const { order } = this.state
    const tickets = order ? order.tickets || [] : []
    const customer = order ? order.customer || {} : {}

    return (
      <Card title={<b>CHI TIẾT HÓA ĐƠN</b>}>
        <div className='container'>
          <div className='d-flex flex-wrap justify-content-between'>
            <div>
              <div className='d-flex'>
                <div className='tar'>
                  <img
                    src={require('../../../assets/images/user.svg')}
                    alt='avt'
                    width={100}
                    style={{ marginRight: 10 }}
                  />
                </div>
                <div
                  className='d-flex justify-content-between'
                  style={{
                    flexDirection: 'column',
                  }}
                >
                  <div>
                    <b>
                      Khách hàng:{' '}
                      <Link to={`/admin/customer/${customer.id}`}>
                        {customer.fullName}
                      </Link>
                    </b>
                  </div>

                  <div>
                    <b>CMND: </b>
                    {customer.id}
                  </div>

                  <div>
                    <b>SĐT: </b>
                    {customer.phone}
                  </div>

                  <div>
                    <b>Số lần đặt: </b>
                    {customer.bookingCount}
                  </div>
                </div>
              </div>
            </div>
            <div
              className='d-flex justify-content-between'
              style={{
                flexDirection: 'column',
              }}
            >
              <div>
                <b>Ngày đặt: </b>
                {moment(order.createAt).format('DD-MM-YYYY, HH:mm')}
              </div>

              <div>
                <b>Tổng số vé: </b>
                {order.ticketCount}
              </div>

              <div>
                <b>Trạng thái: </b>
                <Tag color={STATUS_COLOR[order.status]}>
                  {STATUS[order.status]}
                </Tag>
              </div>

              <div>
                <b>Tổng tiền: </b>
                <span className='fwb price-color'>
                  {priceFormat(order.totalPrice)}VNĐ
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 30 }}></div>
          <Divider />
          <div className='container'>
            {tickets.map(t => (
              <TicketItem ticket={t} key={t.id} />
            ))}
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(OrderDetail)
