import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { serverTimestamp } from 'firebase/firestore';
import { WhiteButton } from '../UI/button';
import Modal from '../UI/modal';
import { createRequest } from '../API/Request/fetchRequest';

const ContentContainer = styled.article`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 0 0 1.5vh 0;
  padding: 0.5vh 1vh 0.5vh 1vh;
  width: 37vw;
  height: 90%;
  border-radius: 20px;
`;

const DetailWrapper = styled.section`
  font-size: 26px;
  font-weight: 800;
  margin: 1.5vh 0 1.5vh 2.5vh;

  @media (min-width: 1024px) {
    font-size: 18px;
  }

  @media (min-width: 1440px) {
    font-size: 20px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #c7d36f;
  margin: 0 0 3vh 0;
`;

const TimeSelectWrapper = styled.section`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 95%;
  margin: 0 auto 2vh auto;

  span {
    margin: 0 0 0 1vh;
    font-size: 16px;
    font-weight: 700;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  margin: 0 0 0 1vh;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  width: 243px;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 4px;
  border: 2px solid #c7d36f;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5vh 1vh 0.5vh 1vh;
  border-radius: 4px;
  border: 1px solid #c7d36f;
  cursor: pointer;
`;

const DropdownMenuItem = styled.li`
  padding: 0.5vh 1vh 0.5vh 1vh;
  cursor: pointer;

  &:hover {
    background-color: #c7d36f;
  }
`;

const TextWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  width: 95%;
  margin: 0 auto 0.5vh auto;
  height: 22vh;

  div {
    margin: 0 0 0 1vh;
    font-size: 16px;
    font-weight: 700;
  }
`;

const ModalTextArea = styled.textarea`
  width: 93%;
  height: 100%;
  resize: none;
  margin: 1vh auto;
  padding: 1vh 1vh 1vh 1vh;
  border-radius: 10px;
  border: 2px solid #c7d36f;
  font-size: 15px;
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 10%;

  button:first-child {
    margin: 0 2vh 0 0;
  }
`;

const RequestModal = ({
  title,
  closeModal,
  postId,
  helperId,
  helperLevel,
  requesterId
}) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  const createRequestMutation = useMutation((requestData) =>
    createRequest(`${postId}-${helperId}`, helperId, requesterId, requestData)
  );

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (message.trim() === '' || !selectedTime.length) {
      Toast.fire({
        icon: 'error',
        title: '모든 항목(나무의 시간/한마디)을 정확히 입력했는지 확인해주세요.'
      });
      return;
    }

    try {
      const currentTime = serverTimestamp();
      const requestData = {
        postId,
        title,
        helperId,
        helperLevel,
        requesterId,
        selectedTime,
        message,
        isMatched: false,
        createdAt: currentTime
      };

      const newRequestID = await createRequestMutation.mutateAsync(requestData);

      if (newRequestID) {
        Toast.fire({
          icon: 'success',
          title: '요청이 전송되었습니다.'
        });

        closeModal();
      }
    } catch (error) {
      console.error('Error checking request document:', error);
      Toast.fire({
        icon: 'error',
        title: '요청 전송에 실패했습니다.'
      });
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal>
      <ContentContainer>
        <DetailWrapper>{title}</DetailWrapper>
        <Divider />
        <TimeSelectWrapper>
          <span>나무의 시간:</span>
          <DropdownWrapper>
            <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {selectedTime || '최대 얼마 동안 도움을 줄 수 있나요?'}
            </DropdownButton>
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownMenuItem onClick={() => handleTimeSelect('30분')}>
                  30분
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeSelect('1시간')}>
                  1시간
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleTimeSelect('1시간 30분')}
                >
                  1시간 30분
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeSelect('2시간')}>
                  2시간
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTimeSelect('제한 없음')}>
                  제한 없음
                </DropdownMenuItem>
              </DropdownMenu>
            )}
          </DropdownWrapper>
        </TimeSelectWrapper>
        <TextWrapper>
          <div>나무의 한마디</div>
          <ModalTextArea value={message} onChange={handleChange} />
        </TextWrapper>
      </ContentContainer>
      <ButtonWrapper>
        <WhiteButton onClick={handleSubmit}>보내기</WhiteButton>
        <WhiteButton onClick={handleCancel}>취소</WhiteButton>
      </ButtonWrapper>
    </Modal>
  );
};

export default RequestModal;
