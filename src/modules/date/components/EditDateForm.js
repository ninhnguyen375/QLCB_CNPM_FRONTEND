import React, { Component } from 'react'
import { Form, Input, Button, Card, notification, Icon, DatePicker } from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { handleError } from '../../../common/utils/handleError'
import { updateDate } from '../handlers'
import moment from 'moment'

class EditDateForm extends Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    this.setState({ loading: true })
    e.preventDefault()

    const { form, date } = this.props

    if (!date && !date.id) {
      this.setState({ loading: false })
      notification.error('ERROR-001: Missing ID')
      return
    }

    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 50 } },
      async (err, values) => {
        if (err) {
          this.setState({ loading: false })
          return
        }

        try {
          await updateDate(values, date.id)
          await this.props.getDates()
          notification.success({ message: 'Thành công' })
          Modal.hide()
        } catch (err) {
          console.log('Ninh Debug: err', err)
          handleError(err, form, notification)
        }
      },
    )
    this.setState({ loading: false })
  }

  render() {
    const { form, date } = this.props
    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label='Ngày Bay'>
            {getFieldDecorator('departureDate', {
              rules: [
                {
                  required: true,
                  message: 'Ngày Bay là bắt buộc',
                },
              ],
              initialValue: moment(date.departureDate),
            })(
              <DatePicker
                format='DD-MM-YYYY'
                style={{ width: '100%' }}
                placeholder='Ngày Bay'
              />,
            )}
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
              <Button disabled>
                <Icon type='sync' spin />
                Sửa
              </Button>
            ) : (
              <Button htmlType='submit' type='primary' icon='check-circle'>
                Sửa
              </Button>
            )}
          </div>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(EditDateForm)
