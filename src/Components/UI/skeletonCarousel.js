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
  margin: 30px 0px 15px 0px;
`;

const SkeletonItem = styled.div`
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.8) 25%,
    rgba(240, 240, 240, 0.9) 37%,
    rgba(240, 240, 240, 0.8) 63%
  );
  background-size: 200px;
  animation: ${loadingAnimation} 1.8s infinite;
  margin: 6px 0px 6px 0px;
  padding: 6px 6px 6px 6px;
  border-radius: 15px;
`;

const SkeletonSliderItemContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  margin: 2vh auto 2vh auto;
  border-radius: 10px;
  background-color: #c7d36f;
`;

const SkeletonSliderItem = styled.div`
  width: 97%;
  height: 10vh;
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.8) 25%,
    rgba(240, 240, 240, 0.9) 37%,
    rgba(240, 240, 240, 0.8) 63%
  );
  background-size: 200px;
  animation: ${loadingAnimation} 1.8s infinite;
  border-radius: 20px;
  margin: 1vh auto 0 auto;
`;

export const SkeletonCarousel = () => (
  <SkeletonCarouselWrapper>
    <SkeletonTagWrapper>
      <SkeletonItem style={{ width: '50%', height: '30px' }} />
      <SkeletonItem style={{ width: '15%', height: '25px' }} />
    </SkeletonTagWrapper>
    <SkeletonSliderItemContainer>
      <SkeletonSliderItem />
      <SkeletonSliderItem />
      <SkeletonSliderItem />
      <SkeletonSliderItem />
      <SkeletonSliderItem />
    </SkeletonSliderItemContainer>
  </SkeletonCarouselWrapper>
);
