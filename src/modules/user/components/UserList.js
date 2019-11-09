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
import AddUserForm from './AddUserForm'
import { Link } from 'react-router-dom'
import { handleError } from '../../../common/utils/handleError'
import { STATUS_COLORS, STATUS } from '../models'

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
          width={35}
        />
      ),
    },
    {
      key: 'fullName',
      dataIndex: 'fullName',
      title: ' Họ tên ',
      render: (value, record) => (
        <Link to={`/admin/user/${record.id}`}>{value}</Link>
      ),
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
    },
    {
      key: 'identifier',
      dataIndex: 'identifier',
      title: 'CMND',
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: ' SĐT ',
      render: value => value || '--',
    },
    {
      key: 'status',
      dataIndex: 'status',
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
            <Link to={`/admin/user/${r.id}`}>
              <Button
                style={{ marginRight: 5 }}
                icon='info-circle'
                type='primary'
              >
                Thông tin
              </Button>
            </Link>
            <Button style={{ marginRight: 5 }} icon='delete' type='danger'>
              Xóa
            </Button>
            <Button icon='lock'>Khóa</Button>
          </div>
        )
      },
    },
  ]

  handleChangeTable = async ({ current }) => {
    await this.getUsers(current)
  }

  getUsers = async (current, pageSize) => {
    const { getUsers } = this.props
    const { search } = this.state
    const res = await getUsers(current, pageSize, search)
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
      <Card title={<b>Nhân Viên</b>}>
        <Row type='flex' justify='space-between'>
          <Col>
            <div className='d-flex'>
              <Input.Search
                value={search.fullname}
                style={{ marginRight: 5 }}
                name='fullname'
                onSearch={this.handleSearch('fullname')}
                placeholder=' Tìm theo tên '
                onChange={this.hanleChangeSearch}
                prefix={<Icon type='user' className='primary-color' />}
              ></Input.Search>
              <Input.Search
                name='identifier'
                value={search.identifier}
                onSearch={this.handleSearch('identifier')}
                placeholder=' Tìm theo CMND '
                onChange={this.hanleChangeSearch}
                prefix={<Icon type='idcard' className='primary-color' />}
              ></Input.Search>
            </div>
          </Col>
          <Col>
            <Button onClick={this.handleReset} icon='sync'>
              Làm mới
            </Button>{' '}
            <Button
              key='btn-add'
              onClick={this.handleShowAddUser}
              type='primary'
            >
              <Icon type='plus'></Icon>
              THÊM NHÂN VIÊN
            </Button>
          </Col>
        </Row>
        <br />

        <Table
          pagination={pagination}
          onChange={this.handleChangeTable}
          columns={this.columns}
          rowKey={i => i.id}
          dataSource={users || []}
        ></Table>
      </Card>
    )
  }
}

export default UserList
