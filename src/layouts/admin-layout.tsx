import React, { ReactNode, useEffect, useState } from 'react';
import { PieChartOutlined, UserOutlined, AreaChartOutlined, DeliveredProcedureOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/common/AdminHeader';

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
        getItem('Add Transaction', '4', <DeliveredProcedureOutlined />, undefined, () => navigate('/add-transaction')),

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
        const displayName = item === 'dashboard' ? 'Dashboard' : item.charAt(0).toUpperCase() + item.slice(1);
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{displayName}</Link>
            </Breadcrumb.Item>
        );
    });

    if (!breadcrumbItems.some(item => item.key === '/dashboard')) {
        breadcrumbItems.unshift(
            <Breadcrumb.Item key="/dashboard">
                <Link to="/dashboard">Dashboard</Link>
            </Breadcrumb.Item>
        );
    }

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
                <AdminHeader />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {breadcrumbItems}
                    </Breadcrumb>
                    <div style={{ paddingTop: '1rem', }}>{children}</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Web Programming ©{new Date().getFullYear()} Developed By Artan & Enes
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
