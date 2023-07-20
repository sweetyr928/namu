import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import DOMPurify from 'isomorphic-dompurify';
import { useNavigate } from 'react-router-dom';

const ItemWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px auto 0px auto;
  padding: 20px 20px 10px 20px;
  border-radius: 20px;
  background-color: #ffffff;
  width: 92%;
  height: calc(10%);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
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
  width: 100%;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  transition: color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  width: 95%;

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
  width: calc(95%);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

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

const CarouselItem = ({ title, content, createdAt, id }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const formattedDate = new window.Date(createdAt.seconds * 1000);

  const handleMouse = useCallback(() => {
    setIsHovered(!isHovered);
  }, [isHovered]);

  const handleNavigate = useCallback(() => {
    navigate(`/posts/${id}`);
  }, [id]);

  const stripHTMLTags = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    return tmp.textContent || tmp.innerText || '';
  };

  const mergedContent = content.replace(/\n/g, '');
  const sanitizedContent = stripHTMLTags(mergedContent);

  const options = {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  return (
    <ItemWrapper
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouse}
      style={{
        backgroundColor: isHovered ? '#f8f8f8' : '#ffffff'
      }}
      onClick={handleNavigate}
    >
      <AnimatedCarouselItem>
        <Title
          style={{
            color: isHovered ? '#9eb23b' : '#3f3f3f'
          }}
        >
          {title}
        </Title>
        {sanitizedContent && (
          <Content
            style={{
              color: isHovered ? '#555555' : '#3f3f3f'
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(sanitizedContent)
            }}
          ></Content>
        )}
      </AnimatedCarouselItem>
      <Date>{formattedDate.toLocaleString('ko-KR', options)}</Date>
    </ItemWrapper>
  );
};

export default CarouselItem;
