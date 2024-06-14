import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/admin-layout';
import { Button, Card, Descriptions, message } from 'antd';
import axios from 'axios';
import { Goal } from '../types/Goal';

const GoalDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [goal, setGoal] = useState<Goal | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const response = await axios.get(`http://localhost:8081/api/goal/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setGoal(response.data);
            } catch (error) {
                message.error('Failed to fetch goal details.');
            }
        };

        fetchGoal();
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            await axios.delete(`http://localhost:8081/api/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success('Goal deleted successfully.');
            navigate('/goals');
        } catch (error) {
            message.error('Failed to delete goal.');
        }
    };

    const handleEdit = () => {
        navigate(`/goal/edit/${id}`);
    };

    if (!goal) {
        return <AdminLayout>Loading...</AdminLayout>;
    }

    return (
        <AdminLayout>
            <Card title="Goal Details">
                <Descriptions bordered>
                    <Descriptions.Item label="Title">{goal.title}</Descriptions.Item>
                    <Descriptions.Item label="Description">{goal.description}</Descriptions.Item>
                    <Descriptions.Item label="Current Amount">{goal.currentAmount}</Descriptions.Item>
                    <Descriptions.Item label="Target Amount">{goal.targetAmount}</Descriptions.Item>
                    <Descriptions.Item label="Target Date">{goal.targetDate}</Descriptions.Item>
                </Descriptions>
                <div style={{ marginTop: '20px' }}>
                    <Button type="primary" onClick={handleEdit} style={{ marginRight: '10px' }}>
                        Edit
                    </Button>
                    <Button type="primary" danger onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </Card>
        </AdminLayout>
    );
};

export default GoalDetails;
