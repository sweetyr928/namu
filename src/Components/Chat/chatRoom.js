import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArticleIcon from '@mui/icons-material/Article';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import TabMenu from '../UI/TabMenu';
import ChatList from './chatList';
import RequestList from './requestList';
import { isStarted, roomsData, userData } from '../../Recoil/atoms';
import PointModal from './pointModal';
import {
  handleSendChat,
  getChatById,
  getChatroomById
} from '../API/Chat/fetchChat';
import { storage } from '../../firebase';
import { GreenLoading } from '../UI/loading';

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
  svg {
    cursor: pointer;
  }
`;

const ChatMenu = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Room = styled.section`
  width: 100%;
  height: 78%;
  border-top: 1.5px solid #c7d36f;
  border-bottom: 1.5px solid #c7d36f;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .my-message {
    display: flex;
    width: 100%;
    margin: 10px;
    align-items: center;
    justify-content: end;
  }
  .partner-message {
    display: flex;
    width: 100%;
    margin: 10px;
    align-items: center;
    justify-content: start;
  }
  .my-chat {
    background-color: #c7d36f;
    padding: 8px 15px;
    border-radius: 30px;
  }
  .partner-chat {
    background-color: #efefef;
    padding: 8px 15px;
    border-radius: 30px;
  }
`;

const ChatInput = styled.section`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: center;
  svg {
    padding: 5px;
    cursor: pointer;
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

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatRoom = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [inputImg, setInputImg] = useState(null);

  const chatStarted = useRecoilValue(isStarted);
  const currentRoomData = useRecoilValue(roomsData);
  const currentUserData = useRecoilValue(userData);
  const setIsStarted = useSetRecoilState(isStarted);

  const navigate = useNavigate();

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const { data: chatData, isLoading } = useQuery(
    'chatData',
    async () => {
      try {
        const { chats } = await getChatroomById(currentRoomData.chatId);
        if (chats) {
          const chatPromises = chats.map((id) => getChatById(id));
          const chatList = await Promise.all(chatPromises);
          return chatList;
        } else {
          return [];
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
        throw new Error('Failed to fetch chat data');
      }
    },
    {
      refetchInterval: 3000,
      refetchIntervalInBackground: true,
      enabled: chatStarted
    }
  );

  const handlerCloseModal = () => {
    setModalOpen(false);
  };
  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const getImageFromStorage = async (photo) => {
    try {
      const ref = storage.ref(photo);
      const url = await ref.getDownloadURL();
      return url;
    } catch (error) {
      console.error('Error fetching image from Firebase Storage: ', error);
    }
  };

  const tabs = [
    { name: '채팅', content: <ChatList setIsStarted={setIsStarted} /> },
    { name: '요청', content: <RequestList /> }
  ];

  return (
    <>
      {isModalOpen && (
        <>
          <PointModal
            helperId={currentRoomData.helperId}
            chatId={currentRoomData.chatId}
            handlerCloseModal={handlerCloseModal}
          />
          <ModalBackground
            onClick={() => {
              setModalOpen(false);
            }}
          />
        </>
      )}
      {chatStarted ? (
        <ChatRoomContainer>
          <RoomHeader>
            <ArrowBackIosIcon
              onClick={() => {
                setIsStarted(false);
              }}
            />
            <p>{currentRoomData.title}</p>
            <ChatMenu>
              <ArticleIcon
                onClick={() => {
                  navigate(`/posts/${currentRoomData.postId}`);
                }}
              />
              {currentRoomData.helperId === currentUserData.uuid ? (
                <></>
              ) : currentRoomData.isChecked ? (
                <CheckBoxIcon />
              ) : (
                <CheckBoxOutlineBlankIcon
                  onClick={() => {
                    setModalOpen(true);
                  }}
                />
              )}
            </ChatMenu>
          </RoomHeader>
          <Room>
            {isLoading ? (
              <GreenLoading />
            ) : (
              chatData?.map((data, idx) => (
                <section
                  key={idx}
                  className={
                    currentUserData.uuid === data.user
                      ? 'my-message'
                      : 'partner-message'
                  }
                >
                  <div
                    className={
                      currentUserData.uuid === data.user
                        ? 'my-chat'
                        : 'partner-chat'
                    }
                  >
                    {data.photoURL && (
                      <img
                        src={getImageFromStorage(data.photoURL)}
                        alt="Uploaded from Firebase Storage"
                      />
                    )}
                    {data.content}
                  </div>
                  <div className="time">
                    {new Date(data.createdAt.seconds * 1000).toLocaleString(
                      'ko-KR',
                      options
                    )}
                  </div>
                </section>
              ))
            )}
          </Room>
          <ChatInput>
            <input
              type="file"
              style={{ display: 'none' }}
              id="file"
              name="file"
              accept="image/*"
              onChange={(e) => setInputImg(e.target.files[0])}
            />
            <label htmlFor="file">
              <InsertPhotoIcon />
            </label>
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  handleSendChat(
                    currentUserData.uuid,
                    currentRoomData.chatId,
                    inputMessage,
                    inputImg
                  );
                  setInputMessage('');
                  setInputImg(null);
                }
              }}
              placeholder="채팅을 입력해 주세요!"
            />
          </ChatInput>
        </ChatRoomContainer>
      ) : (
        <TabMenu tabs={tabs} />
      )}
    </>
  );
};

export default ChatRoom;
