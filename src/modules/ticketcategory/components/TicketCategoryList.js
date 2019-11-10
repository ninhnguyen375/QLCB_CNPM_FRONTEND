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
import AddTicketCategoryForm from './AddTicketCategoryForm'
import { handleError } from '../../../common/utils/handleError'
import EditTicketCategoryForm from './EditTicketCategoryForm'

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
            height={35}
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
            <Button style={{ marginRight: 5 }} icon='delete' type='danger'>
              Xóa
            </Button>
          </div>
        )
      },
    },
  ]

  handleChangeTable = async ({ current }, fillter, sorter) => {
    const { columnKey, order } = sorter
    const sortParam =
      order === 'ascend' ? { sortAsc: columnKey } : { sortDesc: columnKey }

    columnKey
      ? await this.getTicketCategories(current, null, sortParam)
      : await this.getTicketCategories(current)
  }

  getTicketCategories = async (current, pageSize, params) => {
    const { getTicketCategories } = this.props
    const { search } = this.state
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
      console.log(this.state)
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
      <Card title={<b>Loại Vé</b>}>
        <Row type='flex' justify='space-between'>
          <Col>
            <div className='d-flex'>
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
            <Button onClick={this.handleReset} icon='sync'>
              Làm mới
            </Button>{' '}
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
        ></Table>
      </Card>
    )
  }
}

export default TicketCategoryList
