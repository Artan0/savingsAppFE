import React, { useState, useEffect } from "react";
import { Input, Row, Col, Button } from "antd";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";

import axios from "axios";
import { Goal } from "../types/Goal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoalCard from "../components/goal-card";
import AdminLayout from "../layouts/Admin-layout";

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-left: 0.6rem;
`;

const StyledLink = styled(Link)`
    text-decoration:none
`

const Goals: React.FC = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const pageSize = 10;
    const navigate = useNavigate();
    const location = useLocation();

    const fetchGoals = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            const response = await axios.get("http://localhost:8081/api/goals", {
                params: {
                    page: currentPage - 1,
                    pageSize,
                    search,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            setGoals(data.goals);
            setTotalPages(data.totalPages);

            const queryParams = new URLSearchParams(location.search);
            queryParams.set('search', search);
            queryParams.set('page', currentPage.toString());
            navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
        } catch (error) {
            console.error("Error fetching goals:", error);
            setTotalPages(1);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageParam = queryParams.get('page');
        const searchParam = queryParams.get('search');

        setCurrentPage(pageParam ? parseInt(pageParam, 10) : 1);
        setSearch(searchParam || '');
    }, [location.search]);

    useEffect(() => {
        fetchGoals();
    }, [currentPage, search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <AdminLayout>
            <SearchContainer>
                <Input.Search
                    size="large"
                    placeholder="Search goals"
                    style={{ width: "40%" }}
                    value={search}
                    onChange={handleSearchChange}
                    onSearch={fetchGoals}
                />
                <div>
                    <StyledLink to={'/goals/add'}>
                        <Button size="large" type="primary">
                            Add Goal
                        </Button>
                    </StyledLink>
                </div>
            </SearchContainer>
            <Row gutter={[16, 16]}>
                {goals && goals.length > 0 && goals.map((goal: Goal, index: number) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <GoalCard
                            id={goal.id}
                            title={goal.title}
                            description={goal.description}
                            currentAmount={goal.currentAmount}
                            targetAmount={goal.targetAmount}
                            targetDate={goal.targetDate}
                            isOverdue={goal.overdued}
                            isCompleted={goal.completed}
                        />
                    </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-center mt-5">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                />
            </div>
        </AdminLayout>
    );
};

export default Goals;
