import React, { Component } from 'react'
import {
  Table,
  Card,
  Button,
  Row,
  Col,
  Icon,
  notification,
  Tag,
  Popconfirm,
} from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import AddLuggageForm from './AddLuggageForm'
import { handleError } from '../../../common/utils/handleError'
import EditLuggageForm from './EditLuggageForm'
import removeNullObject from '../../../common/utils/removeObjectNull'
import { priceFormat } from '../../../common/utils/stringFormater'

export class LuggageList extends Component {
  state = {
    pagination: {},
    search: {},
  }

  columns = [
    {
      key: 'LuggageWeight',
      dataIndex: 'luggageWeight',
      title: 'Khối lượng',
      sorter: true,
      render: (value, record) => (
        <div className='link d-flex align-items-center'>
          <img
            src={require('../../../assets/images/luggage.png')}
            alt='avatar'
            height={35}
          />
          <div>
            <Tag
              style={{
                marginLeft: 10,
                fontSize: '0.9em',
                padding: 3,
                fontWeight: 'bold',
              }}
              color='blue'
            >
              {value} Kg
            </Tag>
          </div>
        </div>
      ),
    },
    {
      key: 'Price',
      dataIndex: 'price',
      title: 'Giá tiền',
      sorter: true,
      render: (value, record) => (
        <div className='price-color fwb'>{priceFormat(value)}VNĐ</div>
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
              title='Bạn có muốn xóa loại hành lý này?'
              onConfirm={() => this.handleDeleteLuggage(r.id)}
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
      ? await this.getLuggages(current, null, sortParam)
      : await this.getLuggages(current)
  }

  getLuggages = async (current, pageSize, params) => {
    const { getLuggages } = this.props
    let { search } = this.state

    search = removeNullObject(search)
    const res = await getLuggages(current, pageSize, { ...search, ...params })
    if (res.success) {
      this.setState({ pagination: res })
    } else {
      handleError(res, null, notification)
    }
  }

  async componentDidMount() {
    await this.getLuggages()
  }

  handleShowAddLuggage = () => {
    Modal.show(<AddLuggageForm getLuggages={this.getLuggages} />, {
      title: <b>THÊM LOẠI HÀNH LÝ</b>,
      style: { top: 10 },
    })
  }

  handleShowEditForm = luggage => {
    Modal.show(
      <EditLuggageForm luggage={luggage} getLuggages={this.getLuggages} />,
      {
        title: <b>SỬA LOẠI HÀNH LÝ</b>,
        style: { top: 10 },
      },
    )
  }

  handleSearch = name => value => {
    this.setState({ search: { ...this.state.search, [name]: value } }, () => {
      this.getLuggages()
    })
  }

  hanleChangeSearch = e => {
    const { name, value } = e.target
    this.setState({ search: { ...this.state.search, [name]: value } })
  }

  handleReset = () => {
    this.setState({ search: {} }, () => this.getLuggages())
  }

  handleDeleteLuggage = async id => {
    const { deleteLuggage } = this.props

    try {
      await deleteLuggage(id)
      await this.getLuggages()
      notification.success({ message: 'Thành công' })
    } catch (err) {
      handleError(err, null, notification)
    }
  }

  render() {
    const { pagination } = this.state

    let { luggages } = this.props
    luggages = luggages || []

    return (
      <Card title={<b>LOẠI HÀNH LÝ</b>}>
        <Row type='flex' justify='space-between'>
          <Col>
            <div className='d-flex'></div>
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
              onClick={this.handleShowAddLuggage}
              type='primary'
            >
              <Icon type='plus'></Icon>
              THÊM LOẠI HÀNH LÝ
            </Button>
          </Col>
        </Row>
        <br />

        <Table
          pagination={pagination}
          onChange={this.handleChangeTable}
          columns={this.columns}
          rowKey={i => i.id}
          dataSource={luggages || []}
          scroll={{ x: '100%' }}
        ></Table>
      </Card>
    )
  }
}

export default LuggageList
