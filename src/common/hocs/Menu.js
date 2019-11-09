import { ROLE } from '../../modules/user/models'

const menu = {
  [ROLE.ADMIN]: [
    {
      key: 'admin/dashboard',
      name: 'Bảng Điều Khiển',
      icon: 'safety-certificate',
      children: [],
    },
    {
      key: 'admin/staff',
      name: 'Nhân Viên',
      icon: 'user',
      children: [],
    },
    {
      key: 'admin/customer',
      name: 'Khách hàng',
      icon: 'user',
      children: [],
    },
    {
      key: 'admin/flight',
      name: 'Chuyến bay',
      icon: 'rocket',
      children: [],
    },
    {
      key: 'admin/airplane',
      name: 'Hãng hàng không',
      icon: 'rocket',
      children: [],
    },
    {
      key: 'admin/location',
      name: 'Địa điểm',
      icon: 'bank',
      children: [],
    },
    {
      key: 'admin/order',
      name: 'Hóa đơn',
      icon: 'file-text',
      children: [],
    },
  ],
  [ROLE.STAFF]: [
    {
      key: 'admin/dashboard',
      name: 'Bảng Điều Khiển',
      icon: 'safety-certificate',
      children: [],
    },
    {
      key: 'admin/customer',
      name: 'Khách hàng',
      icon: 'user',
      children: [],
    },
    {
      key: 'admin/order',
      name: 'Hóa đơn',
      icon: 'file-text',
      children: [],
    },
  ],
}
export default menu
