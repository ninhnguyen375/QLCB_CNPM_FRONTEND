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
import AddFlightForm from './AddFlightForm'
import { handleError } from '../../../common/utils/handleError'
import EditFlightForm from './EditFlightForm'
import { STATUS_COLORS, STATUS } from '../models'
import {
  minutesToTimeWithType,
  minutesToTime,
} from '../../../common/utils/timeFormater'
import removeNullObject from '../../../common/utils/removeObjectNull'
import { Link } from 'react-router-dom'
export class FlightList extends Component {
  state = {
    pagination: {},
    search: {},
  }

  columns = [
    {
      key: 'Id',
      dataIndex: 'id',
      title: 'Mã Chuyến Bay',
      sorter: true,
      align: 'left',
      render: (value, record) => (
        <Link to={`/admin/flight/${value}`}>
          <Tag
            title='Mã Chuyến Bay'
            className='tac link'
            style={{ fontSize: '1em', padding: '5px 10px', width: 100 }}
            color='blue'
          >
            {record.id}
          </Tag>
        </Link>
      ),
    },
    {
      key: 'StartTime',
      dataIndex: 'startTime',
      title: 'Thời gian bắt đầu',
      sorter: true,
      render: value => (
        <Tag>
          <Icon type='clock-circle' /> {minutesToTime(value)}
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
      title: 'Điểm đi',
      render: value => (
        <div>
          <div className='link'>Sân bay: {value ? value.name : '--'}</div>
          <Tag>
            <Icon type='environment' /> {value ? value.location : '--'}
          </Tag>
        </div>
      ),
    },
    {
      key: 'AirportTo',
      sorter: true,
      dataIndex: 'airportToData',
      title: 'Điểm đến',
      render: value => (
        <div>
          <div className='link'>Sân bay: {value ? value.name : '--'}</div>
          <Tag>
            <Icon type='environment' /> {value ? value.location : '--'}
          </Tag>
        </div>
      ),
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
    {
      key: 'action',
      title: ' Thao tác ',
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
      ? await this.getFlights(current, null, sortParam)
      : await this.getFlights(current)
  }

  getFlights = async (current, pageSize, params) => {
    const { getFlights } = this.props
    let { search } = this.state

    search = removeNullObject(search)
    const res = await getFlights(current, pageSize, { ...search, ...params })
    if (res.success) {
      this.setState({ pagination: res })
    } else {
      handleError(res, null, notification)
    }
  }

  async componentDidMount() {
    await this.getFlights()
  }

  handleShowAddFlight = () => {
    Modal.show(<AddFlightForm getFlights={this.getFlights} />, {
      title: <b>THÊM CHUYẾN BAY</b>,
      style: { top: 10, maxWidth: 800 },
      width: '95%',
      maxWidth: 800,
    })
  }

  handleShowEditForm = flight => {
    Modal.show(
      <EditFlightForm flight={flight} getFlights={this.getFlights} />,
      {
        title: <b>SỬA CHUYẾN BAY</b>,
        style: { top: 10, maxWidth: 800 },
        width: '95%',
        maxWidth: 800,
      },
    )
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

  render() {
    const { pagination, search = {} } = this.state

    let { flights } = this.props
    flights = flights || []

    return (
      <Card title={<b>Chuyến Bay</b>}>
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
            <Button
              style={{ marginRight: 10 }}
              onClick={this.handleReset}
              icon='sync'
            >
              Làm mới
            </Button>
            <Button
              key='btn-add'
              onClick={this.handleShowAddFlight}
              type='primary'
            >
              <Icon type='plus'></Icon>
              THÊM CHUYẾN BAY
            </Button>
          </Col>
        </Row>
        <br />

        <Table
          scroll={{ x: '110%' }}
          pagination={pagination}
          onChange={this.handleChangeTable}
          columns={this.columns}
          rowKey={i => i.id}
          dataSource={flights || []}
        ></Table>
      </Card>
    )
  }
}

export default FlightList
