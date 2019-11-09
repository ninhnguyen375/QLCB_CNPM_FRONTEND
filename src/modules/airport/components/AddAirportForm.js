import React, { Component } from 'react'
import { Form, Input, Button, Card, notification, Icon } from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { createAirportAsync } from '../handlers'
import { handleError } from '../../../common/utils/handleError'

class AddAirportForm extends Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { form } = this.props
    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 50 } },
      async (err, values) => {
        if (err) {
          this.setState({ loading: false })
          return
        }

        try {
          await createAirportAsync(values)
          await this.props.getAirports()
          notification.success({ message: 'Thành công' })
          Modal.hide()
        } catch (err) {
          console.log('Ninh Debug: err', err)
          handleError(err, form, notification)
        }
        this.setState({ loading: false })
      },
    )
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label='Mã sân bay'>
            {getFieldDecorator('id', {
              rules: [
                {
                  required: true,
                  message: 'Mã sân bay là bắt buộc',
                },
              ],
            })(<Input placeholder='Mã sân bay' />)}
          </Form.Item>
          <Form.Item label='Tên sân bay'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Tên sân bay là bắt buộc',
                },
              ],
            })(<Input placeholder='Tên sân bay' />)}
          </Form.Item>
          <Form.Item label='Địa Điểm'>
            {getFieldDecorator('location', {
              rules: [
                {
                  required: true,
                  message: 'Địa Điểm',
                },
              ],
            })(<Input placeholder='Địa Điểm' />)}
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <Button
              onClick={() => Modal.hide()}
              icon='close-circle'
              style={{ marginRight: 5 }}
            >
              Hủy
            </Button>
            {this.state.loading ? (
              <Button disabled type='primary'>
                <Icon type='sync' spin />
                Thêm
              </Button>
            ) : (
              <Button htmlType='submit' type='primary' icon='plus-circle'>
                Thêm
              </Button>
            )}
          </div>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(AddAirportForm)
