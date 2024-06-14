import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputNumber, DatePicker, message } from 'antd';
import AdminLayout from '../layouts/admin-layout';
import axios from 'axios';
import { Goal } from '../types/Goal';
import dayjs from 'dayjs';

const EditGoal: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [goal, setGoal] = useState<Goal | null>(null);

    useEffect(() => {
        const fetchGoalData = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const response = await axios.get(`/api/goal/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const goalData = response.data;
                form.setFieldsValue({
                    title: goalData.title,
                    description: goalData.description,
                    currentAmount: goalData.currentAmount,
                    targetAmount: goalData.targetAmount,
                    targetDate: dayjs(goalData.targetDate),
                });
                setGoal(goalData);
            } catch (error) {
                message.error('Failed to fetch goal details');
            }
        };

        fetchGoalData();
    }, [id, form]);

    const handleSave = async (values: any) => {
        try {
            const token = localStorage.getItem('auth_token');
            await axios.post(`/api/editGoal`, {
                ...values,
                goalId: id,
                targetDate: values.targetDate.format('YYYY-MM-DD'),
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Goal updated successfully');
            navigate(`/goal/${id}`);
        } catch (error) {
            message.error('Failed to update goal');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <AdminLayout>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="currentAmount"
                    label="Current Amount"
                    rules={[{ required: true, message: 'Please input the current amount!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    name="targetAmount"
                    label="Target Amount"
                    rules={[{ required: true, message: 'Please input the target amount!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    name="targetDate"
                    label="Target Date"
                    rules={[{ required: true, message: 'Please select the target date!' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Button type="primary" htmlType="submit">Save</Button>
            </Form>
        </AdminLayout>
    );
};

export default EditGoal;
