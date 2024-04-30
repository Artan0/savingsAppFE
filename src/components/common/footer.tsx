import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled(Footer)`
    text-align: center;
    color: #fff;
    background-color: #4096ff;
`;

const CustomFooter: React.FC = () => {
    return (
        <StyledFooter>
            <p>This is footer</p>
        </StyledFooter>
    );
};

export default CustomFooter;
