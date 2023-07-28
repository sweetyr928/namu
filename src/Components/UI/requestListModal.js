import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Modal from './modal';
import { WhiteButton } from './button';
import { isStarted, userData, roomsData } from '../../Recoil/atoms';
import { createChatRoom, getChatroomById } from '../API/Chat/fetchChat';
import { profiles } from '../../profiles';

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 0px 0px 15px 0px;
  padding: 5px 10px 5px 10px;
  width: 37vw;
  height: 90%;
  border-radius: 20px;
`;

const TimeSection = styled.section`
  display: flex;
  height: 50px;
  border-bottom: 2px solid #c7d36f;
  padding: 10px;
  justify-content: start;
  align-items: center;
  span {
    font-weight: 700;
  }
  .icon {
    border: 2px solid #3f3f3f;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    padding: 5px;
    text-align: center;
  }
  .time {
    margin-left: 15px;
  }
`;

const MessageSection = styled.section`
  padding: 20px;
  .item {
    font-weight: 800;
    font-size: 17px;
    margin-bottom: 10px;
  }
`;
const ButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin: 0px 20px 0px 0px;
  }
`;

const RequestListModal = ({ requestDetail, handlerCloseModal }) => {
  const setIsStarted = useSetRecoilState(isStarted);
  const setRoom = useSetRecoilState(roomsData);
  const currentUserData = useRecoilValue(userData);

  const handleClick = async (chatRoomId) => {
    if (chatRoomId) {
      const newChatRoomData = await getChatroomById(chatRoomId);
      setRoom(newChatRoomData);
      setIsStarted(true);
    }
  };

  return (
    <Modal>
      <ContentSection>
        <TimeSection>
          <div className="icon">{profiles[requestDetail.helperLevel]}</div>
          <div className="time">
            <span>나무의 시간 : </span>
            {requestDetail.selectedTime}
          </div>
        </TimeSection>
        <MessageSection>
          <div className="item">나무의 한마디 : </div>
          {requestDetail.message}
        </MessageSection>
      </ContentSection>
      {requestDetail.helperId !== currentUserData.uuid ? (
        <ButtonWrapper>
          <WhiteButton
            onClick={async () => {
              const newChatRoomId = await createChatRoom(
                currentUserData.uuid,
                requestDetail.helperId,
                requestDetail.helperLevel,
                requestDetail.postId,
                requestDetail.title
              );

              if (newChatRoomId) {
                handleClick(newChatRoomId);
              } else {
                handleClick(
                  `${currentUserData.uuid}${requestDetail.helperId}${requestDetail.postId}`
                );
              }
            }}
          >
            나무 하러 가요!
          </WhiteButton>
          <WhiteButton onClick={handlerCloseModal}>다음에 만나요!</WhiteButton>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <WhiteButton onClick={handlerCloseModal}>뒤로 가기</WhiteButton>
        </ButtonWrapper>
      )}
    </Modal>
  );
};

export default RequestListModal;
