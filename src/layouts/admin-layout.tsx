import React, { ReactNode, useEffect, useState } from 'react';
import { PieChartOutlined, UserOutlined, AreaChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomHeader from '../components/common/Header';

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

    const [selectedKey, setSelectedKey] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };
    const items: MenuItem[] = [
        getItem('Dashboard', '1', <AreaChartOutlined />, undefined, () => navigate('/dashboard')),
        getItem('My Goals', '2', <PieChartOutlined />, undefined, () => navigate('/goals')),
        getItem('My Profile', '3', <UserOutlined />, undefined, () => navigate('/profile')),
    ];

    useEffect(() => {
        if (location.pathname === '/goals') {
            setSelectedKey('2');
        } else if (location.pathname === '/profile') {
            setSelectedKey('3');
        } else if (location.pathname === '/dashboard') {
            setSelectedKey('1')
        }
    }, [location]);

    const breadcrumbItems = location.pathname.split('/').filter(item => item).map((item, index) => {
        const url = `/${location.pathname.split('/').slice(1, index + 2).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
            </Breadcrumb.Item>
        );
    });

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ backgroundColor: '#0a2540' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    style={{ backgroundColor: '#0a2540', marginTop: '3.7rem' }}
                    theme='dark'
                    selectedKeys={[selectedKey]}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <CustomHeader isMenuOpen={isMenuOpen} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        {breadcrumbItems}
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
