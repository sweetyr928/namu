import styled from 'styled-components';
import ChatRoom from '../Chat/chatRoom';

const ChatContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: calc(33.33% - 30px);
  height: calc(80%);
  background-color: #ffffff;
  overflow: hidden;
  font-weight: 600;
  font-size: 15px;
  margin-top: -50px;

  h1 {
    font-size: 20px;
  }

  button {
    border-bottom: 2px solid #ebebeb;
    font-size: 20px;
  }
  .active {
    background-color: #c7d36f;
    color: #ffffff;
    font-weight: 800;
    font-size: 20px;
    border: none;
  }
`;

const ChatSection = ({ isLogin }) => (
  <ChatContainer>
    {isLogin ? <ChatRoom /> : <h1>나무와 함께 해야 볼 수 있어요!</h1>}
  </ChatContainer>
);

export default ChatSection;
