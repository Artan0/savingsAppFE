import * as React from 'react';
import { Header } from 'antd/es/layout/layout';
import styled from 'styled-components';
import logo from '../../assets/images/savings_app_logo_300_80.png';
import { User } from '../../types/user';
import { request, setAuthHeader } from '../../helper/axios_helper';

interface CustomHeaderState {
    loggedInUser: User | null;
    data: any[];
}

const StyledHeader = styled(Header)`
    text-align: center;
    color: #fff;
    height: 64px;
    padding-inline: 48px;
    line-height: 64px;
    background-color: #0a2540;
`;

class CustomHeader extends React.Component<{}, CustomHeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loggedInUser: null,
            data: []
        };
    }

    componentDidMount() {
        this.loadUserInfo();
    }

    loadUserInfo = () => {
        request(
            "GET",
            "http://localhost:8081/user-info",
            {}).then(
                (response: any) => {
                    this.setState({ loggedInUser: response.data });
                }).catch(
                    (error: any) => {
                        if (error.response && error.response.status === 401) {
                            this.handleLogout();
                        } else {
                            this.setState({ data: error.response.code });
                        }
                    }
                );
    }

    handleLogout = () => {
        setAuthHeader(null);
        this.setState({ loggedInUser: null });
    };

    render() {
        const { loggedInUser } = this.state;

        return (

            <StyledHeader>
                <header>
                    <div className='row' style={{ alignContent: 'center' }}>
                        <div className='col-2'>
                            <img src={logo} style={{ width: '180px', height: '50px' }} alt="Logo"></img>
                        </div>
                        <div className='col-8' style={{ padding: 0, fontWeight: 'bolder' }}>
                            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-evenly' }}>
                                <li style={{ display: 'inline-block' }}>Home</li>
                                <li style={{ display: 'inline-block' }}>Wallet</li>
                                <li style={{ display: 'inline-block' }}>About Us</li>
                                <li style={{ display: 'inline-block' }}>Contact</li>
                            </ul>
                        </div>
                        <div className='col-2' style={{}}>
                            {loggedInUser ? (
                                <>
                                    <span>Welcome, {loggedInUser.firstName}</span>
                                    <button onClick={this.handleLogout}>Logout</button>
                                </>
                            ) : (
                                <ul style={{ listStyle: 'none', display: 'flex' }}>
                                    <li style={{ display: 'inline-block', marginRight: '40px' }}>Login</li>
                                    <li style={{ display: 'inline-block' }}>Register</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </header>
            </StyledHeader>
        );
    }
}

export default CustomHeader;
