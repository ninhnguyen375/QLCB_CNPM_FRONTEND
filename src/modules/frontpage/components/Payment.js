import React, { Component } from 'react'
import { Card, Upload, Icon, Divider } from 'antd'
import point from '../../../assets/images/01-point.png'
import { Button } from 'antd/lib/radio'

export class Payment extends Component {
  render() {
    return (
      <div className='payment'>
        <h5 className='title'>
          Tìm chuyến bay từ Hà Nội (HAN) đến Hồ Chí Mình (SGN)
        </h5>

        <div>
          <div
            style={{
              marginBottom: 10,
              border: '1px solid #1890FF',
              padding: '20px',
              borderRadius: 10,
            }}
          >
            <div className='d-flex flex-wrap justify-content-between'>
              <div className='row d-flex align-items-center justify-content-between'>
                <div className='col'>
                  <p className='fwb'>Hà Nội</p>
                  <p>21:15, 12/11/2019</p>
                  <p>Sân Bay Nội Bài</p>
                </div>
                <div className='col'>
                  <img
                    alt='point'
                    style={{ paddingBottom: 10, paddingLeft: 7 }}
                    src={point}
                  />
                </div>
                <div className='col'>
                  <p className='fwb'>Hồ Chí Minh</p>
                  <p>21:15, 12/11/2019</p>
                  <p>Sân Bay Tân Sơn Nhất</p>
                </div>
              </div>
              <Divider type='vertical' style={{ height: 80 }} />
              <div>
                <p>Loại vé:</p>
                <p>Vé loại 1</p>
              </div>
              <Divider type='vertical' style={{ height: 80 }} />
              <div>
                <p>Số lượng:</p>
                <p>2</p>
              </div>
              <Divider type='vertical' style={{ height: 80 }} />
              <div>
                <p>Giá vé:</p>
                <p>200.000đ</p>
              </div>
              <Divider type='vertical' style={{ height: 80 }} />
              <div>
                <p className='fwb'>Tổng cộng</p>
                <p>400.000đ</p>
              </div>
            </div>
            <Divider />
            <div>
              <p className='fwb tar'>
                Số tiền bạn phải trả:{' '}
                <span className='fwb' style={{ color: '#FFA801' }}>
                  400.000đ
                </span>
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 30 }}></div>
        <div className='row d-flex'>
          <div className='col-lg-6'>
            <Card
              style={{ height: '100%' }}
              title={<b>CHUYỂN KHOẢN NGÂN HÀNG</b>}
            >
              <div className='row'>
                <div className='col-lg-4 fwb'>Ngân hàng</div>
                <div className='col-lg-8'>Ngân hàng đầu tư và phát triển</div>
              </div>
              <Divider />
              <div className='row'>
                <div className='col-lg-4 fwb'>Chi nhánh</div>
                <div className='col-lg-8'>Chi nhánh Chương Dương</div>
              </div>
              <Divider />
              <div className='row'>
                <div className='col-lg-4 fwb'>Tên người hưởng</div>
                <div className='col-lg-8'>CÔNG TY CỔ PHẦN THÔNG MINH</div>
              </div>
              <Divider />
              <div className='row'>
                <div className='col-lg-4 fwb'>Số tài khoản</div>
                <div className='col-lg-8'>01234567890</div>
              </div>
              <Divider />
              <div className='row'>
                <div className='col-lg-4 fwb'>Nội dung</div>
                <div className='col-lg-8'>DH 01234567</div>
              </div>
            </Card>
          </div>
          <div className='col-lg-6'>
            <Card
              style={{ height: '100%' }}
              title={<b>BẰNG CHỨNG THANH TOÁN</b>}
            >
              <div className='row'>
                <div className='col-lg-12 d-flex justify-content-center'>
                  <img
                    alt=''
                    className='d-block m-auto'
                    src='https://scontent-sin2-2.xx.fbcdn.net/v/t1.15752-9/75429332_531840240939716_7679763762789744640_n.png?_nc_cat=108&_nc_oc=AQkyRMDjw6Mkvpu8bQ2Eq3ntycwudB8UjS8P_WXgnCMYDMq1y4LjBqaT7eN1zrB3oDU&_nc_ht=scontent-sin2-2.xx&oh=72cdcc4631c99d45bbe76c8dbf6458e3&oe=5E2302BC'
                  />
                </div>
              </div>
              <div style={{ marginTop: 30 }}></div>
              <div className='row'>
                <div className='col-lg-12 d-flex justify-content-center'>
                  <Upload>
                    <Button>
                      <Icon type='upload' /> Bâm để tải lên Bằng chứng thanh
                      toán
                    </Button>
                  </Upload>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default Payment
