import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message, Card, Typography, DatePicker } from 'antd';
import AdminLayout from '../layouts/admin-layout';
import axios from 'axios';
import moment from 'moment';
import { useUser } from '../context/User-context';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
    const { user, fetchUserInfo } = useUser();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleEditProfile = () => {
        setEditModalVisible(true);
        form.setFieldsValue({
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            dateOfBirth: user?.dateOfBirth ? moment(user.dateOfBirth, 'YYYY-MM-DD') : null,
            phoneNumber: user?.phoneNumber,
            budget: user?.budget
        });
    };

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const values = await form.validateFields();
            await axios.put(`/update-profile/${user?.id}`, {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null,
                phoneNumber: values.phoneNumber,
                budget: values.budget
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success('Profile updated successfully');
            setEditModalVisible(false);
            fetchUserInfo(); // Fetch updated user info after save
        } catch (error: any) {
            console.error('Failed to update profile:', error);
            message.error('Failed to update profile');
        }
    };

    const handleCancelEdit = () => {
        setEditModalVisible(false);
    };

    return (
        <AdminLayout>
            {user && (
                <Card title={<Title level={2}>Profile</Title>} bordered={false}>
                    <Card.Meta
                        avatar={<img src={"https://via.placeholder.com/150"} alt="Avatar" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />}
                        title={<Text strong>{`${user.firstName} ${user.lastName}`}</Text>}
                        description={
                            <div className='d-flex flex-column'>
                                <Text>
                                    Email: {user.email}
                                </Text>
                                <Text>
                                    Date Of Birth: {user.dateOfBirth ? moment(user.dateOfBirth).format('YYYY-MM-DD') : 'N/A'}
                                </Text>
                                <Text>
                                    Phone Number: {user.phoneNumber}
                                </Text>
                                <Text>
                                    Wallet balance: {user.budget}
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
                            <Form.Item
                                name="budget"
                                label="Wallet Balance"
                                rules={[{ required: true, message: 'Please enter your budget' }]}
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
