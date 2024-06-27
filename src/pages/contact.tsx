import React, { Component } from "react";
import CustomLayout from "../layouts/layout";
import mailPic from '../assets/images/send-mail.jpg';
import {Form, Input } from "antd";

const { TextArea } = Input;

class Contact extends Component {
    render() {
        return (
            <>
                <CustomLayout>
                    <div className="container mt-5 mb-5" >
                        <div className="row d-flex justify-content-between">
                            <div className="col-6 d-flex flex-column my-auto">
                                <h3>Feel free to reach out to us for any inquiries or assistance. We're here to help you with any questions or concerns you may have.</h3><br></br><br></br>
                                {/* <p className="input_label" style={{ fontSize: '18px' }}>Your email adress</p> */}
                                {/* <input name="email" type="email" /><br /> */}
                                <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input the title!' }]}
                            >
                                <Input size="large" placeholder="Your email adress"/>
                            </Form.Item>
                                {/* <p className="input_label" style={{ fontSize: '18px' }}>Your text</p> */}
                                {/* <textarea placeholder="Your text" name="mail-content" style={{ height: '100px', borderColor:'lightgray', borderRadius:'10px' }} /><br /><br /> */}
                                <TextArea rows={4} size="large" placeholder="Your text" maxLength={6} /><br /><br />
                                <button type="submit" style={{ backgroundColor: '#0a2540',borderRadius:'15px', color: 'white', fontWeight: 'bolder', width: '250px', height: '45px', border: 'none' }}>Send!</button>
                            </div>
                            <div className="col-6">
                                <img src={mailPic} style={{ width: '700px', height: '600px' }} alt="contactus" />
                            </div>
                        </div>
                    </div>
                </CustomLayout>
            </>
        )
    }
}

export default Contact;