import React, { Component } from "react";
import CustomLayout from "../layouts/layout";
import { Col, Row } from "antd";
import enespp from '../assets/images/pp.jpg';

class AboutUs extends Component {

    render() {
        return (
            <>
                <CustomLayout>
                    <Row className="pt-5">
                        <Col className="d-block justify-content-center w-100">

                            <div className="text-center w-70">
                                <h1>Our goal is to ease processes.</h1>
                            </div><br></br>
                            <div className="text-center mx-auto w-50">
                                <h5>Our team of dedicated students is passionate about financial empowerment.
                                    We are developing a user-friendly money-saving app to help individuals
                                    effectively manage their finances. With a focus on simplicity and practicality,
                                    our app aims to make saving money easy and accessible to everyone.
                                </h5>
                            </div>
                        </Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row d-flex justify-content-around" mb-4>
                        <div className="col-5" style={{ border: 'solid', borderWidth: '1px' }}>
                            <div className="container d-flex flex-column">
                                <div className="container d-flex justify-content-between border-bottom" style={{ height: '150px' }}>
                                    <h3 className="mt-5">Artan Bajram - <span style={{ fontSize: '24px' }}>Student at FCSE</span></h3>
                                    <div className="container rounded" style={{ width: '100px', height: '100px' }}><img className="rounded mt-2" src={enespp} style={{ width: '130px', height: '130px' }} alt="aboutus" /></div>
                                </div>
                                <div className="container d-flex justify-content-between">
                                    <p style={{ width: '60%' }}>Lorem ipsum dolor sit amet. Ut voluptatem ullam eos porro laudantium ex
                                        pariatur nemo. Eum dolorum voluptas vel illo excepturi aut laudantium accusamus.
                                        Aut voluptas voluptatibus nam sint doloremque eos velit provident vel dolorem laborum.
                                        In iusto assumenda aut velit sequi quo rerum corrupti. Et quisquam minus nam saepe
                                        distinctio in nihil inventore sit nostrum velit id ducimus quia ea reprehenderit nobis!
                                        Eos fugit officiis non possimus nesciunt in nulla repudiandae ut sint totam aut neque dicta
                                        qui distinctio aliquam hic nihil blanditiis!</p>
                                    <ul className="mt-5" style={{ marginRight: '7%' }}>
                                        <li>Link of social media</li>
                                        <li>Link of social media</li>
                                        <li>Link of social media</li>
                                        <li>Link of social media</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-5" style={{ border: 'solid', borderWidth: '1px' }}>
                            <div className="container d-flex flex-column">
                                <div className="container d-flex justify-content-between border-bottom" style={{ height: '150px' }}>
                                    <h3 className="mt-5">Enes Sejfovski - <span style={{ fontSize: '24px' }}>Student at FCSE</span></h3>
                                    <div className="container rounded" style={{ width: '100px', height: '100px' }}><img className="rounded mt-2" src={enespp} style={{ width: '130px', height: '130px' }} alt="aboutus" /></div>
                                </div>
                                <div className="container d-flex justify-content-between">
                                    <p style={{ width: '60%' }}>Lorem ipsum dolor sit amet. Ut voluptatem ullam eos porro laudantium ex
                                        pariatur nemo. Eum dolorum voluptas vel illo excepturi aut laudantium accusamus.
                                        Aut voluptas voluptatibus nam sint doloremque eos velit provident vel dolorem laborum.
                                        In iusto assumenda aut velit sequi quo rerum corrupti. Et quisquam minus nam saepe
                                        distinctio in nihil inventore sit nostrum velit id ducimus quia ea reprehenderit nobis!
                                        Eos fugit officiis non possimus nesciunt in nulla repudiandae ut sint totam aut neque dicta
                                        qui distinctio aliquam hic nihil blanditiis!</p>
                                    <ul className="mt-5" style={{ marginRight: '7%' }}>
                                        <li>Link of social media</li>
                                        <li>Link of social media</li>
                                        <li>Link of social media</li>
                                        <li>Link of social media</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                </CustomLayout>
            </>
        )
    }
}

export default AboutUs;