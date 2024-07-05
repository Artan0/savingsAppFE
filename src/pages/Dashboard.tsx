import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Button, message, Pagination } from 'antd';
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import AdminLayout from "../layouts/Admin-layout";
import styled from 'styled-components';
import axios from 'axios';

const ChartContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ResponsiveCol = styled(Col)`
    @media (max-width: 1090px) {
        width: 100% !important;
    }
`;

const Dashboard: React.FC = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const fetchTransactions = async (page: number, pageSize: number) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("auth_token");

            const response = await axios.get('/transactions/transactions', {
                params: { page: page - 1, pageSize }, headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTransactions(response.data.transactions);
            setTotalItems(response.data.totalItems);
        } catch (error) {
            message.error('Failed to fetch transactions');
        }
        setLoading(false);
    };

    const deleteTransaction = async (transactionId: number) => {
        try {
            const token = localStorage.getItem("auth_token");

            await axios.delete(`/transactions/delete/${transactionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success('Transaction deleted successfully');
            fetchTransactions(currentPage, pageSize);
        } catch (error) {
            message.error('Failed to delete transaction');
        }
    };

    useEffect(() => {
        fetchTransactions(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Button type="primary" danger onClick={() => deleteTransaction(record.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <AdminLayout>
            <h2>Dashboard</h2>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={24}>
                    <Card title="Bar Chart">
                        <ChartContainer>
                            <BarChart
                                series={[
                                    { data: [35, 44, 24, 34] },
                                    { data: [51, 6, 49, 30] },
                                    { data: [15, 25, 30, 50] },
                                    { data: [60, 50, 15, 25] },
                                ]}
                                height={290}
                                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                            />
                        </ChartContainer>
                    </Card>
                </Col>
                <ResponsiveCol xs={24} lg={12}>
                    <Card title="Line Chart">
                        <ChartContainer>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                series={[
                                    {
                                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        </ChartContainer>
                    </Card>
                </ResponsiveCol>
                <ResponsiveCol xs={24} lg={12}>
                    <Card title="Pie Chart">
                        <ChartContainer>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'series A' },
                                            { id: 1, value: 15, label: 'series B' },
                                            { id: 2, value: 20, label: 'series C' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </ChartContainer>
                    </Card>
                </ResponsiveCol>
                <Col xs={24} lg={24}>
                    <Card title="My Transactions">
                        <Table
                            columns={columns}
                            dataSource={transactions}
                            loading={loading}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: totalItems,
                                onChange: handleTableChange
                            }}
                            rowKey="id"
                        />
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default Dashboard;
