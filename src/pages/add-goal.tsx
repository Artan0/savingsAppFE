import React, { useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber, message, Select } from "antd";
import CustomLayout from "../layouts/Layout";
import { Goal } from "../types/Goal";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useUser } from "../context/User-context";
import styled from 'styled-components';
import AdminLayout from "../layouts/Admin-layout";

const { Option } = Select;

const Container = styled.div`
  margin: 10px auto;
  max-width: 800px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


const AddGoal: React.FC = () => {

  const { user } = useUser();

  const [goal, setGoal] = useState<Goal>({
    title: "",
    description: "",
    currentAmount: 0,
    targetAmount: 0,
    targetDate: "",
    savingsAmount: 0,
    savingsPeriod: ""
  });

  const handleChange = (name: string, value: any) => {
    setGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const body = {
        ...goal,
        targetDate: goal.targetDate
      };
      const token = localStorage.getItem('auth_token');
      console.log("Token:", token);
      console.log("Payload:", body);
      await axios.post("http://localhost:8081/api/newGoal", body, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      message.success("Goal added successfully");
      window.location.href = 'http://localhost:3000/goals';
    } catch (error) {
      console.error("Error adding goal:", error);
      message.error("Error adding goal");
    }
  };


  return (
    <AdminLayout>
      <Container>


        <div style={{ marginTop: '20px', marginBottom: '100px' }}>
          <h2 style={{ marginBottom: '50px' }}>
            Add Your Goal!
          </h2>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              currentAmt: 0,
              targetAmt: 0,
              targetDate: ''
            }}
            style={{ maxWidth: '850px', margin: '0 auto' }}
          >
            <Form.Item
              label="Title*"
              name="title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input
                value={goal.title}
                size="large"
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
            >
              <TextArea rows={4}
                value={goal.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <h5> Your balance: ${user?.budget}</h5>
            </div>
            <Form.Item
              label="Transfer from wallet"
              name="currentAmt"
              rules={[{ required: true, message: 'Please input the current amount!' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                value={goal.currentAmount}
                size="large"
                onChange={(value) => handleChange("currentAmt", value)}
              />
            </Form.Item>
            <Form.Item
              label="Target amount*"
              name="targetAmt"
              rules={[{ required: true, message: 'Please input the target amount!' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                size="large"
                value={goal.targetAmount}
                onChange={(value) => handleChange("targetAmt", value)}
              />
            </Form.Item>


            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Form.Item
                  label="Periodical Savings Amount*"
                  name="savingsAmount"
                  rules={[{ required: true, message: 'Please enter Savings Amount!' }]}
                  style={{ width: 350 }}
                >
                  <Input
                    value={goal.savingsAmount}
                    size="large"
                    onChange={(e) => handleChange("savingsAmount", e.target.value)}
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
                    onChange={(value) => handleChange("selectOption", value)}
                    style={{ width: 350 }}
                    size="large"
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
              label="Finish date*"
              name="targetDate"
              rules={[{ required: true, message: 'Please select the finish date!' }]}
            >
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                value={goal.targetDate ? (goal.targetDate) : null}
                onChange={(date) => handleChange("targetDate", date ? date.format('YYYY-MM-DD') : '')}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Add goal
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Container>
    </AdminLayout>
  );
};

export default AddGoal;