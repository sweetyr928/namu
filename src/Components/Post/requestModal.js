import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useState, useCallback } from 'react';
import { useMutation } from 'react-query';
import { serverTimestamp } from 'firebase/firestore';
import { WhiteButton } from '../UI/button';
import Modal from '../UI/modal';
import { createRequest } from '../API/Request/fetchRequest';

const ContentContainer = styled.article`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 0px 0px 15px 0px;
  padding: 5px 10px 5px 10px;
  width: 37vw;
  height: 90%;
  border-radius: 20px;
`;

const DetailWrapper = styled.section`
  font-size: 20px;
  font-weight: 800;
  margin: 15px 0px 15px 25px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #c7d36f;
  margin: 0px 0px 30px 0px;
`;

const TimeSelectWrapper = styled.section`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 95%;
  margin: 0px auto 20px auto;

  span {
    margin: 0px 0px 0px 10px;
    font-size: 16px;
    font-weight: 700;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  margin: 0px 0px 0px 10px;
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
  padding: 5px 10px 5px 10px;
  border-radius: 4px;
  border: 1px solid #c7d36f;
  cursor: pointer;
`;

const DropdownMenuItem = styled.li`
  padding: 5px 10px 5px 10px;
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
  margin: 0px auto 5px auto;
  height: 60%;

  div {
    margin: 0px 0px 0px 10px;
    font-size: 16px;
    font-weight: 700;
  }
`;

const ModalTextArea = styled.textarea`
  width: 93%;
  height: 130px;
  resize: none;
  margin: 10px auto;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
  border: 2px solid #c7d36f;
  font-size: 15px;
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin: 0px 20px 0px 0px;
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
