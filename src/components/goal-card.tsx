import React from "react";
import { Card, Rate, Progress } from "antd";
import styled from "styled-components";

const { Meta } = Card;

interface GoalCardProps {
    title: string;
    description: string;
    currentAmount: number;
    targetAmount: number;
    targetDate: string;
}

const StyledCard = styled(Card)`
  width: 100%; /* Adjust width for better layout */
  margin: 10px;
  padding: 5px;
  border-radius: 0;
  position: relative; /* Ensure Price and Rating are positioned correctly */
`;

const Price = styled.div`
  position: absolute;
  bottom: 10px;
  left: 27px;
`;

const Rating = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
  .ant-rate-star.ant-rate-star-full {
    margin-inline-end: 0; 
  }
  .ant-rate-star.ant-rate-star-zero{
    margin-inline-end: 0; 
  }
`;

const ProgressContainer = styled.div`
  margin-top: 10px;
`;

const GoalCard: React.FC<GoalCardProps> = ({ title, description, currentAmount, targetAmount, targetDate }) => {
    const progress = (currentAmount / targetAmount) * 100;

    return (
        <StyledCard
            hoverable        >
            <Meta title={title} description={description} />
            <ProgressContainer>
                <Progress percent={progress} />
                <div>{`$${currentAmount} raised of $${targetAmount}`}</div>
                <div>{`Target Date: ${targetDate}`}</div>
            </ProgressContainer>

        </StyledCard>
    );
};

export default GoalCard;
