import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message, Card, Typography, DatePicker, Row, Col, Upload, Avatar } from 'antd';
import AdminLayout from '../layouts/Admin-layout';
import axios from 'axios';
import moment from 'moment';
import { useUser } from '../context/User-context';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
    const { user, fetchUserInfo } = useUser();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>("https://via.placeholder.com/150");

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
        fetchUserInfo()
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
                budget: values.budget,
                avatar: avatarUrl
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success('Profile updated successfully');
            setEditModalVisible(false);
            fetchUserInfo();
        } catch (error: any) {
            console.error('Failed to update profile:', error);
            message.error('Failed to update profile');
        }
    };

    const handleCancelEdit = () => {
        setEditModalVisible(false);
    };

    const handleAvatarChange = ({ file }: any) => {
        if (file.status === 'done') {
            setAvatarUrl(URL.createObjectURL(file.originFileObj));
        }
    };

    return (
        <AdminLayout>
            {user && (
                <Card title={<Title style={{ paddingTop: "10px" }} level={2}>Profile</Title>} bordered={false}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={8} md={6} lg={4}>
                            <Avatar src={avatarUrl} size={120} />
                        </Col>
                        <Col xs={24} sm={16} md={18} lg={20}>
                            <Title style={{ margin: '5px', fontSize: '18px' }} level={3}>{`${user.firstName} ${user.lastName}`}</Title>
                            <Text style={{ margin: '5px', fontSize: '15px' }}>Email: {user.email}</Text>
                            <br />
                            <Text style={{ margin: '5px', fontSize: '15px' }}>Date Of Birth: {user.dateOfBirth ? moment(user.dateOfBirth).format('YYYY-MM-DD') : 'N/A'}</Text>
                            <br />
                            <Text style={{ margin: '5px', fontSize: '15px' }}>Phone Number: {user.phoneNumber}</Text>
                            <br />
                            <Text style={{ margin: '5px', fontSize: '15px' }}>Wallet Balance: {user.budget}</Text>
                            <br />
                            <Button type="primary" style={{ marginTop: '20px' }} onClick={handleEditProfile}>
                                Edit Profile
                            </Button>
                        </Col>
                    </Row>
                    <Modal
                        title="Edit Profile"
                        visible={editModalVisible}
                        onOk={handleSaveProfile}
                        onCancel={handleCancelEdit}
                        okText="Save"
                        cancelText="Cancel"
                    >
                        <Form form={form} layout="vertical">
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
                                <Input disabled={true} />
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
