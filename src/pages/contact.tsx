import React, { Component } from "react";
import CustomLayout from "../layouts/Layout";
import mailPic from '../assets/images/send-mail.jpg';
import { Form, Input, Button, message } from "antd";
import axios from 'axios';

const { TextArea } = Input;

interface FormValues {
    email: string;
    message: string;
}

class Contact extends Component {
    formRef = React.createRef<any>();

    handleFormSubmit = async (values: FormValues) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.post('http://localhost:8081/send-email', {
                email: values.email,
                message: values.message,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            message.success("Your message has been sent succesfully.");
             window.location.href = 'http://localhost:3000/contact';
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };
    

    render() {
        return (
            <>
                <CustomLayout>
                    <div className="container mt-5 mb-5">
                        <div className="row d-flex justify-content-between">
                            <div className="col-6 d-flex flex-column my-auto">
                                <h3>Feel free to reach out to us for any inquiries or assistance. We're here to help you with any questions or concerns you may have.</h3><br /><br />
                                <Form
                                    ref={this.formRef}
                                    onFinish={this.handleFormSubmit}
                                >
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your email address!' }]}
                                    >
                                        <Input size="large" placeholder="Your email address" />
                                    </Form.Item>
                                    <Form.Item
                                        name="message"
                                        rules={[{ required: true, message: 'Please input your message!' }]}
                                    >
                                        <TextArea rows={4} size="large" placeholder="Your text" maxLength={500} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{ backgroundColor: '#0a2540', borderRadius: '15px', color: 'white', fontWeight: 'bolder', width: '250px', height: '45px', border: 'none' }}
                                        >
                                            Send!
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className="col-6">
                                <img src={mailPic} style={{ width: '700px', height: '600px' }} alt="contact us" />
                            </div>
                        </div>
                    </div>
                </CustomLayout>
            </>
        );
    }
}

export default Contact;
