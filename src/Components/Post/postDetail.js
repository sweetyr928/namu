import styled from 'styled-components';
import { useState } from 'react';
import { GreenButton } from '../UI/button';
import RequestModal from './requestModal';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 30px 30px 30px;
  height: 100%;
`;

const ContentHeader = styled.div`
  display: flex;
  height: 10%;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 10px 0px 0px 0px;
  flex-shrink: 0;

  div {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0px 5px 0px;
  }

  span {
    font-size: 14px;
    font-weight: 300;
    align-self: flex-end;
    margin: 0px 0px 5px 0px;
  }
`;

const ContentDetail = styled.div`
  margin: 10px 10px 10px 10px;
  height: 72%;
  overflow-y: scroll;
  letter-spacing: 1px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c7d36f;
    border-radius: 5px;
    height: 1%;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 10px;
  flex-shrink: 0;

  button:first-child {
    margin: 0px 20px 0px 0px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #c7d36f;
  margin: 5px 0px 5px 0px;
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

const PostDetail = ({ handleComp, category, idx }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoBack = () => {
    handleComp('list');
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen ? (
        <>
          <RequestModal toggleModal={toggleModal}></RequestModal>
          <ModalBackground onClick={toggleModal} />
        </>
      ) : null}
      <ContentContainer>
        <ContentHeader>
          <div>
            filter 함수가 제대로 돌아가지 않습니다 ㅠㅠ 어떻게 해야 하나요?
          </div>
          <span>2023년 6월 26일 오후 2시 33분</span>
        </ContentHeader>
        <Divider />
        <ContentDetail>
          현재 리액트를 사용하여 간단한 투두 리스트 앱을 만들고 있습니다.
          완료되지 않은 투두 리스트만 뽑아 보여주려고 하는데 filter 함수
          부분에서 막혔습니다. 저를 도와주세요... filter 함수의 기본 지식은
          있는데 어떤 조건이 좋을지가 고민입니다 ㅠㅠ 코드는 너무 길어서... 채팅
          주시면 캡처 화면 드릴게요... 현재 리액트를 사용하여 간단한 투두 리스트
          앱을 만들고 있습니다. 완료되지 않은 투두 리스트만 뽑아 보여주려고
          하는데 filter 함수 부분에서 막혔습니다. 저를 도와주세요... filter
          함수의 기본 지식은 있는데 어떤 조건이 좋을지가 고민입니다 ㅠㅠ 코드는
          너무 길어서... 채팅 주시면 캡처 화면 드릴게요... 현재 리액트를
          사용하여 간단한 투두 리스트 앱을 만들고 있습니다. 완료되지 않은 투두
          리스트만 뽑아 보여주려고 하는데 filter 함수 부분에서 막혔습니다. 저를
          도와주세요... filter 함수의 기본 지식은 있는데 어떤 조건이 좋을지가
          고민입니다 ㅠㅠ 코드는 너무 길어서... 채팅 주시면 캡처 화면
          드릴게요... 현재 리액트를 사용하여 간단한 투두 리스트 앱을 만들고
          있습니다. 완료되지 않은 투두 리스트만 뽑아 보여주려고 하는데 filter
          함수 부분에서 막혔습니다. 저를 도와주세요... filter 함수의 기본 지식은
          있는데 어떤 조건이 좋을지가 고민입니다 ㅠㅠ 코드는 너무 길어서... 채팅
          주시면 캡처 화면 드릴게요... 현재 리액트를 사용하여 간단한 투두 리스트
          앱을 만들고 있습니다. 완료되지 않은 투두 리스트만 뽑아 보여주려고
          하는데 filter 함수 부분에서 막혔습니다. 저를 도와주세요... filter
          함수의 기본 지식은 있는데 어떤 조건이 좋을지가 고민입니다 ㅠㅠ 코드는
          너무 길어서... 채팅 주시면 캡처 화면 드릴게요... 현재 리액트를
          사용하여 간단한 투두 리스트 앱을 만들고 있습니다. 완료되지 않은 투두
          리스트만 뽑아 보여주려고 하는데 filter 함수 부분에서 막혔습니다. 저를
          도와주세요... filter 함수의 기본 지식은 있는데 어떤 조건이 좋을지가
          고민입니다 ㅠㅠ 코드는 너무 길어서... 채팅 주시면 캡처 화면
          드릴게요... 현재 리액트를 사용하여 간단한 투두 리스트 앱을 만들고
          있습니다. 완료되지 않은 투두 리스트만 뽑아 보여주려고 하는데 filter
          함수 부분에서 막혔습니다. 저를 도와주세요... filter 함수의 기본 지식은
          있는데 어떤 조건이 좋을지가 고민입니다 ㅠㅠ 코드는 너무 길어서... 채팅
          주시면 캡처 화면 드릴게요... 현재 리액트를 사용하여 간단한 투두 리스트
          앱을 만들고 있습니다. 완료되지 않은 투두 리스트만 뽑아 보여주려고
          하는데 filter 함수 부분에서 막혔습니다. 저를 도와주세요... filter
          함수의 기본 지식은 있는데 어떤 조건이 좋을지가 고민입니다 ㅠㅠ 코드는
          너무 길어서... 채팅 주시면 캡처 화면 드릴게요... 현재 리액트를
          사용하여 간단한 투두 리스트 앱을 만들고 있습니다. 완료되지 않은 투두
          리스트만 뽑아 보여주려고 하는데 filter 함수 부분에서 막혔습니다. 저를
          도와주세요... filter 함수의 기본 지식은 있는데 어떤 조건이 좋을지가
          고민입니다 ㅠㅠ 코드는 너무 길어서... 채팅 주시면 캡처 화면
          드릴게요... 현재 리액트를 사용하여 간단한 투두 리스트 앱을 만들고
          있습니다. 완료되지 않은 투두 리스트만 뽑아 보여주려고 하는데 filter
          함수 부분에서 막혔습니다. 저를 도와주세요... filter 함수의 기본 지식은
          있는데 어떤 조건이 좋을지가 고민입니다 ㅠㅠ 코드는 너무 길어서... 채팅
          주시면 캡처 화면 드릴게요... 현재 리액트를 사용하여 간단한 투두 리스트
          앱을 만들고 있습니다. 완료되지 않은 투두 리스트만 뽑아 보여주려고
          하는데 filter 함수 부분에서 막혔습니다. 저를 도와주세요... filter
          함수의 기본 지식은 있는데 어떤 조건이 좋을지가 고민입니다 ㅠㅠ 코드는
          너무 길어서... 채팅 주시면 캡처 화면 드릴게요... 현재 리액트를
          사용하여 간단한 투두 리스트 앱을 만들고
        </ContentDetail>
        <Divider />
        <ContentFooter>
          <GreenButton onClick={toggleModal}>나무 하러 가기</GreenButton>
          <GreenButton onClick={handleGoBack}>뒤로 가기</GreenButton>
        </ContentFooter>
      </ContentContainer>
    </>
  );
};

export default PostDetail;
