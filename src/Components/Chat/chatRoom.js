import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArticleIcon from '@mui/icons-material/Article';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import TabMenu from '../UI/TabMenu';
import ChatList from './chatList';
import RequestList from './requestList';
import { isStarted } from '../../Recoil/atoms';

const ChatRoomContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const RoomHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 17px;
  p {
    margin-left: 30px;
    width: 100%;
    text-align: left;
  }
`;
const ChatMenu = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Room = styled.section`
  width: 100%;
  height: 78%;
  border-top: 1.5px solid #c7d36f;
  border-bottom: 1.5px solid #c7d36f;
`;
const ChatInput = styled.section`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: center;
  svg {
    padding: 5px;
  }
  input {
    width: 85%;
    height: 25px;
    background-color: #efefef;
    border-radius: 20px;
    border: none;
    padding: 5px 7px;
  }
`;

const chatData = {
  title: '도와 주십쇼',
  postId: 5432,
  authorId: 1234,
  isChecked: true
};

const ChatRoom = () => {
  const chatStarted = useRecoilValue(isStarted);
  const setIsStarted = useSetRecoilState(isStarted);
  const tabs = [
    { name: '채팅', content: <ChatList setIsStarted={setIsStarted} /> },
    { name: '요청', content: <RequestList setIsStarted={setIsStarted} /> }
  ];

  return (
    <>
      {chatStarted ? (
        <ChatRoomContainer>
          <RoomHeader>
            <ArrowBackIosIcon
              onClick={() => {
                setIsStarted(false);
              }}
            />
            <p>{chatData.title}</p>
            <ChatMenu>
              <ArticleIcon />
              {chatData.isChecked ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}
            </ChatMenu>
          </RoomHeader>
          <Room></Room>
          <ChatInput>
            <InsertPhotoIcon />
            <input type="text" placeholder="채팅을 입력해 주세요!" />
          </ChatInput>
        </ChatRoomContainer>
      ) : (
        <TabMenu tabs={tabs} />
      )}
    </>
  );
};

export default ChatRoom;
