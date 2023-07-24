import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import RequestListModal from '../UI/requestListModal';
import { getReqestById } from '../API/Request/fetchRequest';
import { userData } from '../../Recoil/atoms';
import { GreenLoading } from '../UI/loading';

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

const RequestList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const currentUserData = useRecoilValue(userData);
  const requests = currentUserData.receivedRequests;

  const { data: requestData, isLoading } = useQuery(
    'requestData',
    async () => {
      const requestPromises = requests.map((id) => getReqestById(id));
      const requestList = await Promise.all(requestPromises);
      return requestList;
    },
    {
      enabled: requests.length > 0
    }
  );

  return (
    <>
      {isModalOpen && (
        <>
          <RequestListModal requestDetail={requestData[selectedId]} />
          <ModalBackground
            onClick={() => {
              setModalOpen(false);
            }}
          />
        </>
      )}
      <ReqListContainer>
        {isLoading ? (
          <GreenLoading />
        ) : (
          requestData.map((data, idx) => (
            <section
              key={idx}
              onClick={() => {
                setSelectedId(idx);
                setModalOpen(true);
              }}
            >
              <p>{data.message}</p>
            </section>
          ))
        )}
      </ReqListContainer>
    </>
  );
};

export default RequestList;
