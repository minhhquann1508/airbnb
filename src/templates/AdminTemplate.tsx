import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faLocation, faReceipt, faUsers } from '@fortawesome/free-solid-svg-icons';
const { Header, Sider, Content } = Layout;

export default function AdminTemplate() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  let navbarKey = pathname.split('/')[2];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[navbarKey]}
          onClick={({key})=> navigate(`/admin/${key}`)}
          items={[
            {
              key: 'manageUser',
              icon: <FontAwesomeIcon icon={faUsers} />,
              label: 'Quản lý người dùng',
            },
            {
              key: 'manageLocation',
              icon: <FontAwesomeIcon icon={faLocation} />,
              label: 'Quản lý vị trí',
            },
            {
              key: 'manageRoom',
              icon: <FontAwesomeIcon icon={faHouseUser} />,
              label: 'Quản lý phòng',
            },
            {
              key: 'manageRoomOrder',
              icon: <FontAwesomeIcon icon={faReceipt} />,
              label: 'Quản lý đặt phòng',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight:700,
            background: colorBgContainer,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}
