import { useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { FaRegKissWinkHeart, FaRegSmile, FaRegSadTear } from 'react-icons/fa';
import Modal from '../UI/modal';
import { WhiteButton } from '../UI/button';
import { isStarted } from '../../Recoil/atoms';
import { givePoint } from '../API/Chat/fetchChat';

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

const QuestionSection = styled.section`
  display: flex;
  height: 50px;
  border-bottom: 2px solid #c7d36f;
  padding: 10px;
  justify-content: start;
  align-items: center;
`;

const PointSection = styled.section`
  display: flex;
  padding: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-right: 30px;
    p {
      margin-top: 20px;
      font-weight: 700;
    }
    &:hover {
      color: #c7d36f;
    }
  }
  .checked-point {
    color: #c7d36f;
  }
`;
const ButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div {
    margin-right: 10px;
    font-size: 17px;
  }
  span {
    color: #c7d36f;
  }
  button {
    font-size: 17px;
    margin-right: 10px;
  }
`;

const PointModal = ({ postId, helperId, chatId, handlerCloseModal }) => {
  const [point, setPoint] = useState(0);
  const setIsStarted = useSetRecoilState(isStarted);

  return (
    <Modal>
      <ContentSection>
        <QuestionSection>
          <h3>나무의 도움이 만족스러우셨나요?</h3>
        </QuestionSection>
        <PointSection>
          <div
            className={point === 5 ? 'checked-point' : '5'}
            onClick={() => {
              setPoint(5);
            }}
          >
            <FaRegKissWinkHeart size="50" />
            <p>완벽히 해결됐어요</p>
          </div>
          <div
            className={point === 3 ? 'checked-point' : '3'}
            onClick={() => {
              setPoint(3);
            }}
          >
            <FaRegSmile size="50" />
            <p>어느 정도 해결됐어요</p>
          </div>
          <div className={point === 1 ? 'checked-point' : '1'}>
            <FaRegSadTear
              size="50"
              onClick={() => {
                setPoint(1);
              }}
            />
            <p>아직 해결되지 않았어요</p>
          </div>
        </PointSection>
      </ContentSection>
      <ButtonWrapper>
        <div>
          해당 질문의 상태를 <span className="point">해결 완료</span>로
          변경할까요?
        </div>
        <WhiteButton
          onClick={() => {
            givePoint(chatId, postId, helperId, point, true);
            handlerCloseModal();
            setIsStarted(false);
          }}
        >
          네
        </WhiteButton>
        <WhiteButton
          onClick={() => {
            givePoint(chatId, postId, helperId, point, false);
            handlerCloseModal();
            setIsStarted(false);
          }}
        >
          아니오
        </WhiteButton>
      </ButtonWrapper>
    </Modal>
  );
};

export default PointModal;
