import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/Admin-layout';
import { Button, Card, Descriptions, message } from 'antd';
import axios from 'axios';
import { Goal } from '../types/Goal';
import moment from 'moment';

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
        navigate(`/goals/${id}/edit`);
    };

    if (!goal) {
        return <AdminLayout>Loading...</AdminLayout>;
    }

    return (
        <AdminLayout>
            <Card title="Goal Details">
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Title">{goal.title}</Descriptions.Item>
                    <Descriptions.Item label="Description">{goal.description}</Descriptions.Item>
                </Descriptions>
                <Descriptions className='mt-3' bordered column={3}>
                    <Descriptions.Item label="Current Amount">{goal.currentAmount}</Descriptions.Item>
                    <Descriptions.Item label="Target Amount">{goal.targetAmount}</Descriptions.Item>
                    <Descriptions.Item label="Target Date">{moment(goal.targetDate).format('YYYY-MM-DD')}</Descriptions.Item>

                </Descriptions>
                <Descriptions className='mt-3' bordered column={2}>
                    <Descriptions.Item label="Savings Period">{goal.savingsPeriod}</Descriptions.Item>
                    <Descriptions.Item label="Savings Amount">{goal.savingsAmount}</Descriptions.Item>
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
