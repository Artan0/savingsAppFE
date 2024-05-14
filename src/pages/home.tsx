import React, { Component } from "react";
import CustomLayout from "../components/layout";
import { Card, Col, Row, Button } from "antd";
import styled from "styled-components";
import cardImage from '../assets/images/Card 2.png'
import savingsImage from '../assets/images/savings.png'
import saveMoneyImage from '../assets/images/save-money.png'
import secureImage from '../assets/images/secure.png'
import coinsImage from '../assets/images/coins.png'

const StyledDivCard = styled.div`
    border: 1px solid #98989833;
    border-radius: 8px;
    padding: 10px 15px 10px 15px;
    margin: 8px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
    padding: 15px;
`;

const Container = styled.div`
    background-color: #f0f4f9;
`
const StyledContainer = styled.div`
    background-image: linear-gradient(to bottom, #f0f4f9, #ffffff);
`
const StyledH1 = styled.h1`
    font-size:65px;
    font-weight: 500;
`
const StyledText = styled.p`
    font-size:22px
`
const StyledCard = styled(Card)`
    width:80%;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
`
const Description = styled.p`
    font-size:18px;
    font-weight:300
`
class Home extends Component {
    render() {
        return (
            <CustomLayout>
                <Container>
                    <div className="container py-5">
                        <Row>
                            <Col span={12} className="d-flex justify-content-center align-items-center">
                                <Col span={18}>

                                    <StyledH1>
                                        Introducing <br /> modern finance <br />for the future
                                    </StyledH1>

                                    <StyledText>
                                        Invoicing, bill pay, cash flow control for small and big businesses.
                                    </StyledText>

                                    <div className="d-flex justify-content-between mt-3" style={{ width: '45%' }}>
                                        <Button type="primary" size={'large'}>
                                            Start Now
                                        </Button>
                                        <Button type="primary" ghost size={'large'}>
                                            Contact Us
                                        </Button>
                                    </div>

                                </Col>
                            </Col>
                            <Col span={12}>
                                <StyledCard>
                                    <>
                                        <Card>
                                            <div className="d-flex">
                                                <div>
                                                    <img src={cardImage} alt="card2" style={{ width: '125px', height: '115px' }} />
                                                </div>
                                                <div className="mx-3 mt-1">
                                                    <StyledText>
                                                        Wallet Balance: <br /> <b className="mt-2"> $34,956.50</b>
                                                    </StyledText>
                                                </div>
                                            </div>
                                        </Card>
                                    </>
                                    <>
                                        <h4 className="mt-3">Transaction History</h4>
                                        <StyledDivCard>
                                            <div className="d-flex justify-content-between">
                                                <p>Lorem Ipsum</p>
                                                <p>Jan 23, 2024</p>
                                            </div>
                                            <div><b>$453.50</b></div>
                                        </StyledDivCard>
                                        <StyledDivCard>
                                            <div className="d-flex justify-content-between">
                                                <p>Lorem Ipsum</p>
                                                <p>Jan 23, 2024</p>
                                            </div>
                                            <div><b>$453.50</b></div>
                                        </StyledDivCard>
                                        <StyledDivCard>
                                            <div className="d-flex justify-content-between">
                                                <p>Lorem Ipsum</p>
                                                <p>Jan 23, 2024</p>
                                            </div>
                                            <div><b>$453.50</b></div>
                                        </StyledDivCard>
                                    </>
                                </StyledCard>
                            </Col>
                        </Row>
                    </div>

                </Container>

                <StyledContainer>
                    <div className="container py-5">
                        <Row>
                            <Col className="text-start" span={14}>
                                <img src={savingsImage} alt="savings" style={{ width: '90%', height: 'auto' }} />
                            </Col>
                            <Col span={10} className="d-flex flex-column justify-content-center">
                                <div>
                                    <h1>
                                        Manage your finances <br /> faster and easier
                                    </h1>
                                    <Description>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                    </Description>

                                    <Button className="my-2" type="primary" size={'large'}>
                                        Register Now
                                    </Button>
                                    <Description>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                    </Description>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-5">
                            <Col className="d-flex justify-content-center w-100">
                                <div className="text-center w-50">
                                    <h1> Start Managing Your <br /> finances in more features</h1>
                                    <Description>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                    </Description>
                                </div>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-evenly py-5">
                            <Col>
                                <StyledDivCard>
                                    <img src={saveMoneyImage} alt="icon" style={{ width: '50px', height: 'auto' }} />
                                    <div>
                                        <StyledText>Lorem ipsum dolor sit amet</StyledText>
                                        <Description>Lorem ipsum dolor sit amet Lorem ipsum <br />ipsum dolor sit amet</Description>
                                    </div>
                                </StyledDivCard>
                            </Col>
                            <Col>
                                <StyledDivCard>
                                    <img src={coinsImage} alt="icon" style={{ width: '50px', height: 'auto' }} />
                                    <div>
                                        <StyledText>Lorem ipsum dolor sit amet</StyledText>
                                        <Description>Lorem ipsum dolor sit amet Lorem ipsum <br />ipsum dolor sit amet</Description>
                                    </div>
                                </StyledDivCard>
                            </Col>
                            <Col>
                                <StyledDivCard>
                                    <img src={secureImage} alt="icon" style={{ width: '50px', height: 'auto' }} />
                                    <div>
                                        <StyledText>Lorem ipsum dolor sit amet</StyledText>
                                        <Description>Lorem ipsum dolor sit amet Lorem ipsum <br />ipsum dolor sit amet</Description>
                                    </div>
                                </StyledDivCard>
                            </Col>
                        </Row>
                    </div>
                </StyledContainer>
            </CustomLayout>
        );
    }
}

export default Home;
