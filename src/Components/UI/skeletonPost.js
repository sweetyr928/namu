import styled, { keyframes } from 'styled-components';

const ContentContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 20px 20px 20px;
  width: 95%;
  height: 100%;
`;

const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonTitle = styled.div`
  width: 60%;
  height: 20px;
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.8) 25%,
    rgba(240, 240, 240, 0.9) 37%,
    rgba(240, 240, 240, 0.8) 63%
  );
  background-size: 200px;
  animation: ${loadingAnimation} 1.8s infinite;
  margin-bottom: 5px;
  border-radius: 15px;
`;

const SkeletonTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkeletonTag = styled.div`
  width: 80px;
  height: 20px;
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.8) 25%,
    rgba(240, 240, 240, 0.9) 37%,
    rgba(240, 240, 240, 0.8) 63%
  );
  background-size: 200px;
  animation: ${loadingAnimation} 1.8s infinite;
  border-radius: 15px;
`;

const SkeletonContent = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(
    90deg,
    rgba(240, 240, 240, 0.8) 25%,
    rgba(240, 240, 240, 0.9) 37%,
    rgba(240, 240, 240, 0.8) 63%
  );
  background-size: 200px;
  animation: ${loadingAnimation} 1.8s infinite;
  margin-bottom: 20px;
  border-radius: 15px;
`;

const ContentHeader = styled.header`
  height: 10%;
`;

const ContentDetail = styled.section`
  margin: 10px 10px 10px 10px;
  height: 72%;
`;

const ContentFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 10px;
  flex-shrink: 0;

  button:first-child {
    margin: 0px 20px 0px 0px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #c7d36f;
  margin: 5px 0px 5px 0px;
`;

export const SkeletonPost = () => {
  <ContentContainer>
    <ContentHeader>
      <SkeletonTitle />
      <span>
        <SkeletonTagList>
          <SkeletonTag />
          <SkeletonTag />
          <SkeletonTag />
        </SkeletonTagList>
      </span>
    </ContentHeader>
    <Divider />
    <ContentDetail>
      <SkeletonContent />
    </ContentDetail>
    <Divider />
    <ContentFooter>
      <SkeletonTag />
      <SkeletonTag />
    </ContentFooter>
  </ContentContainer>;
};
