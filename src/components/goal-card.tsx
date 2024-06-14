import React from "react";
import { Card, Progress } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const { Meta } = Card;

const StyledCard = styled(Card)`
  width: 100%; 
  margin: 10px;
  padding: 5px;
  border-radius: 0;
  position: relative;
`;

const ProgressContainer = styled.div`
  margin-top: 10px;
`;
const StyledLink = styled(Link)`
  text-decoration:none;
`

interface GoalCardProps {
  id?: number;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
}



const GoalCard: React.FC<GoalCardProps> = ({ id, title, description, currentAmount, targetAmount, targetDate }) => {
  const progress = ((currentAmount / targetAmount) * 100).toFixed(2);
  return (
    <StyledCard hoverable >
      <StyledLink to={`/goal/${id}`}> <Meta title={title} description={description} /></StyledLink>
      <ProgressContainer>
        <Progress percent={parseFloat(progress)} />
        <div>{`$${currentAmount} raised of $${targetAmount}`}</div>
        <div>{`Target Date: ${targetDate}`}</div>
      </ProgressContainer>
    </StyledCard>
  );
};

export default GoalCard;
