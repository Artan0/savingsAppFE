import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Layout } from 'antd';
import CustomLayout from '../components/layout';

const { Header, Footer, Sider, Content } = Layout;

const StyledContent = styled(Content)`
    text-align: center;
    min-height: 120px;
    line-height: 120px;
    color: #fff;
    background-color: #0958d9;
`;
class Login extends Component {
    render() {
        return (
            <CustomLayout>
                <StyledContent>Login Content</StyledContent>
            </CustomLayout>
        );
    }
}

export default Login;
