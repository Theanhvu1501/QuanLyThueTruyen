import React from 'react';
import 'antd/dist/antd.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';


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
    getItem('Sách', '1'),
    getItem('Sách tại cửa hàng', '2'),

  ]),

  getItem('Nhân sư', 'sub2', <AppstoreOutlined />, [
    getItem('Khách hàng', 'KH'),
    getItem('Nhân viên', 'NV'),
  ]),
    getItem('Giao dịch', 'sub3', <MailOutlined />, [
    getItem('Thông tin giao dịch', 'HD'),
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
  const onClick = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default Sidebar;