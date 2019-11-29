import React, { Component } from 'react'
import {
  Table,
  Card,
  Button,
  Input,
  Icon,
  notification,
  Tag,
  Popconfirm,
  Select,
  Popover,
} from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import AddUserForm from './AddUserForm'
import { Link } from 'react-router-dom'
import { handleError } from '../../../common/utils/handleError'
import { STATUS_COLORS, STATUS, STATUS_CODE } from '../models'
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
        switch (r.status) {
          case STATUS_CODE.NEW:
          case STATUS_CODE.ACTIVE:
            return (
              <div className='d-flex justify-content-end'>
                <Popconfirm
                  title='Bạn có chắc chắn?'
                  okText='Có'
                  cancelText='Hủy'
                  onConfirm={() => this.handleBlockUser(r.id)}
                >
                  <Popover content='Khóa'>
                    <Button
                      type='danger'
                      ghost
                      style={{ marginRight: 5 }}
                      icon='lock'
                    ></Button>
                  </Popover>
                </Popconfirm>
                <Popconfirm
                  okText='Có'
                  cancelText='Không'
                  title='Bạn có chắc chắn?'
                  onConfirm={() => this.handleDeleteUser(r.id)}
                >
                  <Button
                    style={{ marginRight: 5 }}
                    icon='delete'
                    type='danger'
                  >
                    Xóa
                  </Button>
                </Popconfirm>
              </div>
            )
          case STATUS_CODE.BANNED:
            return (
              <div className='d-flex justify-content-end'>
                <Popconfirm
                  title='Bạn có chắc chắn?'
                  okText='Có'
                  cancelText='Hủy'
                  onConfirm={() => this.handleUnblockUser(r.id)}
                >
                  <Popover content='Mở Khóa'>
                    <Button
                      style={{ marginRight: 5 }}
                      icon='unlock'
                      className='btn-green'
                    ></Button>
                  </Popover>
                </Popconfirm>
                <Popconfirm
                  okText='Có'
                  cancelText='Không'
                  title='Bạn có chắc chắn?'
                  onConfirm={() => this.handleDeleteUser(r.id)}
                >
                  <Button
                    style={{ marginRight: 5 }}
                    icon='delete'
                    type='danger'
                  >
                    Xóa
                  </Button>
                </Popconfirm>
              </div>
            )
          case STATUS_CODE.DELETED:
            return (
              <Popconfirm
                okText='Có'
                cancelText='Không'
                title='Bạn có chắc chắn?'
                onConfirm={() => this.handleDeleteUser(r.id)}
              >
                <Button style={{ marginRight: 5 }} icon='delete' type='primary'>
                  Khôi phục
                </Button>
              </Popconfirm>
            )

          default:
            console.log('default', r.status)
            break
        }
      },
    },
  ]

  handleDeleteUser = async id => {
    const { deleteUser } = this.props

    try {
      await deleteUser(id)
      await this.getUsers()
      notification.success({ message: 'Thành công' })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

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
    const { pagination = {} } = this.state
    const currentPage = current ? current : pagination.current || 1
    let { search } = this.state

    search = removeNullObject(search)
    const res = await getUsers(currentPage, pageSize, { ...search, ...params })
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
              style={{ maxWidth: 200, marginBottom: 10, marginRight: 10 }}
              value={search.fullname}
              name='fullname'
              className='sm-max-width'
              onSearch={this.handleSearch('fullname')}
              placeholder='Họ tên'
              onChange={this.hanleChangeSearch}
              prefix={<Icon type='user' className='primary-color' />}
            />
            <Input.Search
              style={{ maxWidth: 200, marginBottom: 10, marginRight: 10 }}
              className='sm-max-width'
              name='identifier'
              value={search.identifier}
              onSearch={this.handleSearch('identifier')}
              placeholder='CMND'
              onChange={this.hanleChangeSearch}
              prefix={<Icon type='idcard' className='primary-color' />}
            />
            <Select
              style={{ maxWidth: 170, width: 170, marginBottom: 10 }}
              className='sm-max-width'
              onChange={this.handleSearch('status')}
              value={search.status}
              placeholder='Trạng thái'
            >
              <Select.Option key='all' value=''>
                <div className='tac'>Tất cả</div>
              </Select.Option>
              {Object.values(STATUS_CODE).map(i => (
                <Select.Option key={i} value={i}>
                  <Tag
                    className='tac'
                    style={{ width: '100%' }}
                    color={STATUS_COLORS[i]}
                  >
                    {STATUS[i]}
                  </Tag>
                </Select.Option>
              ))}
            </Select>
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
