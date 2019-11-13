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
import { handleError } from '../../../common/utils/handleError'
import { STATUS_COLORS, STATUS } from '../models'
import { minutesToTimeWithType } from '../../../common/utils/timeFormater'
import { getFlightsAsync } from '../handlers'
import removeNullObject from '../../../common/utils/removeObjectNull'

class SelectableFlightList extends Component {
  state = {
    pagination: {},
    search: {},
    flights: [],
    selectedRowKeys: [],
  }

  columns = [
    {
      key: 'Id',
      dataIndex: 'id',
      title: 'Mã Chuyến Bay',
      sorter: true,
      align: 'left',
      render: (value, record) => (
        <Tag
          title='Mã Chuyến Bay'
          className='tac link'
          style={{ fontSize: '1em', padding: '5px 10px', width: 130 }}
          color='blue'
        >
          {record.id}
        </Tag>
      ),
    },
    {
      key: 'StartTime',
      dataIndex: 'startTime',
      title: 'Thời gian bắt đầu',
      sorter: true,
      render: value => (
        <Tag>
          <Icon type='clock-circle' /> {minutesToTimeWithType(value)}
        </Tag>
      ),
    },
    {
      key: 'FlightTime',
      sorter: true,
      dataIndex: 'flightTime',
      title: 'Thời gian bay',
      render: value => (
        <Tag>
          <Icon type='clock-circle' /> {minutesToTimeWithType(value)}
        </Tag>
      ),
    },
    {
      key: 'AirportFrom',
      sorter: true,
      dataIndex: 'airportFromData',
      title: 'Sân bay đi',
      render: value => <div className='link'>{value && value.name}</div>,
    },
    {
      key: 'AirportTo',
      sorter: true,
      dataIndex: 'airportToData',
      title: 'Sân bay đến',
      render: value => <div className='link'>{value && value.name}</div>,
    },
    {
      key: 'SeatsCount',
      sorter: true,
      dataIndex: 'seatsCount',
      title: 'Tổng Số lượng ghế',
      render: value => <Tag color='orange'>{value} Ghế</Tag>,
    },
    {
      key: 'Status',
      sorter: true,
      dataIndex: 'status',
      title: 'Trạng thái',
      render: value => <Tag color={STATUS_COLORS[value]}>{STATUS[value]}</Tag>,
    },
  ]

  handleChangeTable = async ({ current }, filter, sorter) => {
    const { columnKey, order } = sorter
    const sortParam =
      order === 'ascend' ? { sortAsc: columnKey } : { sortDesc: columnKey }

    columnKey
      ? await this.getFlights(current, null, sortParam)
      : await this.getFlights(current)
  }

  getFlights = async (current, pageSize, params) => {
    let { search } = this.state
    const { ignoreIds } = this.props

    search = removeNullObject(search)
    const { filters = {} } = this.props

    try {
      let res = await getFlightsAsync(current, pageSize, {
        ...search,
        ...params,
        ...filters,
      })
      if (ignoreIds && Array.isArray(ignoreIds)) {
        res = res.data.filter(i => {
          return ignoreIds.find(id => id === i.id) ? false : true
        })
      }
      this.setState({ pagination: res, flights: res })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  async componentDidMount() {
    await this.getFlights()
  }

  handleSearch = name => value => {
    this.setState({ search: { ...this.state.search, [name]: value } }, () => {
      this.getFlights()
      console.log(this.state)
    })
  }

  hanleChangeSearch = e => {
    const { name, value } = e.target
    this.setState({ search: { ...this.state.search, [name]: value } })
  }

  handleReset = () => {
    this.setState({ search: {} }, () => this.getFlights())
  }

  handleSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }

  render() {
    const { pagination, search = {}, selectedRowKeys } = this.state
    let { flights } = this.state
    const { onCancel, onOk } = this.props

    flights = flights || []

    return (
      <Card>
        <Row type='flex' justify='space-between'>
          <Col>
            <div className='d-flex'>
              <Input.Search
                value={search.id}
                style={{ marginRight: 5 }}
                name='id'
                onSearch={this.handleSearch('id')}
                placeholder='Mã chuyến bay'
                onChange={this.hanleChangeSearch}
              ></Input.Search>
              {/* <TimePicker
                name='startTime'
                value={search.startTime}
                onSearch={this.handleSearch('startTime')}
                placeholder='Thời gian bắt đầu'
                onChange={this.hanleChangeSearch}
              ></TimePicker> */}
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
          rowSelection={{
            selectedRowKeys: selectedRowKeys || [],
            onChange: this.handleSelectChange,
          }}
          scroll={{ x: '100%' }}
          pagination={pagination}
          onChange={this.handleChangeTable}
          columns={this.columns}
          rowKey={i => i.id}
          dataSource={flights || []}
        ></Table>
        <div className='d-flex justify-content-end'>
          <Button style={{ marginRight: 10 }} onClick={() => onCancel()}>
            <Icon type='close-circle' /> Hủy
          </Button>
          <Button type='primary' onClick={() => onOk(selectedRowKeys)}>
            <Icon type='check-circle' /> Hoàn tất
          </Button>
        </div>
      </Card>
    )
  }
}

export default SelectableFlightList
