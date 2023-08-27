import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { profiles } from '../../profiles';
import { SkeletonChatSectionItem } from '../UI/skeletonChatSectionItem';
import { userData, roomsData } from '../../Recoil/atoms';
import { getChatroomById } from '../API/Chat/fetchChat';
import { getUserData } from '../API/Login/fetchUser';

const ChatListContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  border-radius: 0px 0px 30px 30px;
  background-color: #ffffff;
  padding: 10px 0px;
  margin: 0 auto;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  section {
    display: flex;
    width: 90%;
    height: 3.5rem;
    background-color: #ffffff;
    margin: 6px;
    padding: 6px;
    border-bottom: 2px solid #ebebeb;
    justify-content: space-between;
    cursor: pointer;
  }
  div {
    display: flex;
  }
  .icon-container {
    border: 2px solid #3f3f3f;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    padding: 5px;
    margin-right: 9px;
  }
  .message-container {
    flex-direction: column;
    width: 65%;
    font-size: 14px;
    .title {
      margin-bottom: 8px;
      font-size: 15px;
      font-weight: 800;
    }
  }
  .time-container {
    font-size: 13px;
  }
  .empty-text {
    margin-top: 20px;
    font-weight: 800;
  }
`;

const ChatList = ({ setIsStarted }) => {
  const [mustLoad, setMustLoad] = useState(false);
  const setRoom = useSetRecoilState(roomsData);
  const currentUserData = useRecoilValue(userData);
  const userId = currentUserData.uuid;

  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  const { data: chatroomData, isLoading } = useQuery(
    'chatroomData',
    async () => {
      try {
        if (userId) {
          const { userChatrooms } = await getUserData(userId);
          const chatroomPromises = userChatrooms.map((id) =>
            getChatroomById(id)
          );
          const chatroomList = await Promise.all(chatroomPromises);
          const sortedChatroomList = chatroomList.sort(
            (a, b) => b.lastCreatedAt.seconds - a.lastCreatedAt.seconds
          );
          setMustLoad(false);

          return sortedChatroomList;
        } else {
          setMustLoad(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch chatroom data');
      }
    },
    {
      refetchInterval: 500,
      refetchIntervalInBackground: true
    }
  );

  const handleClick = (idx) => {
    setRoom(chatroomData[idx]);
    setIsStarted(true);
  };

  return (
    <ChatListContainer>
      {isLoading ? (
        <SkeletonChatSectionItem />
      ) : Array.isArray(chatroomData) && chatroomData.length > 0 ? (
        chatroomData?.map((data, idx) => (
          <section key={idx} onClick={() => handleClick(idx)}>
            <div className="icon-container">{profiles[data.helperLevel]}</div>
            <div className="message-container">
              <p className="title">
                {data.title.length > 22
                  ? `${data.title.slice(0, 22)}…`
                  : data.title}
              </p>
              <p>
                {data.lastChat === ''
                  ? '나무를 시작하세요!'
                  : data.lastChat.length > 22
                  ? `${data.lastChat.slice(0, 22)}…`
                  : data.lastChat}
              </p>
            </div>
            <div className="time-container">
              {timeFromNow(data.lastCreatedAt.seconds * 1000)}
            </div>
          </section>
        ))
      ) : mustLoad ? (
        <SkeletonChatSectionItem />
      ) : (
        <div className="empty-text">아직 채팅을 시작하지 않았어요!</div>
      )}
    </ChatListContainer>
  );
};

export default ChatList;
