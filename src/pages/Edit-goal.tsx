import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputNumber, DatePicker, message, Select } from 'antd';
import AdminLayout from '../layouts/Admin-Layout';
import axios from 'axios';
import { Goal } from '../types/Goal';
import dayjs from 'dayjs';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from "../context/User-context";

const { TextArea } = Input;
const { Option } = Select;

const Container = styled.div`
  margin: 50px auto;
  max-width: 800px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

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
                    savingsAmount: goalData.savingsAmount,
                    savingsPeriod: goalData.savingsPeriod,
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
            await axios.post(
                `/api/editGoal`,
                {
                    ...values,
                    goalId: id,
                    targetDate: values.targetDate.format('YYYY-MM-DD'),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            message.success('Goal updated successfully');
            navigate(`/goals`);
        } catch (error) {
            message.error('Failed to update goal');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const { user } = useUser();

    return (
        <AdminLayout>
            <Container>
                <h2>Edit Goal</h2>
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
                    <Form.Item name="description" label="Description">
                        <TextArea rows={4} />
                    </Form.Item>
                    <div className="container d-flex justify-content-between">
            <Form.Item
              label="Transfer from wallet"
              name="currentAmt"
              rules={[{ required: true, message: 'Please input the current amount!' }]}
              style={{ marginLeft: '-1%' }}
            >
              <InputNumber
                style={{ width: '100%' }}
                value={goal?.currentAmount}
                onChange={(value) => handleSave(value)}// , "currentAmt", 
              />
            </Form.Item>
            <div className="" style={{ marginRight: '15%' }}>
              <h3>
                Current wallet amount:
              </h3>
              <h4>${user?.budget},00</h4>
            </div>

          </div>
                    <Form.Item
                        name="targetAmount"
                        label="Target Amount"
                        rules={[{ required: true, message: 'Please input the target amount!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    
                    <div className="d-flex justify-content-between align-items-center">
      <div>
        <Form.Item
          label="Periodical Savings Amount*"
          name="savingsAmount"
          rules={[{ required: true, message: 'Please enter Savings Amount!' }]}
          style={{ width: 350}}
        >
          <Input
            value={goal?.savingsAmount}
            onChange={(e) => handleSave(e.target.value)} // "savingsAmount", 
          />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          label="Select Option"
          name="selectOption"
          rules={[{ required: true, message: 'Please select an option!' }]}
        >
          <Select
            onChange={(value) => handleSave(value)} //"selectOption", 
            style={{ width: 350}}
            defaultValue={goal?.savingsPeriod}
          >
            <Option value="minute">Minute</Option>
            <Option value="daily">Daily</Option>
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
          </Select>
        </Form.Item>
      </div>
    </div>
                    <Form.Item
                        name="targetDate"
                        label="Target Date"
                        rules={[{ required: true, message: 'Please select the target date!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Container>
        </AdminLayout>
    );
};

export default EditGoal;
