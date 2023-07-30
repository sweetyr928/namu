import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonCarouselWrapper = styled.article`
  width: 90%;
  height: 100%;
`;

const SkeletonTagWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 30px 0px 20px 0px;

  p {
    margin: 0px 0px 0px 10px;
    font-size: x-large;
    font-weight: 700;
  }

  button {
    background-color: transparent;
    border: none;
    margin: 0px 1px 0px 0px;
    font-size: medium;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: #c7d36f;
    }
  }
`;

const SkeletonItem = styled.div`
  width: 70%;
  height: 40px;
  background: linear-gradient(
    90deg,
    rgba(200, 200, 200, 0.4) 25%,
    rgba(220, 220, 220, 0.5) 37%,
    rgba(200, 200, 200, 0.4) 63%
  );
  background-size: 200px;
  animation: ${loadingAnimation} 1.8s infinite;
  margin: 6px;
  padding: 6px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SkeletonSliderItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 10px 20px 10px;
`;

const SkeletonSliderItem = styled.div`
  width: 100%;
  height: 110px;
  background: linear-gradient(
    90deg,
    rgba(200, 200, 200, 0.4) 25%,
    rgba(220, 220, 220, 0.5) 37%,
    rgba(200, 200, 200, 0.4) 63%
  );
  background-size: 200px;
  animation: ${loadingAnimation} 1.8s infinite;
  border-radius: 20px;
  margin: 10px 0px 0px 0px;
`;

export const SkeletonCarousel = () => (
  <SkeletonCarouselWrapper>
    <SkeletonTagWrapper>
      <SkeletonItem style={{ width: '50%', height: '30px' }} />
      <SkeletonItem style={{ width: '10%', height: '25px' }} />
    </SkeletonTagWrapper>
    <SkeletonSliderItemContainer>
      <SkeletonSliderItem />
      <SkeletonSliderItem />
      <SkeletonSliderItem />
    </SkeletonSliderItemContainer>
  </SkeletonCarouselWrapper>
);
