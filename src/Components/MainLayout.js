import React, { useState } from 'react';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { HiHome } from "react-icons/hi"
import { FiUsers } from "react-icons/fi"
import { AiOutlineLogout } from "react-icons/ai"
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h2 className='text'>Sundrani</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key == "signout") {
                        } else {
                            navigate(key)
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <HiHome className='fs-5' />,
                            label: 'Channel List',
                        },
                        {
                            key: 'userList',
                            icon: <FiUsers className='fs-5' />,
                            label: 'Users',
                        },
                        {
                            key: 'logout',
                            icon: < AiOutlineLogout className='fs-5' />,
                            label: 'logout',
                        },
                    ]}
                />
            </Sider>

            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div className="header-content">
                        <div className="trigger-container">
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </div>
                        <button onClick={handleGoBack} className="back-button">Go Back</button>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
