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

export class CustomerList extends Component {
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
        <Link to={`/admin/customer/${record.id}`}>{value}</Link>
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
            <Link to={`/admin/customer/${r.id}`}>
              <Button icon='info-circle'>Chi tiết</Button>
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
      ? await this.getCustomers(current, null, sortParam)
      : await this.getCustomers(current)
  }

  getCustomers = async (current, pageSize, params) => {
    const { getCustomers } = this.props
    let { search } = this.state

    search = removeNullObject(search)
    const res = await getCustomers(current, pageSize, { ...search, ...params })
    if (res.success) {
      this.setState({ pagination: res })
    } else {
      handleError(res, null, notification)
    }
  }

  async componentDidMount() {
    await this.getCustomers()
  }

  handleSearch = name => value => {
    this.setState({ search: { ...this.state.search, [name]: value } }, () => {
      this.getCustomers()
    })
  }

  hanleChangeSearch = e => {
    const { name, value } = e.target
    this.setState({ search: { ...this.state.search, [name]: value } })
  }

  handleReset = () => {
    this.setState({ search: {} }, () => this.getCustomers())
  }

  render() {
    const { pagination, search = {} } = this.state

    let { customers } = this.props
    customers = customers || []

    return (
      <Card title={<b>KHÁCH HÀNG</b>}>
        <Row type='flex' justify='space-between'>
          <Col>
            <div className='d-flex flex-wrap'>
              <Input.Search
                value={search.fullName}
                style={{ marginRight: 5, width: 250 }}
                name='fullName'
                onSearch={this.handleSearch('fullName')}
                placeholder='Tìm theo Tên khách hàng'
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
          dataSource={customers || []}
          scroll={{ x: '100%' }}
        ></Table>
      </Card>
    )
  }
}

export default CustomerList
