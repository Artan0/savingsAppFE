import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import logo from '../../assets/images/savings_app_logo_300_80.png';
import { User } from '../../types/user';
import { useUser } from '../../context/User-context'; // Import useUser hook
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

interface CustomHeaderProps {
    isMenuOpen: boolean; // Define prop for isMenuOpen
}

const StyledHeader = styled(Header)`
    text-align: center;
    color: #fff;
    height: 64px;
    padding: 0 48px;
    background-color: #0a2540;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10; 
`;

const Logo = styled.img`
    width: 180px;
    height: 50px;
`;

const Nav = styled.nav<{ $isMenuOpen: boolean }>`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;

    @media (max-width: 768px) {
        display: ${({ $isMenuOpen }) => ($isMenuOpen ? 'flex' : 'none')};
        flex-direction: column;
        position: absolute;
        top: 64px;
        left: 0;
        width: 100%;
        background-color: #0a2540;
        padding: 16px 0;
        animation: ${({ $isMenuOpen }) => $isMenuOpen && css`${slideDown} 0.3s ease-in-out`};
    }
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    width: 50%;
    padding: 0;
    margin: 0;
    font-weight: bold;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
    }
`;

const NavItem = styled.li`
    display: inline-block;

    @media (max-width: 768px) {
        padding: 10px 0;
    }
`;

const UserSection = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;

const WelcomeMessage = styled.span`
    margin-right: 16px;
`;

const AuthList = styled.ul`
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
    }
`;

const AuthItem = styled.li`
    display: inline-block;
    margin-right: 40px;

    @media (max-width: 768px) {
        margin-right: 0;
        padding-right: 10px;
    }
`;

const BurgerMenu = styled(MenuOutlined)`
    display: none;
    font-size: 24px;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
`;

const CloseMenu = styled(CloseOutlined)`
    display: none;
    font-size: 24px;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-100%);
    }
`;

const MainContent = styled.main<{ $isMenuOpen: boolean }>`
    transition: margin-top 0.3s ease-in-out;
    margin-top: ${({ $isMenuOpen }) => ($isMenuOpen ? '200px' : '0')};
`;

const CustomHeader: React.FC<CustomHeaderProps> = ({ isMenuOpen }) => {
    const { user, logout } = useUser();

    const toggleMenu = () => {
        // Implement toggleMenu logic
    };

    return (
        <>
            <StyledHeader>
                <Nav $isMenuOpen={isMenuOpen}>
                    <Logo src={logo} alt="Logo" />

                    <NavList>
                        <NavItem><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></NavItem>
                        <NavItem><Link to="/contact" style={{ textDecoration: 'none', color: '#fff' }}>Contact</Link></NavItem>
                        <NavItem><Link to="/about" style={{ textDecoration: 'none', color: '#fff' }}>About Us</Link></NavItem>
                        {user ? (
                            <>
                                <NavItem><Link to="/dashboard" style={{ textDecoration: 'none', color: '#fff' }}>Dashboard</Link></NavItem>

                            </>
                        ) :
                            (
                                <></>
                            )}
                    </NavList>
                    <UserSection>
                        {user ? (
                            <>
                                <WelcomeMessage>Welcome, {user.firstName}</WelcomeMessage>
                                <Button  onClick={logout}>Logout</Button>
                            </>
                        ) : (
                            <AuthList>
                                <Link to="/auth" style={{ textDecoration: 'none', color: '#fff' ,}}><Button size="middle" shape="round" style={{ fontWeight:'500'}}>Login</Button></Link>
                                <span className='mx-2'></span>
                                <Link to="/auth" style={{ textDecoration: 'none', color: '#fff' }}><Button size="middle" shape="round" style={{ fontWeight:'500'}}>Register</Button></Link>
                            </AuthList>
                        )}
                    </UserSection>
                </Nav>

                {isMenuOpen ? (
                    <CloseMenu onClick={toggleMenu} />
                ) : (
                    <BurgerMenu onClick={toggleMenu} />
                )}
            </StyledHeader>
            <MainContent $isMenuOpen={isMenuOpen}>
            </MainContent>
        </>
    );
};

export default CustomHeader;
