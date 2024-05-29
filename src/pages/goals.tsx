import React, { Component } from "react";
import { Input, Select, Row, Col, Button } from "antd";
import styled from "styled-components";
import AdminLayout from "../layouts/admin-layout";
import GoalCard from "../components/goal-card";

const { Option } = Select;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-left: 0.6rem;
`;

const goalsData = [
    {
        title: "Goal 1",
        description: "Description for Goal 1",
        currentAmount: 50,
        targetAmount: 100,
        targetDate: "2024-12-31",
    },
    {
        title: "Goal 2",
        description: "Description for Goal 2",
        currentAmount: 120,
        targetAmount: 200,
        targetDate: "2024-11-30",
    },
    {
        title: "Goal 2",
        description: "Description for Goal 2",
        currentAmount: 120,
        targetAmount: 200,
        targetDate: "2024-11-30",
    },
    {
        title: "Goal 2",
        description: "Description for Goal 2",
        currentAmount: 120,
        targetAmount: 200,
        targetDate: "2024-11-30",
    },
];

class Goals extends Component {
    render() {
        return (
            <AdminLayout>
                <SearchContainer>
                    <Input.Search size="large" placeholder="Search goals" style={{ width: '40%' }} />
                    <div >

                        <Select size="large" defaultValue="Sort by" className="mx-3">
                            <Option value="date">Date</Option>
                            <Option value="amount">Amount</Option>
                            <Option value="rating">Rating</Option>
                        </Select>

                        <Button size="large" type="primary">
                            Add Goal
                        </Button>
                    </div>
                </SearchContainer>
                <Row gutter={[16, 16]}>
                    {goalsData.map((goal, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={index}>
                            <GoalCard {...goal} />
                        </Col>
                    ))}
                </Row>
            </AdminLayout>
        );
    }
}

export default Goals;
