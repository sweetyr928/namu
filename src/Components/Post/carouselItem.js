import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const ItemWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 10px 0px 10px;
  padding: 10px 10px 10px 10px;
  border-radius: 20px;
  background-color: #ffffff;
  height: calc(13%);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  transition: color 0.3s ease;

  @media (min-width: 1024px) {
    font-size: 16px;
  }

  @media (min-width: 1440px) {
    font-size: 18px;
  }
`;

const Content = styled.div`
  font-size: 12px;
  font-weight: 600;
  transition: color 0.3s ease;
  margin: 5px 0px 0px 0px;

  @media (min-width: 1024px) {
    font-size: 14px;
  }

  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;

const Date = styled.span`
  font-size: 10px;
  font-weight: 300;
  align-self: flex-end;

  @media (min-width: 1024px) {
    font-size: 12px;
  }

  @media (min-width: 1440px) {
    font-size: 14px;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedCarouselItem = styled.div`
  animation: ${fadeIn} 0.5s ease;
`;

const CarouselItem = ({
  title,
  content,
  createdAt,
  id,
  setComp,
  setSelectedId
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const formattedDate = new window.Date(createdAt.seconds * 1000);

  const handleMouse = useCallback(() => {
    setIsHovered(!isHovered);
  }, [isHovered]);

  const handleClick = useCallback(() => {
    setComp('detail');
    setSelectedId(id);
  }, [id]);

  return (
    <ItemWrapper
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouse}
      style={{
        backgroundColor: isHovered ? '#f8f8f8' : '#ffffff'
      }}
      onClick={handleClick}
    >
      <AnimatedCarouselItem>
        <Title
          style={{
            color: isHovered ? '#9eb23b' : '#3f3f3f'
          }}
        >
          {title}
        </Title>
        <Content
          style={{
            color: isHovered ? '#555555' : '#3f3f3f'
          }}
        >
          {content}
        </Content>
      </AnimatedCarouselItem>
      <Date>{formattedDate.toLocaleString()}</Date>
    </ItemWrapper>
  );
};

export default CarouselItem;
