import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../UI/modal';
import { WhiteButton } from '../UI/button';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 10px 0px 10px 0px;
  padding: 10px 10px 10px 10px;
  width: 90%;
  border-radius: 20px;
`;

const DetailWrapper = styled.div`
  font-size: 20px;
  font-weight: 800;
  margin: 10px 0px 15px 20px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #c7d36f;
  margin: 0px 0px 30px 0px;
`;

const TimeSelectWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  margin: 0px 0px 20px 10px;

  span {
    margin: 0px 0px 0px 13px;
    font-size: 16px;
    font-weight: 700;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  margin: 0px 0px 0px 10px;
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

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 4px;
  border: 2px solid #c7d36f;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const DropdownMenuItem = styled.li`
  padding: 5px 10px 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c7d36f;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: stretch;
  margin: 0px 0px 15px 10px;

  div {
    margin: 0px 0px 0px 13px;
    font-size: 16px;
    font-weight: 700;
  }
`;

const ModalTextArea = styled.textarea`
  width: 93%;
  height: 150px;
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

const RequestModal = ({ toggleModal }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    toggleModal();
  };

  const handleCancel = () => {
    toggleModal();
  };

  return (
    <Modal>
      <ContentContainer>
        <DetailWrapper>
          filter 함수가 제대로 돌아가지 않습니다 ㅠㅠ 어떻게 해야 하나요?
        </DetailWrapper>
        <Divider />
        <TimeSelectWrapper>
          <span>나무의 시간:</span>
          <DropdownWrapper>
            <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {selectedTime || '최대 얼마 동안 도움을 줄 수 있나요?'}
            </DropdownButton>
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownMenuItem onClick={() => handleTimeSelect('30 분')}>
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
          <ModalTextArea />
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
