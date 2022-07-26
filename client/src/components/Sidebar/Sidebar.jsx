import React from 'react';
import 'antd/dist/antd.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Sách', 'sub1', <MailOutlined />, [
    getItem('Sách', 'Sach'),
    getItem('Sách tại cửa hàng', 'SachTaiCuaHang'),

  ]),

  getItem('Nhân sư', 'sub2', <AppstoreOutlined />, [
    getItem('Khách hàng', 'KhachHang'),
    getItem('Nhân viên', 'NhanVien'),
  ]),
    getItem('Giao dịch', 'sub3', <MailOutlined />, [
    getItem('Thông tin giao dịch', 'ThongTinGiaoDich'),
  ]),
  getItem('Thống kê', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
    getItem('Option 13', '13'),
    getItem('Option 14', '14'),
    getItem('Option 15', '15'),
    getItem('Option 16', '16'),
  ]),
];

const Sidebar = () => {
  const history = useHistory();
  const onClick = (e) => {
    history.push(`/home/${e.key}`)
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1','sub2','sub3','sub4']}
      mode="inline"
      items={items}
    />
  );
};

export default Sidebar;