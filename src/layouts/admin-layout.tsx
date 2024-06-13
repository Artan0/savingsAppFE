import React, { ReactNode, useState } from 'react';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomHeader from '../components/common/header';

const { Header, Content, Footer, Sider } = Layout;

interface CustomLayoutProps {
    children: ReactNode;
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    onClick?: () => void,
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        onClick,
    } as MenuItem;
}

const AdminLayout: React.FC<CustomLayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const navigate = useNavigate();

    const items: MenuItem[] = [
        getItem('My Goals', '1', <PieChartOutlined />, undefined, () => navigate('/goals')),
        getItem('My Profile', '2', <UserOutlined />, undefined, () => navigate('/profile')),
    ];

    const breadcrumbItems = location.pathname === '/goals'
        ? ['Home', 'Goals']
        : location.pathname === '/profile'
            ? ['Home', 'Profile']
            : ['Home', 'User', 'Bill'];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ backgroundColor: '#0a2540' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu style={{ backgroundColor: '#0a2540' }} theme='dark' defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <CustomHeader />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {breadcrumbItems.map((item, index) => (
                            <Breadcrumb.Item key={index}>
                                {item === 'Home' ? <Link to="/">{item}</Link> : item}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <div>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
