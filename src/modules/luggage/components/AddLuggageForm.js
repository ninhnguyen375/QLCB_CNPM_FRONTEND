import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Card,
  notification,
  Icon,
  InputNumber,
} from 'antd'
import Modal from '../../../common/components/widgets/Modal'
import { createLuggageAsync } from '../handlers'
import { handleError } from '../../../common/utils/handleError'

class AddLuggageForm extends Component {
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
          await createLuggageAsync(values)
          await this.props.getLuggages()
          notification.success({ message: 'Thành công' })
          Modal.hide()
        } catch (err) {
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
          <Form.Item hasFeedback label='Khối lượng hành lý'>
            {getFieldDecorator('luggageWeight', {
              rules: [
                {
                  required: true,
                  message: 'Khối lượng hành lý là bắt buộc',
                },
              ],
            })(
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                placeholder='Khối lượng hành lý'
              />,
            )}
          </Form.Item>
          <Form.Item hasFeedback label='Giá tiền'>
            {getFieldDecorator('price', {
              rules: [
                {
                  required: true,
                  message: 'Giá tiền là bắt buộc',
                },
              ],
            })(<Input placeholder='Giá tiền' />)}
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

export default Form.create()(AddLuggageForm)
