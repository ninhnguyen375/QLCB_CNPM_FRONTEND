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
  Drawer,
  Divider,
  Popconfirm,
  DatePicker,
} from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import AddDateForm from './AddDateForm'
import { handleError } from '../../../common/utils/handleError'
import EditDateForm from './EditDateForm'
import moment from 'moment'
import SelectableFlightList from '../../flight/components/SelectableFlightList'
import removeNullObject from '../../../common/utils/removeObjectNull'
import { Link } from 'react-router-dom'
import { STATUS, STATUS_COLOR } from '../models'

export class DateList extends Component {
  state = {
    pagination: {},
    search: {},
    currentDateDetail: {},
    isShowDateDetail: false,
  }

  columns = [
    {
      key: 'DepartureDate',
      dataIndex: 'departureDate',
      title: 'Ngày bay',
      sorter: true,
      render: (value, record) => (
        <div className='link d-flex align-items-center'>
          <img
            src={require('../../../assets/images/date.png')}
            alt='avatar'
            height={35}
          />
          <div>
            <Tag
              style={{ marginLeft: 10, fontSize: '0.9em', padding: '2px 8px' }}
            >
              {moment(value, 'YYYY-MM-DD')
                .format('DD-MM-YYYY')
                .toString()}
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
              onClick={() => this.handleShowDetailDate(r)}
              style={{ marginRight: 5 }}
              icon='info-circle'
            >
              Chi tiết
            </Button>
            <Button
              onClick={() => this.handleShowAddFlightToDate(r)}
              style={{ marginRight: 5 }}
              icon='plus-circle'
              type='primary'
            >
              Thêm chuyến bay
            </Button>
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

  flightColumns = [
    {
      key: 'FlightId',
      dataIndex: 'flightId',
      title: 'Mã Chuyến Bay',
      sorter: true,
      align: 'left',
      render: (value, record) => (
        <Link to={`/admin/flight/${value}`}>
          <Tag
            title='Mã Chuyến Bay'
            className='tac link'
            style={{ fontSize: '1em', padding: '5px 10px', width: 130 }}
            color='blue'
          >
            {value}
          </Tag>
        </Link>
      ),
    },
    {
      key: 'SeatsLeft',
      dataIndex: 'seatsLeft',
      title: 'Số ghế còn trống',
      sorter: true,
      align: 'center',
      render: value => <Tag color='orange'>{value} Ghế</Tag>,
    },
    {
      key: 'Status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      align: 'center',
      render: value => <Tag color={STATUS_COLOR[value]}>{STATUS[value]}</Tag>,
    },
    {
      key: 'action',
      title: 'Thao tác',
      render: r => (
        <Popconfirm
          title='Bạn có chắc chắn?'
          okText='Có'
          cancelText='Hủy'
          onConfirm={() => this.handleRemoveFlightFromDate(r.flightId)}
        >
          <Button icon='delete' type='danger'>
            Xóa khỏi ngày bay
          </Button>
        </Popconfirm>
      ),
    },
  ]

  handleRemoveFlightFromDate = async flightId => {
    const { removeFlightFromDate } = this.props
    const { currentDateDetail } = this.state
    if (!currentDateDetail || !currentDateDetail.id) {
      throw new Error('Missing currentDateDetail.id')
    }

    try {
      await removeFlightFromDate(currentDateDetail.id, flightId)
      await this.getDates()
      notification.success({ message: 'Thành công' })
      this.setState({ isShowDateDetail: false })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  handleShowDetailDate = date => {
    this.setState({ isShowDateDetail: true, currentDateDetail: date })
  }

  handleCloseDetailDate = () => {
    this.setState({ isShowDateDetail: false, currentDateDetail: {} })
  }

  handleAddFlightToDate = id => async flightIds => {
    const { addFlightsToDate } = this.props
    if (!id) {
      throw new Error('Missing dateId')
    }
    try {
      await addFlightsToDate(id, flightIds)
      await this.getDates()
      notification.success({ message: 'Thành công' })
      Modal.hide()
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  handleShowAddFlightToDate = date => {
    let { dateFlights } = date
    dateFlights =
      dateFlights && Array.isArray(dateFlights)
        ? dateFlights.map(d => d.flightId)
        : []
    Modal.show(
      <SelectableFlightList
        filters={{ status: 1 }}
        onCancel={() => Modal.hide()}
        ignoreIds={[...dateFlights]}
        onOk={this.handleAddFlightToDate(date ? date.id : undefined)}
      />,
      {
        title: <b>DANH SÁCH CHỌN CHUYẾN BAY</b>,
        style: { top: 10 },
        width: '95%',
        maxWidth: 800,
      },
    )
  }

  handleChangeTable = async ({ current }, filter, sorter) => {
    const { columnKey, order } = sorter
    const sortParam =
      order === 'ascend' ? { sortAsc: columnKey } : { sortDesc: columnKey }

    columnKey
      ? await this.getDates(current, null, sortParam)
      : await this.getDates(current)
  }

  getDates = async (current, pageSize, params) => {
    const { getDates } = this.props
    let { search } = this.state

    search = removeNullObject(search)
    const res = await getDates(current, pageSize, {
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
    await this.getDates()
  }

  handleShowAddDate = () => {
    Modal.show(<AddDateForm getDates={this.getDates} />, {
      title: <b>THÊM NGÀY BAY</b>,
      style: { top: 10 },
    })
  }

  handleShowEditForm = date => {
    Modal.show(<EditDateForm date={date} getDates={this.getDates} />, {
      title: <b>SỬA NGÀY BAY</b>,
      style: { top: 10 },
    })
  }

  handleSearch = name => value => {
    this.setState({ search: { ...this.state.search, [name]: value } }, () => {
      this.getDates()
      console.log(this.state)
    })
  }

  hanleChangeSearch = e => {
    const { name, value } = e.target
    this.setState({ search: { ...this.state.search, [name]: value } })
  }

  handleReset = () => {
    this.setState({ search: {} }, () => this.getDates())
  }

  render() {
    const {
      pagination,
      search = {},
      isShowDateDetail,
      currentDateDetail,
    } = this.state

    let { dates } = this.props
    dates = Array.isArray(dates) ? dates : []

    return (
      <Card title={<b>Ngày Bay</b>}>
        <Row type='flex' justify='space-between'>
          <Col></Col>
          <Col>
            <Button onClick={this.handleReset} icon='sync'>
              Làm mới
            </Button>{' '}
            <Button
              key='btn-add'
              onClick={this.handleShowAddDate}
              type='primary'
            >
              <Icon type='plus'></Icon>
              THÊM NGÀY BAY
            </Button>
          </Col>
        </Row>
        <br />

        <Table
          pagination={pagination}
          onChange={this.handleChangeTable}
          columns={this.columns}
          rowKey={i => i.id}
          dataSource={dates || []}
        ></Table>
        <Drawer
          title={<b>Thông tin chi tiết ngày bay</b>}
          onClose={this.handleCloseDetailDate}
          visible={isShowDateDetail}
          width='auto'
        >
          <div className='link d-flex align-items-center'>
            <img
              src={require('../../../assets/images/date.png')}
              alt='avatar'
              height={35}
            />
            <div>
              <Tag
                style={{
                  marginLeft: 10,
                  fontSize: '0.9em',
                  padding: '2px 8px',
                }}
              >
                {currentDateDetail
                  ? moment(currentDateDetail.departureDate, 'YYYY-MM-DD')
                      .format('DD-MM-YYYY')
                      .toString()
                  : '--'}
              </Tag>
            </div>
          </div>
          <Divider />
          <h3>Các chuyến bay trong ngày:</h3>
          <br />
          {currentDateDetail ? (
            <Table
              columns={this.flightColumns}
              rowKey={i => i.flightId}
              dataSource={currentDateDetail.dateFlights || []}
            ></Table>
          ) : (
            ''
          )}
        </Drawer>
      </Card>
    )
  }
}

export default DateList
