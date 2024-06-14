import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message, Card, Typography, DatePicker } from 'antd';
import AdminLayout from '../layouts/admin-layout';
import axios from 'axios';
import moment from 'moment';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.get('/user-info', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(response.data);
        } catch (error) {
            message.error('Failed to fetch user information');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleEditProfile = () => {
        setEditModalVisible(true);
        form.setFieldsValue({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            dateOfBirth: userData.dateOfBirth ? moment(userData.dateOfBirth, 'YYYY-MM-DD') : null,
            phoneNumber: userData.phoneNumber
        });
    };

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const values = await form.validateFields();
            await axios.put(`/update-profile/${userData.id}`, {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null,
                phoneNumber: values.phoneNumber
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success('Profile updated successfully');
            setEditModalVisible(false);
            fetchUserData();
        } catch (error: any) {
            if (error.response) {
                const { status } = error.response;
                if (status === 401) {
                    message.error('Unauthorized. Please log in again.');
                } else if (status === 404) {
                    message.error('User not found. Please refresh the page.');
                } else {
                    message.error('Failed to update profile');
                }
            } else {
                message.error('Failed to update profile');
            }
        }
    };

    const handleCancelEdit = () => {
        setEditModalVisible(false);
    };

    return (
        <AdminLayout>
            {userData && (
                <Card title={<Title level={2}>Profile</Title>} bordered={false}>
                    <Card.Meta
                        avatar={<img src={"https://via.placeholder.com/150"} alt="Avatar" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />}
                        title={<Text strong>{`${userData.firstName} ${userData.lastName}`}</Text>}
                        description={
                            <div className='d-flex flex-column'>
                                <Text>
                                    Email: {userData.email}
                                </Text>
                                <Text>
                                    Date Of Birth: {userData.dateOfBirth ? moment(userData.dateOfBirth).format('YYYY-MM-DD') : 'N/A'}
                                </Text>
                                <Text>
                                    Phone Number: {userData.phoneNumber}
                                </Text>
                            </div>
                        }
                    />
                    <Button type="primary" style={{ marginTop: '20px' }} onClick={handleEditProfile}>
                        Edit Profile
                    </Button>
                    <Modal
                        title="Edit Profile"
                        visible={editModalVisible}
                        onOk={handleSaveProfile}
                        onCancel={handleCancelEdit}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[{ required: true, message: 'Please enter your first name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={[{ required: true, message: 'Please enter your last name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Invalid email format' }
                                ]}
                            >
                                <Input variant="filled" disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="dateOfBirth"
                                label="Date of Birth"
                                rules={[{ required: true, message: 'Please enter your date of birth' }]}
                            >
                                <DatePicker format='YYYY-MM-DD' />
                            </Form.Item>
                            <Form.Item
                                name="phoneNumber"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Card>
            )}
        </AdminLayout>
    );
};

export default Profile;
