// AddTransaction.tsx
import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, InputNumber, message } from 'antd';
import AdminLayout from '../layouts/Admin-layout';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #343a40;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const { Option } = Select;

const AddTransaction: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const token = localStorage.getItem('auth_token');
            const transactionData = {
                title: values.title,
                date: values.date.format('YYYY-MM-DD'),
                amount: values.amount,
                type: values.type,
            };
            await axios.post('/transactions/create', transactionData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            message.success('Transaction added successfully!');
            form.resetFields();
        } catch (error) {
            message.error('Failed to add transaction. Please try again.');
        }
    };

    return (
        <AdminLayout>
            <FormWrapper>
                <FormTitle>Add Transaction</FormTitle>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter the title' }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true, message: 'Please select the date' }]}
                    >
                        <DatePicker size="large" />
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[{ required: true, message: 'Please enter the amount' }]}
                    >
                        <InputNumber
                            size="large"
                            style={{ width: '100%' }}
                            formatter={(value) => `$ ${value}`}
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{ required: true, message: 'Please select the type' }]}
                    >
                        <Select size="large" placeholder="Select a type">
                            <Option value="INCOME">Income</Option>
                            <Option value="EXPENSE">Expense</Option>
                        </Select>
                    </Form.Item>
                    <StyledButton>
                        <Button type="primary" htmlType="submit">
                            Add Transaction
                        </Button>
                    </StyledButton>
                </Form>
            </FormWrapper>
        </AdminLayout>
    );
};

export default AddTransaction;
