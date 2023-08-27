import styled from 'styled-components';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import RequestListModal from '../UI/requestListModal';
import { SkeletonMyPageItem } from '../UI/skeletonMyPageItem';
import { userData } from '../../Recoil/atoms';
import { getUserData } from '../API/Login/fetchUser';
import { getRequestById } from '../API/Request/fetchRequest';

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
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  section {
    display: flex;
    width: 90%;
    height: 3.5rem;
    background-color: #ffffff;
    margin: 10px;
    padding: 10px;
    border-bottom: 2px solid #ebebeb;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    border-radius: 30px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      transform: scale(1.01);
      background-color: #f8f8f8;

      div {
        color: #9eb23b;
      }
    }
  }
  .icon-container {
    display: flex;
    justify-content: center;
    svg {
      font-size: 30px;
    }
  }
  .message-container {
    flex-direction: column;
    width: 350px;
    font-size: 14px;
    .title {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 800;
    }
  }
  .time-container {
    font-size: 13px;
    margin-top: 2.1875rem;
  }
  .empty-text {
    margin-top: 1.5625rem;
    font-weight: 800;
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
  const userId = currentUserData.uuid;

  const { data: requestData, isLoading } = useQuery(
    'userRequestData',
    async () => {
      const { userRequests } = await getUserData(userId);
      const requestPromises = userRequests.map((id) => getRequestById(id));
      const requestList = await Promise.all(requestPromises);

      const sortedRequestList = requestList.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );

      return sortedRequestList;
    }
  );

  const options = {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

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
        ) : Array.isArray(requestData) && requestData.length > 0 ? (
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
                {data.isMatched ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </div>
              <div className="message-container">
                <p className="title">
                  {data.title.length > 28
                    ? `${data.title.slice(0, 28)}…`
                    : data.title}
                </p>
                <p>
                  {data.message.length > 35
                    ? `${data.message.slice(0, 35)}…`
                    : data.message}
                </p>
              </div>
              <div className="time-container">
                {new Date(data.createdAt.seconds * 1000).toLocaleString(
                  'ko-KR',
                  options
                )}
              </div>
            </section>
          ))
        ) : (
          <div className="empty-text">아직 요청을 보내지 않았어요!</div>
        )}
      </ReqListContainer>
    </>
  );
};

export default RequestList;
