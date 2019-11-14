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
import AddAirportForm from './AddAirportForm'
import { handleError } from '../../../common/utils/handleError'
import EditAirportForm from './EditAirportForm'
import removeNullObject from '../../../common/utils/removeObjectNull'

export class AirportList extends Component {
  state = {
    pagination: {},
    search: {},
  }

  columns = [
    {
      key: 'Name',
      dataIndex: 'name',
      title: 'Tên sân bay',
      sorter: true,
      render: (value, record) => (
        <div className='link d-flex'>
          <img
            src={require('../../../assets/images/airport.png')}
            alt='avatar'
            width={35}
          />
          <div>
            <span style={{ marginLeft: 10 }}>{value}</span>
            <br />
            <Tag title='Mã Sân Bay' style={{ marginLeft: 10 }} color='blue'>
              {record.id}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      key: 'Location',
      dataIndex: 'location',
      title: 'Địa Điểm',
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

  handleChangeTable = async ({ current }, filter, sorter) => {
    const { columnKey, order } = sorter
    const sortParam =
      order === 'ascend' ? { sortAsc: columnKey } : { sortDesc: columnKey }

    columnKey
      ? await this.getAirports(current, null, sortParam)
      : await this.getAirports(current)
  }

  getAirports = async (current, pageSize, params) => {
    const { getAirports } = this.props
    let { search } = this.state

    search = removeNullObject(search)
    const res = await getAirports(current, pageSize, { ...search, ...params })
    if (res.success) {
      this.setState({ pagination: res })
    } else {
      handleError(res, null, notification)
    }
  }

  async componentDidMount() {
    await this.getAirports()
  }

  handleShowAddAirport = () => {
    Modal.show(<AddAirportForm getAirports={this.getAirports} />, {
      title: <b>THÊM SÂN BAY</b>,
      style: { top: 10 },
    })
  }

  handleShowEditForm = airport => {
    Modal.show(
      <EditAirportForm airport={airport} getAirports={this.getAirports} />,
      {
        title: <b>SỬA SÂN BAY</b>,
        style: { top: 10 },
      },
    )
  }

  handleSearch = name => value => {
    this.setState({ search: { ...this.state.search, [name]: value } }, () => {
      this.getAirports()
      console.log(this.state)
    })
  }

  hanleChangeSearch = e => {
    const { name, value } = e.target
    this.setState({ search: { ...this.state.search, [name]: value } })
  }

  handleReset = () => {
    this.setState({ search: {} }, () => this.getAirports())
  }

  render() {
    const { pagination, search = {} } = this.state

    let { airports } = this.props
    airports = airports || []

    return (
      <Card title={<b>SÂN BAY</b>}>
        <Row type='flex' justify='space-between'>
          <Col>
            <div className='d-flex'>
              <Input.Search
                value={search.name}
                style={{ marginRight: 10 }}
                name='name'
                onSearch={this.handleSearch('name')}
                placeholder='Tìm theo Tên sân bay'
                onChange={this.hanleChangeSearch}
              />
              <Input.Search
                name='location'
                value={search.location}
                onSearch={this.handleSearch('location')}
                placeholder=' Tìm theo Địa Điểm'
                onChange={this.hanleChangeSearch}
              />
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
              onClick={this.handleShowAddAirport}
              type='primary'
            >
              <Icon type='plus'></Icon>
              THÊM SÂN BAY
            </Button>
          </Col>
        </Row>
        <br />

        <Table
          pagination={pagination}
          onChange={this.handleChangeTable}
          columns={this.columns}
          rowKey={i => i.id}
          dataSource={airports || []}
          scroll={{ x: '100%' }}
        ></Table>
      </Card>
    )
  }
}

export default AirportList
