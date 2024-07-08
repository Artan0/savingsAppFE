import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Button, message } from 'antd';
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import AdminLayout from "../layouts/Admin-layout";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';

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

const StyledTable = styled(Table)`
    .income-row {
        background-color: #d9f7be; /* green */
    }
    .expense-row {
        background-color: #ffa39e; /* red */
    }
    .savings-row {
        background-color: #bae7ff; /* blue */
    }
`;

const Dashboard: React.FC = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalItems, setTotalItems] = useState(0);
    const [balanceHistory, setBalanceHistory] = useState<any[]>([]);
    const [transactionSummary, setTransactionSummary] = useState<Map<string, number>>(new Map());

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

    const fetchBalanceHistory = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            const response = await axios.get('/wallet/balanceHistory', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const formattedHistory = response.data.map((item: any) => ({
                date: formatDateFromArray(item.date),
                budget: item.budget,
            }));
            setBalanceHistory(formattedHistory);
        } catch (error) {
            message.error('Failed to fetch balance history');
        }
    };

    const fetchTransactionSummary = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            const response = await axios.get('/transactions/transactionSummary', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const summary = new Map<string, number>(Object.entries(response.data));
            setTransactionSummary(summary);
        } catch (error: any) {
            console.error('Error fetching transaction summary:', error);
            if (error.response) {
                console.error('Server Response:', error.response.data);
            }
            message.error('Failed to fetch transaction summary');
        }
    };


    const formatDateFromArray = (dateArray: number[]) => {
        const [year, month, day] = dateArray;
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
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
        fetchBalanceHistory();
        fetchTransactionSummary();
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
            render: (text: string) => moment(text).format('YYYY-MM-DD'),
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

    const getRowClassName = (record: any) => {
        if (record.type === 'INCOME') return 'income-row';
        if (record.type === 'EXPENSE') return 'expense-row';
        if (record.type === 'SAVINGS') return 'savings-row';
        return '';
    };

    const pieChartColors: { [key in any]: string } = {
        INCOME: '#d9f7be',
        EXPENSE: '#ffa39e',
        SAVINGS: '#bae7ff',
    };

    const isTransactionType = (type: string): type is any => {
        return ['INCOME', 'EXPENSE', 'SAVINGS'].includes(type);
    };

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
                                xAxis={[{
                                    data: balanceHistory.map(item => item.date),
                                    scaleType: 'point'
                                }]}
                                series={[
                                    {
                                        data: balanceHistory.map(item => item.budget),
                                        label: "Balance History",
                                    },
                                ]}
                                width={500}
                                height={300}
                                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                            />
                        </ChartContainer>
                    </Card>
                </ResponsiveCol>
                <ResponsiveCol xs={24} lg={12}>
                    <Card title="Total Transactions">
                        <ChartContainer>
                            <PieChart
                                series={[
                                    {
                                        data: Array.from(transactionSummary.entries()).map(([type, amount]) => ({
                                            id: type,
                                            value: amount,
                                            label: type,
                                            color: pieChartColors[type],
                                        })),
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </ChartContainer>
                    </Card>
                </ResponsiveCol>
                <Col xs={24} lg={24}>
                    <Card title="Transactions Table">
                        <StyledTable
                            columns={columns}
                            dataSource={transactions}
                            rowKey="id"
                            pagination={{ current: currentPage, pageSize, total: totalItems }}
                            loading={loading}
                            onChange={handleTableChange}
                            rowClassName={getRowClassName}
                        />
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default Dashboard;
