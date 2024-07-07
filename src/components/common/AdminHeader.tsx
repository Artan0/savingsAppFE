import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Badge, Drawer, List, Tooltip, message, Dropdown, Space } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HeartOutlined, DeleteOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import axios from "axios";
import { useUser } from "../../context/User-context";
import FavoriteBorderIcon from "@ant-design/icons"
import LogoSavings from "../../assets/images/savings_app_logo_300_80.png"
import { Header } from 'antd/es/layout/layout';


const StyledHeader = styled(Header) <{ isFixed: boolean }>`
    text-align: center;
    color: #fff;
    padding: 0 48px;
    background-color: #0a2540;
    z-index: 1000; 
    position: ${(props) => (props.isFixed ? 'fixed' : 'absolute')};
    top: ${(props) => (props.isFixed ? '0' : 'auto')};
    transition: top 0.4s ease-out, opacity 0.4s ease-out, background-color 0.4s ease-out;
    opacity: ${(props) => (props.isFixed ? 1 : 1)};
    height: 64px;
    justify-content: space-between;
    position: relative;
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 180px;
    height: 50px;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    @media (max-width:993px){
        display: flex;
        justify-content: end;
        align-items: center;
    }
`;

const UserSection = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const AuthList = styled.div`
    display: flex;
    align-items: center; 
    padding: 0;
    margin: 0;
    height: 100%; 
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 1rem;
`;

const AdminHeader: React.FC = () => {
    const { user, logout } = useUser();
    const [isFixed, setIsFixed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100;
            setIsFixed(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);




    const determineActiveMenuItem = (path: string) => {
        switch (path) {
            case '/':
                return ['home'];
            case '/contact':
                return ['contact'];
            case '/about':
                return ['about'];
            case '/dashboard':
                return ['dashboard'];
            case '/auth':
                return ['auth'];
            default:
                return [''];
        }
    };

    const activeMenuItem = determineActiveMenuItem(location.pathname);


    return (
        <StyledHeader isFixed={isFixed}>
            <Nav>
                <Menu
                    className="d-flex justify-content-center d-none d-lg-flex"
                    theme="light"
                    mode="horizontal"
                    style={{ minWidth: 0, flex: "auto", zIndex: 1, backgroundColor: "#0a2540" }}

                    selectedKeys={activeMenuItem}
                >
                    <Menu.Item className="text-white" key="home">
                        <StyledLink to="/">Home</StyledLink>
                    </Menu.Item>
                    <Menu.Item className="text-white" key="about">
                        <StyledLink to="/about">About</StyledLink>
                    </Menu.Item>
                    <Menu.Item className="text-white" key="contact">
                        <StyledLink to="/contact">Contact</StyledLink>
                    </Menu.Item>
                    {user ? (
                        <>
                            <Menu.Item className="text-white" key="dashboard">
                                <StyledLink to="/dashboard">Dashboard</StyledLink>
                            </Menu.Item>
                        </>
                    ) :
                        (
                            <></>
                        )}

                </Menu>
                <UserSection>
                    {user ? (
                        <>


                            <Space>
                                <span style={{ cursor: 'pointer' }} className="text-white px-2">Welcome! {user.firstName}</span>
                            </Space>

                            <Button
                                onClick={logout}
                                shape="round"
                                size="large"
                                className="d-none d-lg-inline-block"
                                style={{ margin: 'auto 0' }}
                            >
                                Logout
                            </Button>
                            <Button
                                icon={<MenuOutlined />}
                                onClick={() => setDrawerVisible(true)}
                                className="d-lg-none"
                                style={{ margin: 'auto 0' }}
                            />
                        </>
                    ) : (
                        <AuthList>
                            <StyledLink to="/auth" style={{ textDecoration: 'none' }}>
                                <Button
                                    shape="round"
                                    size="large"
                                    className="d-none d-lg-inline-block"
                                    style={{ margin: 'auto 0' }}
                                >
                                    Login
                                </Button>
                            </StyledLink>
                            <span className='mx-2 d-none d-lg-inline-block'></span>
                            <StyledLink to="/auth" style={{ textDecoration: 'none', color: '#fff' }}>
                                <Button
                                    shape="round"
                                    size="large"
                                    type="primary"
                                    className="d-none d-lg-inline-block"
                                    style={{ margin: 'auto 0' }}
                                >
                                    Register
                                </Button>
                            </StyledLink>
                            <Button
                                icon={<MenuOutlined />}
                                onClick={() => setDrawerVisible(true)}
                                className="d-lg-none"
                                style={{ margin: 'auto 0' }}
                            />
                        </AuthList>
                    )}
                </UserSection>
            </Nav>
            <Drawer
                title="Menu"
                placement="right"
                closable={true}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                style={{ zIndex: 12000 }}
            >
                <Menu mode="vertical" selectedKeys={activeMenuItem}>
                    <Menu.Item key="home">
                        <StyledLink to="/">Home</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="about">
                        <StyledLink to="/about">About</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="contact">
                        <StyledLink to="/contact">Contact</StyledLink>
                    </Menu.Item>

                </Menu>
                <Menu mode="vertical">
                    {user ? (
                        <>
                            <Menu.Item key="dashboard">
                                <StyledLink to="/dashboard">Dashboard</StyledLink>
                            </Menu.Item>
                            <Space>
                                <span style={{ cursor: 'pointer' }} className="text-white px-2">Welcome! {user.firstName}</span>
                            </Space>
                            <Menu.Item key="logout" onClick={logout}>
                                Logout
                            </Menu.Item>
                        </>
                    ) : (
                        <>
                            <Menu.Item key="login">
                                <StyledLink to="/auth">Login</StyledLink>
                            </Menu.Item>
                            <Menu.Item key="register">
                                <StyledLink to="/auth">Register</StyledLink>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </Drawer>
        </StyledHeader>
    );
};

export default AdminHeader;
