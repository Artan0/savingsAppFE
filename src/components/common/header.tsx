import { Header } from 'antd/es/layout/layout';
import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/savings_app_logo_300_80.png';

const StyledHeader = styled(Header)`
    text-align: center;
    color: #fff;
    height: 64px;
    padding-inline: 48px;
    line-height: 64px;
    background-color: #0a2540;
`;

const CustomHeader: React.FC = () => {
    return (
        <StyledHeader>
            <header>
                <div className='row' style={{ alignContent:'center'}}>
                    <div className='col-2'>
                        <img src={logo} style={{width:'180px', height:'50px'}}></img>
                    </div>
                    <div className='col-8' style={{padding: 0, fontWeight:'bolder'}}>
                        <ul style={{listStyle:'none',display:'flex', justifyContent:'space-evenly'}}>
                            <li style={{ display: 'inline-block'}}>Home</li>
                            <li style={{ display: 'inline-block'}}>Wallet</li>
                            <li style={{ display: 'inline-block'}}>About Us</li>
                            <li style={{ display: 'inline-block' }}>Contact</li>
                        </ul>
                    </div>
                    <div className='col-2' style={{}}>
                        <ul style={{listStyle:'none', display:'flex'}}>
                            <li style={{ display: 'inline-block', marginRight:'40px'}}>Login</li>
                            <li style={{ display: 'inline-block'}}>Register</li>
                        </ul>
                        
                    </div>
                </div>

            </header>
        </StyledHeader>
    );
};

export default CustomHeader;
