import { useState } from 'react';
import styled from 'styled-components';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RequestListModal from '../UI/requestListModal';
import { WhiteLoading } from '../UI/loading';

const UserRequestContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  border-radius: 0px 0px 30px 30px;
  background-color: #c7d36f;
  padding: 10px;
  section {
    width: 90%;
    background-color: #ffffff;
    margin: 10px;
    padding: 18px;
    border-radius: 30px;
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

const UserRequestList = ({ isLoading, requestUserData }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  return (
    <>
      {isModalOpen && (
        <>
          <RequestListModal requestDetail={requestUserData[selectedId]} />
          <ModalBackground
            onClick={() => {
              setModalOpen(false);
            }}
          />
        </>
      )}
      <UserRequestContainer>
        {isLoading ? (
          <WhiteLoading />
        ) : (
          requestUserData.map((data, idx) => (
            <section
              key={idx}
              onClick={() => {
                setSelectedId(idx);
                setModalOpen(true);
              }}
            >
              <div className="text-container">
                <p className="title">{data.title}</p>
                <p>{data.message}</p>
              </div>
              <div className="checking-container">
                {data.isMatched ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </div>
            </section>
          ))
        )}
      </UserRequestContainer>
    </>
  );
};

export default UserRequestList;
