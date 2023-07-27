import styled from 'styled-components';
import { useQuery } from 'react-query';
import moment from 'moment';
import 'moment/locale/ko';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GiPlantSeed } from 'react-icons/gi';
import { PiPlantDuotone } from 'react-icons/pi';
import { BiSolidTree } from 'react-icons/bi';
import { MdForest } from 'react-icons/md';
import { userData, roomsData } from '../../Recoil/atoms';
import { GreenLoading } from '../UI/loading';
import { getChatroomById } from '../API/Chat/fetchChat';

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
  section {
    display: flex;
    width: 90%;
    background-color: #ffffff;
    margin: 6px;
    padding: 6px;
    border-bottom: 2px solid #ebebeb;
    justify-content: space-around;
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
    width: 300px;
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
`;

const profiles = [
  <GiPlantSeed key={0} size="30" />,
  <PiPlantDuotone key={1} size="30" />,
  <BiSolidTree key={2} size="30" />,
  <MdForest key={3} size="30" />
];

const ChatList = ({ setIsStarted }) => {
  const setRoom = useSetRecoilState(roomsData);
  const currentUserData = useRecoilValue(userData);

  const chatrooms = currentUserData.userChatrooms;

  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  const { data: chatroomData, isLoading } = useQuery(
    'chatroomData',
    async () => {
      const chatroomPromises = chatrooms.map((id) => getChatroomById(id));
      const chatroomList = await Promise.all(chatroomPromises);
      const sortedChatroomList = chatroomList.sort(
        (a, b) => b.lastCreatedAt.seconds - a.lastCreatedAt.seconds
      );

      return sortedChatroomList;
    }
  );
  return (
    <ChatListContainer>
      {isLoading ? (
        <GreenLoading />
      ) : Array.isArray(chatroomData) ? (
        chatroomData?.map((data, idx) => (
          <section
            key={idx}
            onClick={() => {
              setIsStarted(true);
              setRoom(chatroomData[idx]);
            }}
          >
            <div className="icon-container">
              {profiles[data.helperLevel - 1]}
            </div>
            <div className="message-container">
              <p className="title">{data.title}</p>
              <p>
                {data.lastChat === ''
                  ? '나무를 시작하세요!'
                  : data.lastChat.length > 12
                  ? `${data.lastChat.slice(0, 12)}…`
                  : data.lastChat}
              </p>
            </div>
            <div className="time-container">
              {timeFromNow(data.lastCreatedAt.seconds * 1000)}
            </div>
          </section>
        ))
      ) : null}
    </ChatListContainer>
  );
};

export default ChatList;
