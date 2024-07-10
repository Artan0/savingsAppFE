import React from "react";
import { Card, Progress } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from 'moment';

const { Meta } = Card;

const StyledCard = styled(Card)`
  width: 100%;
  height:210px; 
  margin: 10px;
  padding: 5px;
  border-radius: 0;
  position: relative;
`;

const ProgressContainer = styled.div`
  margin-top: 10px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

interface GoalCardProps {
  id?: number;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
  isOverdue?: boolean;
  isCompleted?: boolean;
}

const GoalCard: React.FC<GoalCardProps> = ({ id, title, description, currentAmount, targetAmount, targetDate, isOverdue, isCompleted }) => {
  const progress = ((currentAmount / targetAmount) * 100).toFixed(2);
  const formattedTargetDate = moment(targetDate).format('YYYY-MM-DD');

  return (
    <StyledCard hoverable>
      <StyledLink to={`/goals/${id}`}>
        <Meta title={title} description={description} />
      </StyledLink>
      <ProgressContainer>
        {isOverdue && (
          <h6 style={{ color: 'red' }}>Goal's target date overdued.</h6>
        )}
        <Progress
          percent={parseFloat(progress)}
          status={isOverdue ? "exception" : (isCompleted ? "success" : "active")}
        />
        <div>{`$${currentAmount} raised of $${targetAmount}`}</div>
        <div>{`Target Date: ${formattedTargetDate}`}</div>
      </ProgressContainer>
    </StyledCard>
  );
};

export default GoalCard;
