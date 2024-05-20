import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/savings_app_logo_300_80.png';

const StyledFooter = styled(Footer)`
    text-align: center;
    color: #fff;
    background-color: #0a2540;
`;

const CustomFooter: React.FC = () => {
    return (
        <StyledFooter>
            <footer style={{ backgroundColor: '#0a2540', padding: '20px', textAlign: 'center' }} className="text-white">
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-lg-5 d-inline-block" style={{ alignContent: 'center' }}>
                            <img src={logo} style={{ width: '220px', height: '60px' }} alt='logo' />
                            <p>Copyright &copy; 2024 SavingsApp. All rights reserved.</p>
                        </div>
                        <div className="col-lg-2 d-inline-block" style={{ fontSize: '14px', fontWeight: 'bolder' }}>
                            <ul style={{ listStyle: 'none' }}>
                                <li>LoremIpsum</li><br></br>
                                <li>LoremIpsum</li><br></br>
                                <li>LoremIpsum</li><br></br>
                                <li>LoremIpsum</li><br></br>
                            </ul>
                        </div>
                        <div className="col-lg-2 d-inline-block" style={{ fontSize: '14px', fontWeight: 'bolder' }}>
                            <ul style={{ listStyle: 'none' }}>
                                <li>LoremIpsum</li><br></br>
                                <li>LoremIpsum</li><br></br>
                                <li>LoremIpsum</li><br></br>
                            </ul>
                        </div>
                        <div className="col-lg-3 d-inline-block">
                            <ul style={{ listStyle: 'none' }}>
                                <li>savingsapp@test.com</li><br></br>
                                <li>+389 71 234 567</li><br></br>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </StyledFooter>
    );
};

export default CustomFooter;
