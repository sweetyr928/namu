import { useState } from 'react';
import styled from 'styled-components';
import RequestListModal from '../UI/requestListModal';

const ReqListContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  border-radius: 0px 0px 30px 30px;
  background-color: #ffffff;
  padding: 10px 0px;
  section {
    width: 90%;
    background-color: #ffffff;
    margin: 6px;
    padding: 6px;
    border-bottom: 2px solid #ebebeb;
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

const requests = [
  {
    title: '헬프미 헬프미',
    content: '헬프미 헬프미 헬프미',
    createdAt: '2023.06.17'
  },
  {
    title: '헬프미 헬프미',
    content: '헬프미 헬프미 헬프미',
    createdAt: '2023.06.17'
  },
  {
    title: '헬프미 헬프미',
    content: '헬프미 헬프미 헬프미',
    createdAt: '2023.06.17'
  }
];

const RequestList = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <>
          <RequestListModal />
          <ModalBackground
            onClick={() => {
              setModalOpen(false);
            }}
          />
        </>
      )}
      <ReqListContainer>
        {requests.map((el, idx) => (
          <section
            key={idx}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <div>{el.title}</div>
            <div>{el.content}</div>
            <div>{el.createdAt}</div>
          </section>
        ))}
      </ReqListContainer>
    </>
  );
};

export default RequestList;
