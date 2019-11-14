import React, { Component } from 'react'
import {
  Table,
  Card,
  Button,
  Row,
  Col,
  Input,
  Icon,
  notification,
  Tag,
  Popconfirm,
  Dropdown,
  Menu,
} from 'antd'
import { handleError } from '../../../common/utils/handleError'
import removeNullObject from '../../../common/utils/removeObjectNull'
import { Link } from 'react-router-dom'
import { STATUS, STATUS_COLOR } from '../models'
import moment from 'moment'
import { priceFormat } from '../../../common/utils/stringFormater'

export class OrderList extends Component {
  state = {
    pagination: {},
    search: {},
  }

  columns = [
    {
      key: 'Id',
      dataIndex: 'id',
      title: 'Mã hóa đơn',
      sorter: true,
      render: (value, record) => (
        <Link to={`/admin/order/${record.id}`}>
          <Tag
            title='Mã Hóa Đơn'
            className='tac link'
            style={{ fontSize: '1em', padding: '5px 10px', width: 100 }}
            color='blue'
          >
            {value}
          </Tag>
        </Link>
      ),
    },
    {
      key: 'CustomerId',
      dataIndex: 'customer',
      title: 'Khách hàng',
      render: (customer, record) => (
        <div>
          <Link to={`/admin/customer/${customer && customer.id}`}>
            <Icon type='user' />
            <b> {customer && customer.fullName}</b>
          </Link>
          <div>
            <Icon type='idcard' /> {customer && customer.id}
          </div>
          <div>
            <Icon type='phone' /> {customer && customer.phone}
          </div>
        </div>
      ),
    },
    {
      key: 'TicketCount',
      dataIndex: 'ticketCount',
      title: 'Tổng số vé',
      align: 'center',
      sorter: true,
      render: value => <Tag color='blue'>{value}</Tag>,
    },
    {
      key: 'CreateAt',
      dataIndex: 'createAt',
      title: 'Ngày lập',
      sorter: true,
      render: value => (
        <div>
          <Icon type='calendar' />{' '}
          {moment(value)
            .format('DD-MM-YYYY, HH:mm')
            .toString()}
        </div>
      ),
    },
    {
      key: 'TotalPrice',
      dataIndex: 'totalPrice',
      title: 'Thành tiền',
      sorter: true,
      render: value => (
        <div className='price-color fwb'>{priceFormat(value)}VNĐ</div>
      ),
    },
    {
      key: 'Status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      render: (value, record) => (
        <Tag color={STATUS_COLOR[value]}>{STATUS[value]}</Tag>
      ),
    },
    {
      key: 'action',
      title: ' Thao tác ',
      align: 'right',
      render: r => {
        return (
          <div className='d-flex justify-content-end'>
            {/* 0 is New */}
            {r.status === 0 ? (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <Link to={`/admin/order/${r.id}`}>
                        <Button style={{ width: '100%' }} icon='info-circle'>
                          Chi tiết
                        </Button>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Popconfirm
                        title='Bạn có chắc chắn?'
                        onConfirm={() => this.handleRefuseOrder(r.id)}
                        okText='Có'
                        cancelText='Hủy'
                      >
                        <Button
                          style={{ width: '100%' }}
                          type='danger'
                          icon='close-circle'
                        >
                          Từ chối
                        </Button>
                      </Popconfirm>
                    </Menu.Item>
                    <Menu.Item>
                      <Popconfirm
                        title='Bạn có chắc chắn?'
                        onConfirm={() => this.handleAcceptOrder(r.id)}
                        okText='Có'
                        cancelText='Hủy'
                      >
                        <Button
                          style={{ width: '100%' }}
                          type='primary'
                          icon='check-circle'
                        >
                          Xác nhận
                        </Button>
                      </Popconfirm>
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  <Icon type='ellipsis' />
                </Button>
              </Dropdown>
            ) : (
              <Link to={`/admin/order/${r.id}`}>
                <Button icon='info-circle'>Chi tiết</Button>
              </Link>
            )}
          </div>
        )
      },
    },
  ]

  handleRefuseOrder = async id => {
    const { refuseOrder } = this.props
    try {
      await refuseOrder(id)
      await this.getOrders()
      notification.success({ message: 'Thành công' })
    } catch (error) {
      handleError(error, null, notification)
    }
  }

  handleAcceptOrder = async id => {
    const { acceptOrder } = this.props
    try {
      await acceptOrder(id)
      await this.getOrders()
      notification.success({ message: 'Thành công' })
    } catch (error) {
      handleError(error, null, notification)
    }
  }

  handleChangeTable = async ({ current }, filter, sorter) => {
    const { columnKey, order } = sorter
    const sortParam =
      order === 'ascend' ? { sortAsc: columnKey } : { sortDesc: columnKey }

    columnKey
      ? await this.getOrders(current, null, sortParam)
      : await this.getOrders(current)
  }

  getOrders = async (current, pageSize, params) => {
    const { getOrders } = this.props
    let { search } = this.state

    search = removeNullObject(search)
    const res = await getOrders(current, pageSize, { ...search, ...params })
    if (res.success) {
      this.setState({ pagination: res })
    } else {
      handleError(res, null, notification)
    }
  }

  async componentDidMount() {
    await this.getOrders()
  }

  handleSearch = name => value => {
    this.setState({ search: { ...this.state.search, [name]: value } }, () => {
      this.getOrders()
      console.log(this.state)
    })
  }

  hanleChangeSearch = e => {
    const { name, value } = e.target
    this.setState({ search: { ...this.state.search, [name]: value } })
  }

  handleReset = () => {
    this.setState({ search: {} }, () => this.getOrders())
  }

  render() {
    const { pagination, search = {} } = this.state

    let { orders } = this.props
    orders = orders || []

    return (
      <Card title={<b>Đơn Hàng</b>}>
        <Row type='flex' justify='space-between'>
          <Col>
            <div className='d-flex flex-wrap'>
              <Input.Search
                value={search.id}
                style={{ marginRight: 10, width: 250 }}
                name='id'
                onSearch={this.handleSearch('id')}
                placeholder='Tìm theo Mã đơn hàng'
                onChange={this.hanleChangeSearch}
              ></Input.Search>
              <Input.Search
                value={search.customerId}
                style={{ marginRight: 5, width: 250 }}
                name='customerId'
                onSearch={this.handleSearch('customerId')}
                placeholder='Tìm theo CMND khách hàng'
                onChange={this.hanleChangeSearch}
              ></Input.Search>
            </div>
          </Col>
          <Col>
            <Button onClick={this.handleReset} icon='sync'>
              Làm mới
            </Button>
          </Col>
        </Row>
        <br />

        <Table
          pagination={pagination}
          onChange={this.handleChangeTable}
          columns={this.columns}
          rowKey={i => i.id}
          dataSource={orders || []}
          scroll={{ x: '100%' }}
        ></Table>
      </Card>
    )
  }
}

export default OrderList
