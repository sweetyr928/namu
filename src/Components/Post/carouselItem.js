import styled, { keyframes } from 'styled-components';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'isomorphic-dompurify';

const ItemWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 1vh auto 1vh auto;
  padding: 2vh 2vh 1vh 2vh;
  border-radius: 20px;
  background-color: #ffffff;
  width: 92%;
  height: 8vh;
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
  width: calc(95%);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (min-width: 1024px) {
    font-size: 14px;
    margin: 1vh 0vh 0vh 0vh;
  }

  @media (min-width: 1440px) {
    font-size: 16px;
    margin: 1vh 0vh 0vh 0vh;
  }
`;

const Date = styled.span`
  font-size: 10px;
  font-weight: 300;
  align-self: flex-end;
  margin: 0vh 0vh 0.3vh 0vh;

  @media (min-width: 1024px) {
    font-size: 12px;
  }

  @media (min-width: 1440px) {
    font-size: 14px;
  }
`;

const CarouselItem = ({ title, content, createdAt, id, isSolved }) => {
  const navigate = useNavigate();

  const formattedDate = new window.Date(createdAt.seconds * 1000);

  const handleNavigate = useCallback(() => {
    navigate(`/posts/${id}`, { state: { isSolved } });
  }, [id]);

  const stripHTMLTags = useCallback((html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    return tmp.textContent || tmp.innerText || '';
  }, []);

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
      style={{
        backgroundColor: isSolved ? '#f8f8f8' : '#ffffff',
        boxShadow: isSolved ? 'none' : '0px 0px 10px rgba(0, 0, 0, 0.2)'
      }}
      onClick={handleNavigate}
    >
      <AnimatedCarouselItem>
        <Title
          className={isSolved ? 'solved' : ''}
          style={{
            color: isSolved ? '#888888' : '#3f3f3f'
          }}
        >
          {title}
        </Title>
        {sanitizedContent && (
          <Content
            className={isSolved ? 'solved' : ''}
            style={{
              color: isSolved ? '#888888' : '#3f3f3f'
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
