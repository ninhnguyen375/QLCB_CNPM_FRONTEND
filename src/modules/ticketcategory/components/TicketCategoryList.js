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
  Popconfirm,
} from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import AddTicketCategoryForm from './AddTicketCategoryForm'
import { handleError } from '../../../common/utils/handleError'
import EditTicketCategoryForm from './EditTicketCategoryForm'
import removeNullObject from '../../../common/utils/removeObjectNull'

export class TicketCategoryList extends Component {
  state = {
    pagination: {},
    search: {},
  }

  columns = [
    {
      key: 'Name',
      dataIndex: 'name',
      title: 'Loại vé',
      sorter: true,
      render: (value, record) => (
        <div className='link d-flex align-items-center'>
          <img
            src={require('../../../assets/images/ticketCategory.png')}
            alt='avatar'
            height={30}
          />
          <div>
            <span style={{ marginLeft: 10 }}>{value}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'action',
      title: ' Thao tác ',
      align: 'right',
      render: r => {
        return (
          <div className='d-flex justify-content-end'>
            <Button
              onClick={() => this.handleShowEditForm(r)}
              style={{ marginRight: 5 }}
              icon='edit'
              type='primary'
            >
              Sửa
            </Button>
            <Popconfirm
              okText='Có'
              cancelText='Không'
              title='Bạn có muốn xóa loại vé này?'
              onConfirm={() => this.handleDeleteTicketCategory(r.id)}
            >
              <Button style={{ marginRight: 5 }} icon='delete' type='danger'>
                Xóa
              </Button>
            </Popconfirm>
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
      ? await this.getTicketCategories(current, null, sortParam)
      : await this.getTicketCategories(current)
  }

  handleDeleteTicketCategory = async id => {
    const { deleteTicketCategory } = this.props

    try {
      await deleteTicketCategory(id)
      await this.getTicketCategories()
      notification.success({ message: 'Thành công' })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  getTicketCategories = async (current, pageSize, params) => {
    const { getTicketCategories } = this.props
    let { search } = this.state

    search = removeNullObject(search)
    const res = await getTicketCategories(current, pageSize, {
      ...search,
      ...params,
    })
    if (res.success) {
      this.setState({ pagination: res })
    } else {
      handleError(res, null, notification)
    }
  }

  async componentDidMount() {
    await this.getTicketCategories()
  }

  handleShowAddTicketCategory = () => {
    Modal.show(
      <AddTicketCategoryForm getTicketCategories={this.getTicketCategories} />,
      {
        title: <b>THÊM LOẠI VÉ</b>,
        style: { top: 10 },
      },
    )
  }

  handleShowEditForm = ticketCategory => {
    Modal.show(
      <EditTicketCategoryForm
        ticketCategory={ticketCategory}
        getTicketCategories={this.getTicketCategories}
      />,
      {
        title: <b>SỬA LOẠI VÉ</b>,
        style: { top: 10 },
      },
    )
  }

  handleSearch = name => value => {
    this.setState({ search: { ...this.state.search, [name]: value } }, () => {
      this.getTicketCategories()
    })
  }

  hanleChangeSearch = e => {
    const { name, value } = e.target
    this.setState({ search: { ...this.state.search, [name]: value } })
  }

  handleReset = () => {
    this.setState({ search: {} }, () => this.getTicketCategories())
  }

  render() {
    const { pagination, search = {} } = this.state

    let { ticketCategories } = this.props
    ticketCategories = Array.isArray(ticketCategories) ? ticketCategories : []

    return (
      <Card title={<b>LOẠI VÉ</b>}>
        <Row type='flex' justify='space-between'>
          <Col>
            <div className='d-flex flex-wrap'>
              <Input.Search
                value={search.name}
                style={{ marginRight: 5, width: 250 }}
                name='name'
                onSearch={this.handleSearch('name')}
                placeholder='Tìm theo Loại vé'
                onChange={this.hanleChangeSearch}
              ></Input.Search>
            </div>
          </Col>
          <Col>
            <Button
              style={{ marginRight: 10 }}
              onClick={this.handleReset}
              icon='sync'
            >
              Làm mới
            </Button>
            <Button
              key='btn-add'
              onClick={this.handleShowAddTicketCategory}
              type='primary'
            >
              <Icon type='plus'></Icon>
              THÊM LOẠI VÉ
            </Button>
          </Col>
        </Row>
        <br />

        <Table
          pagination={pagination}
          onChange={this.handleChangeTable}
          columns={this.columns}
          rowKey={i => i.id}
          dataSource={ticketCategories || []}
          scroll={{ x: '100%' }}
        ></Table>
      </Card>
    )
  }
}

export default TicketCategoryList
