import React from 'react';
import { Table, Row, Col, Card } from 'antd';
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import AdminLayout from "../layouts/Admin-layout";
import styled from 'styled-components';

// Sample data for the table
const tableData = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
    { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
];

// Table columns
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

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
                    <Card title="Data Table">
                        <Table columns={columns} dataSource={tableData} />
                    </Card>
                </Col>
            </Row>

        </AdminLayout>
    );
};

export default Dashboard;
