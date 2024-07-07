import React from "react";
import CustomLayout from "../layouts/Layout";
import { Col, Row } from "antd";
import enespp from '../assets/images/pp.jpg';
import { FacebookFilled, GithubFilled, LinkedinFilled, InstagramFilled } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const teamMembers = [
    {
        name: 'Artan Bajram',
        role: 'Student at FCSE',
        description: 'Lorem ipsum dolor sit amet. Ut voluptatem ullam eos porro laudantium ex pariatur nemo. Eum dolorum voluptas vel illo excepturi aut laudantium accusamus. Aut voluptas voluptatibus nam sint doloremque eos velit provident vel dolorem laborum. In iusto assumenda aut velit sequi quo rerum corrupti. Et quisquam minus nam saepe distinctio in nihil inventore sit nostrum velit id ducimus quia ea reprehenderit nobis! Eos fugit officiis non possimus nesciunt in nulla repudiandae ut sint totam aut neque dicta qui distinctio aliquam hic nihil blanditiis!',
        imgSrc: enespp,
        socialLinks: [
            { icon: <GithubFilled />, url: 'Link of social media' },
            { icon: <LinkedinFilled />, url: 'Link of social media' },
            { icon: <FacebookFilled />, url: 'Link of social media' },
            { icon: <InstagramFilled />, url: 'Link of social media' }
        ]
    },
    {
        name: 'Enes Sejfovski',
        role: 'Student at FCSE',
        description: 'Lorem ipsum dolor sit amet. Ut voluptatem ullam eos porro laudantium ex pariatur nemo. Eum dolorum voluptas vel illo excepturi aut laudantium accusamus. Aut voluptas voluptatibus nam sint doloremque eos velit provident vel dolorem laborum. In iusto assumenda aut velit sequi quo rerum corrupti. Et quisquam minus nam saepe distinctio in nihil inventore sit nostrum velit id ducimus quia ea reprehenderit nobis! Eos fugit officiis non possimus nesciunt in nulla repudiandae ut sint totam aut neque dicta qui distinctio aliquam hic nihil blanditiis!',
        imgSrc: enespp,
        socialLinks: [
            { icon: <GithubFilled />, url: 'Link of social media' },
            { icon: <LinkedinFilled />, url: 'Link of social media' },
            { icon: <FacebookFilled />, url: 'Link of social media' },
            { icon: <InstagramFilled />, url: 'Link of social media' }
        ]
    }
];

const AboutUs = () => {
    return (
        <CustomLayout>
            <Row className="pt-5">
                <Col span={24} className="text-center">
                    <h1>Our goal is to ease processes.</h1>
                </Col>
                <Col span={24} className="text-center mx-auto w-50">
                    <h5>Our team of dedicated students is passionate about financial empowerment. We are developing a user-friendly money-saving app to help individuals effectively manage their finances. With a focus on simplicity and practicality, our app aims to make saving money easy and accessible to everyone.</h5>
                </Col>
            </Row>
            <Row justify="center" className="mt-5">
                {teamMembers.map((member, index) => (
                    <Col className="m-3" xs={24} sm={24} md={11} lg={10} xl={8} key={index} style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <div className="p-3">
                            <div className="d-flex justify-content-between border-bottom mb-3" style={{ height: '150px' }}>
                                <h3 className="mt-3">{member.name} - <span style={{ fontSize: '18px' }}>{member.role}</span></h3>
                                <div className="rounded-circle overflow-hidden" style={{ width: '100px', height: '100px' }}>
                                    <img className="img-fluid" src={member.imgSrc} alt="aboutus" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p style={{ width: '60%' }}>{member.description}</p>
                                <ul className="list-unstyled">
                                    {member.socialLinks.map((link, idx) => (
                                        <li key={idx} className="mb-2">
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center">
                                                {link.icon}
                                                <span className="ml-2">{link.url}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </CustomLayout>
    );
};

export default AboutUs;
