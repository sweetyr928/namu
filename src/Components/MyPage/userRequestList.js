import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import RequestListModal from '../UI/requestListModal';
import { userData } from '../../Recoil/atoms';
import { getRequestById } from '../API/Request/fetchRequest';
import { SkeletonMyPageItem } from '../UI/skeletonMyPageItem';
import { profiles } from '../../../public/profiles';

const ReqListContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  border-radius: 0px 0px 30px 30px;
  background-color: #c7d36f;
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
  const requests = currentUserData.userRequests;

  const { data: requestData, isLoading } = useQuery(
    'userRequestData',
    async () => {
      const requestPromises = requests.map((id) => getRequestById(id));
      const requestList = await Promise.all(requestPromises);

      const sortedRequestList = requestList.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );

      return sortedRequestList;
    }
  );

  const handlerCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <>
          <RequestListModal
            requestDetail={requestData[selectedId]}
            handlerCloseModal={handlerCloseModal}
          />
          <ModalBackground
            onClick={() => {
              setModalOpen(false);
            }}
          />
        </>
      )}
      <ReqListContainer>
        {isLoading ? (
          <SkeletonMyPageItem />
        ) : (
          requestData?.map((data, idx) => (
            <section
              className="item-container"
              key={idx}
              onClick={() => {
                setSelectedId(idx);
                setModalOpen(true);
              }}
            >
              <div className="icon-container">
                {profiles[data.helperLevel]}
              </div>
              <div className="message-container">
                <p className="title">{data.title}</p>
                <p>
                  {data.message.length > 12
                    ? `${data.message.slice(0, 12)}…`
                    : data.message}
                </p>
              </div>
              <div className="time-container">
                {`${new Date(
                  data.createdAt.seconds * 1000
                ).getHours()}:${new Date(
                  data.createdAt.seconds * 1000
                ).getMinutes()}`}
              </div>
            </section>
          ))
        )}
      </ReqListContainer>
    </>
  );
};

export default RequestList;
