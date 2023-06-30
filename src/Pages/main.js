import styled from 'styled-components';
import PostSection from '../Components/UI/postSection';
import ChatSection from '../Components/UI/chatSection';
import Carousel from '../Components/Post/carousel';

const TagWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0px 0px 30px 0px;

  p {
    margin: 0px 0px 0px 30px;
    font-size: x-large;
    font-weight: 700;
  }

  button {
    background-color: transparent;
    border: none;
    margin: 0px 30px 0px 0px;
    font-size: medium;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: #9eb23b;
    }
  }
`;

const MainPage = () => (
  <>
    <PostSection>
      <TagWrapper>
        <p># 리액트</p>
        <button>태그 추가</button>
      </TagWrapper>
      <Carousel />
    </PostSection>
    <ChatSection></ChatSection>
  </>
);

export default MainPage;
