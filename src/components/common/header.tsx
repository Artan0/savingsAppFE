import { Header } from 'antd/es/layout/layout';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
    text-align: center;
    color: #fff;
    height: 64px;
    padding-inline: 48px;
    line-height: 64px;
    background-color: #4096ff;
`;

const CustomHeader: React.FC = () => {
    return (
        <StyledHeader>
            <>This is header</>
        </StyledHeader>
    );
};

export default CustomHeader;
