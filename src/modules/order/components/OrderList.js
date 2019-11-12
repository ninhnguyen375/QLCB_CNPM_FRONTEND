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
} from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { handleError } from '../../../common/utils/handleError'
import removeNullObject from '../../../common/utils/removeObjectNull'
import { Link } from 'react-router-dom'

export class OrderList extends Component {
  state = {
    pagination: {},
    search: {},
  }

  columns = [
    {
      key: 'avatar',
      align: 'right',
      render: () => (
        <img
          src={require('../../../assets/images/user.svg')}
          alt='avatar'
          width={35}
        />
      ),
    },
    {
      key: 'FullName',
      dataIndex: 'fullName',
      title: ' Họ tên ',
      sorter: true,
      render: (value, record) => (
        <Link to={`/admin/order/${record.id}`}>{value}</Link>
      ),
    },
    {
      key: 'Phone',
      dataIndex: 'phone',
      title: 'Số điện thoại',
      sorter: true,
      render: (value, record) => (
        <div>
          <Icon type='phone' /> {value}
        </div>
      ),
    },
    {
      key: 'BookingCount',
      dataIndex: 'bookingCount',
      title: 'Số lần đặt',
      sorter: true,
      align: 'center',
      render: (value, record) => <Tag color='blue'>{value}</Tag>,
    },
    {
      key: 'action',
      title: ' Thao tác ',
      align: 'right',
      render: r => {
        return (
          <div className='d-flex justify-content-end'>
            <Link to={`/admin/order/${r.id}`}>
              <Button type='primary' icon='info-circle'>
                Chi tiết
              </Button>
            </Link>
          </div>
        )
      },
    },
  ]

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
            <div className='d-flex'>
              <Input.Search
                value={search.name}
                style={{ marginRight: 5, width: 250 }}
                name='name'
                onSearch={this.handleSearch('name')}
                placeholder='Tìm theo Tên đơn hàng'
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
        ></Table>
      </Card>
    )
  }
}

export default OrderList
