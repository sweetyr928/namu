import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonItem = styled.div`
  width: 90%;
  height: 8vh;
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.8) 25%,
    rgba(240, 240, 240, 0.9) 37%,
    rgba(240, 240, 240, 0.8) 63%
  );
  background-size: 200px;
  animation: ${loadingAnimation} 1.8s infinite;
  margin: 0px 0px 10px 0px;
  padding: 6px 6px 6px 6px;
  border-radius: 20px;
`;

export const SkeletonMyPageItem = () => (
  <>
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
  </>
);
