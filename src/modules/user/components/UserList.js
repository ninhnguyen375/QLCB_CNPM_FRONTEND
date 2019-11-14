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
} from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import AddUserForm from './AddUserForm'
import { Link } from 'react-router-dom'
import { handleError } from '../../../common/utils/handleError'
import { STATUS_COLORS, STATUS } from '../models'
import removeNullObject from '../../../common/utils/removeObjectNull'

export class UserList extends Component {
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
          width={25}
        />
      ),
    },
    {
      key: 'FullName',
      dataIndex: 'fullName',
      title: ' Họ tên ',
      sorter: true,
      render: (value, record) => (
        <Link to={`/admin/user/${record.id}`}>{value}</Link>
      ),
    },
    {
      key: 'Email',
      dataIndex: 'email',
      title: 'Email',
    },
    {
      key: 'Identifier',
      dataIndex: 'identifier',
      title: 'CMND',
    },
    {
      key: 'Phone',
      dataIndex: 'phone',
      title: ' SĐT ',
      render: value => value || '--',
    },
    {
      key: 'Status',
      dataIndex: 'status',
      sorter: true,
      title: 'Trạng thái',
      render: value => <Tag color={STATUS_COLORS[value]}>{STATUS[value]}</Tag>,
    },
    {
      key: 'action',
      title: ' Thao tác ',
      align: 'right',
      render: r => {
        return (
          <div className='d-flex justify-content-end'>
            {r.status === 1 ? (
              <Popconfirm
                title='Bạn có chắc chắn?'
                okText='Có'
                cancelText='Hủy'
                onConfirm={() => this.handleBlockUser(r.id)}
              >
                <Button style={{ marginRight: 5 }} icon='lock'>
                  Khóa
                </Button>
              </Popconfirm>
            ) : (
              ''
            )}
            {r.status === 2 ? (
              <Popconfirm
                title='Bạn có chắc chắn?'
                okText='Có'
                cancelText='Hủy'
                onConfirm={() => this.handleUnblockUser(r.id)}
              >
                <Button style={{ marginRight: 5 }} icon='unlock'>
                  Mở Khóa
                </Button>
              </Popconfirm>
            ) : (
              ''
            )}
            <Button icon='delete' type='danger'>
              Xóa
            </Button>
          </div>
        )
      },
    },
  ]

  handleBlockUser = async id => {
    const { blockUser } = this.props
    try {
      await blockUser(id)
      await this.getUsers()
      notification.success({ message: 'Thành công' })
    } catch (error) {
      handleError(error, null, notification)
    }
  }

  handleUnblockUser = async id => {
    const { unblockUser } = this.props
    try {
      await unblockUser(id)
      await this.getUsers()
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
      ? await this.getUsers(current, null, sortParam)
      : await this.getUsers(current)
  }

  getUsers = async (current, pageSize, params) => {
    const { getUsers } = this.props
    let { search } = this.state

    search = removeNullObject(search)
    const res = await getUsers(current, pageSize, { ...search, ...params })
    if (res.success) {
      this.setState({ pagination: res })
    } else {
      handleError(res, null, notification)
    }
  }

  async componentDidMount() {
    await this.getUsers()
  }

  handleShowAddUser = () => {
    Modal.show(<AddUserForm getUsers={this.getUsers} />, {
      title: <b>THÊM NHÂN VIÊN</b>,
      style: { top: 10 },
    })
  }

  handleSearch = name => value => {
    this.setState({ search: { ...this.state.search, [name]: value } }, () => {
      this.getUsers()
      console.log(this.state)
    })
  }

  hanleChangeSearch = e => {
    const { name, value } = e.target
    this.setState({ search: { ...this.state.search, [name]: value } })
  }

  handleReset = () => {
    this.setState({ search: {} }, () => this.getUsers())
  }

  render() {
    const { pagination, search = {} } = this.state

    let { users } = this.props
    users = users || []

    return (
      <Card title={<b>NHÂN VIÊN</b>}>
        <div className='d-flex flex-wrap justify-content-between'>
          <div className='d-flex flex-wrap'>
            <Input.Search
              style={{ maxWidth: 237, marginBottom: 10, marginRight: 10 }}
              value={search.fullname}
              name='fullname'
              className='sm-max-width'
              onSearch={this.handleSearch('fullname')}
              placeholder=' Tìm theo tên '
              onChange={this.hanleChangeSearch}
              prefix={<Icon type='user' className='primary-color' />}
            />
            <Input.Search
              style={{ maxWidth: 237, marginBottom: 10 }}
              className='sm-max-width'
              name='identifier'
              value={search.identifier}
              onSearch={this.handleSearch('identifier')}
              placeholder=' Tìm theo CMND '
              onChange={this.hanleChangeSearch}
              prefix={<Icon type='idcard' className='primary-color' />}
            />
          </div>
          <div className='sm-max-width'>
            <Button
              className='sm-max-width'
              style={{ marginBottom: 10, marginRight: 10 }}
              onClick={this.handleReset}
              icon='sync'
            >
              Làm mới
            </Button>
            <Button
              className='sm-max-width'
              style={{ marginBottom: 10 }}
              key='btn-add'
              onClick={this.handleShowAddUser}
              type='primary'
            >
              <Icon type='plus'></Icon>
              THÊM NHÂN VIÊN
            </Button>
          </div>
        </div>

        <Table
          pagination={pagination}
          onChange={this.handleChangeTable}
          columns={this.columns}
          rowKey={i => i.id}
          dataSource={users || []}
          scroll={{ x: '100%' }}
        ></Table>
      </Card>
    )
  }
}

export default UserList
