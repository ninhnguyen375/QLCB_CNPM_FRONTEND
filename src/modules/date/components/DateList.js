import React, { Component } from 'react'
import { Table, Card, Button, Row, Col, Input, Icon, notification } from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import AddDateForm from './AddDateForm'
import { handleError } from '../../../common/utils/handleError'
import EditDateForm from './EditDateForm'
import moment from 'moment'
import SelectableFlightList from '../../flight/components/SelectableFlightList'
import removeNullObject from '../../../common/utils/removeObjectNull'

export class DateList extends Component {
  state = {
    pagination: {},
    search: {},
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
            <span style={{ marginLeft: 10 }}>
              {moment(value, 'YYYY-MM-DD')
                .format('DD-MM-YYYY')
                .toString()}
            </span>
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

  handleAddFlightToDate = flightIds => {
    console.log('Ninh Debug: flightIds', flightIds)
  }

  handleShowAddFlightToDate = date => {
    Modal.show(
      <SelectableFlightList
        filters={{ status: 1 }}
        onCancel={() => Modal.hide()}
        onOk={this.handleAddFlightToDate}
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
    const { pagination, search = {} } = this.state

    let { dates } = this.props
    dates = Array.isArray(dates) ? dates : []

    return (
      <Card title={<b>Ngày Bay</b>}>
        <Row type='flex' justify='space-between'>
          <Col>
            <div className='d-flex'>
              <Input.Search
                value={search.name}
                style={{ marginRight: 5, width: 250 }}
                name='name'
                onSearch={this.handleSearch('name')}
                placeholder='Tìm theo Ngày bay'
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
      </Card>
    )
  }
}

export default DateList
