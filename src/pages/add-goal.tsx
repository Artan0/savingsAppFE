import React, { useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber, message } from "antd";
import CustomLayout from "../layouts/layout";
import { Goal } from "../types/Goal";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

const AddGoal: React.FC = () => {
  const [goal, setGoal] = useState<Goal>({
    title: "",
    description: "",
    currentAmount: 0,
    targetAmount: 0,
    targetDate: "",
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
        targetDate: goal.targetDate// Format date correctly
      };
      const token = localStorage.getItem('auth_token');
      console.log("Token:", token); // Debugging log
      console.log("Payload:", body); // Debugging log
      await axios.post("http://localhost:8081/api/newGoal", body, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      message.success("Goal added successfully");
    } catch (error) {
      console.error("Error adding goal:", error); // Debugging log
      message.error("Error adding goal");
    }
  };

  return (
    <CustomLayout>
      <div style={{ marginTop: '50px', marginBottom: '100px' }}>
        <h2 style={{ marginBottom: '75px' }}>
          Set Your Next Achievement in Motion: Add Your Goal Below!
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
          <Form.Item
            label="Current amount*"
            name="currentAmt"
            rules={[{ required: true, message: 'Please input the current amount!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              value={goal.currentAmount}
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
              value={goal.targetAmount}
              onChange={(value) => handleChange("targetAmt", value)}
            />
          </Form.Item>
          <Form.Item
            label="Finish date*"
            name="targetDate"
            rules={[{ required: true, message: 'Please select the finish date!' }]}
          >
            <DatePicker
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
    </CustomLayout>
  );
};

export default AddGoal;
