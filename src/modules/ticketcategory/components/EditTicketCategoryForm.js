import React, { Component } from 'react'
import { Form, Input, Button, Card, notification, Icon } from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { handleError } from '../../../common/utils/handleError'
import { updateTicketCategory } from '../handlers'

class EditTicketCategoryForm extends Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    this.setState({ loading: true })
    e.preventDefault()

    const { form, ticketCategory } = this.props

    if (!ticketCategory && !ticketCategory.id) {
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
          await updateTicketCategory(values, ticketCategory.id)
          await this.props.getTicketCategories()
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
    const { form, ticketCategory } = this.props
    const { getFieldDecorator } = form

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label='Tên loại vé'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Tên loại vé là bắt buộc',
                },
              ],
              initialValue: ticketCategory ? ticketCategory.name || '' : '',
            })(<Input placeholder='Tên loại vé' />)}
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

export default Form.create()(EditTicketCategoryForm)
