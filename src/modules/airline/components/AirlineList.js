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
import AddAirlineForm from './AddAirlineForm'
import { handleError } from '../../../common/utils/handleError'
import EditAirlineForm from './EditAirlineForm'

export class AirlineList extends Component {
  state = {
    pagination: {},
    search: {},
  }

  columns = [
    {
      key: 'Name',
      dataIndex: 'name',
      title: 'Tên hãng hàng không',
      sorter: true,
      render: (value, record) => (
        <div className='link d-flex'>
          <img
            src={require('../../../assets/images/airline.png')}
            alt='avatar'
            height={35}
          />
          <div>
            <span style={{ marginLeft: 10 }}>{value}</span>
            <br />
            <Tag
              title='Mã Hãng Hàng Không'
              style={{ marginLeft: 10 }}
              color='blue'
            >
              {record.id}
            </Tag>
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
      ? await this.getAirlines(current, null, sortParam)
      : await this.getAirlines(current)
  }

  getAirlines = async (current, pageSize, params) => {
    const { getAirlines } = this.props
    const { search } = this.state
    const res = await getAirlines(current, pageSize, { ...search, ...params })
    if (res.success) {
      this.setState({ pagination: res })
    } else {
      handleError(res, null, notification)
    }
  }

  async componentDidMount() {
    await this.getAirlines()
  }

  handleShowAddAirline = () => {
    Modal.show(<AddAirlineForm getAirlines={this.getAirlines} />, {
      title: <b>THÊM HÃNG HÀNG KHÔNG</b>,
      style: { top: 10 },
    })
  }

  handleShowEditForm = airline => {
    Modal.show(
      <EditAirlineForm airline={airline} getAirlines={this.getAirlines} />,
      {
        title: <b>SỬA HÃNG HÀNG KHÔNG</b>,
        style: { top: 10 },
      },
    )
  }

  handleSearch = name => value => {
    this.setState({ search: { ...this.state.search, [name]: value } }, () => {
      this.getAirlines()
      console.log(this.state)
    })
  }

  hanleChangeSearch = e => {
    const { name, value } = e.target
    this.setState({ search: { ...this.state.search, [name]: value } })
  }

  handleReset = () => {
    this.setState({ search: {} }, () => this.getAirlines())
  }

  render() {
    const { pagination, search = {} } = this.state

    let { airlines } = this.props
    airlines = airlines || []

    return (
      <Card title={<b>Hãng Hàng Không</b>}>
        <Row type='flex' justify='space-between'>
          <Col>
            <div className='d-flex'>
              <Input.Search
                value={search.name}
                style={{ marginRight: 5, width: 250 }}
                name='name'
                onSearch={this.handleSearch('name')}
                placeholder='Tìm theo Tên hãng hàng không'
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
              onClick={this.handleShowAddAirline}
              type='primary'
            >
              <Icon type='plus'></Icon>
              THÊM HÃNG HÀNG KHÔNG
            </Button>
          </Col>
        </Row>
        <br />

        <Table
          pagination={pagination}
          onChange={this.handleChangeTable}
          columns={this.columns}
          rowKey={i => i.id}
          dataSource={airlines || []}
        ></Table>
      </Card>
    )
  }
}

export default AirlineList
