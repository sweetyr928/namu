import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { isStarted } from '../../Recoil/atoms';
import TabMenu from './TabMenu';
import ChatList from '../Chat/chatList';
import RequestList from '../Chat/requestList';

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

const ChatSection = ({ isLogin }) => {
  const setIsStarted = useSetRecoilState(isStarted);

  const tabs = [
    { name: '채팅', content: <ChatList setIsStarted={setIsStarted} /> },
    { name: '요청', content: <RequestList /> }
  ];

  return (
    <ChatContainer>
      {isLogin ? (
        <TabMenu tabs={tabs} />
      ) : (
        <h1>나무와 함께 해야 볼 수 있어요!</h1>
      )}
    </ChatContainer>
  );
};

export default ChatSection;
