import styled from 'styled-components';

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

const RequestList = ({ setIsStarted }) => (
  <ReqListContainer>
    {requests.map((el, idx) => (
      <section
        key={idx}
        onClick={() => {
          setIsStarted(true);
        }}
      >
        <div>{el.title}</div>
        <div>{el.content}</div>
        <div>{el.createdAt}</div>
      </section>
    ))}
  </ReqListContainer>
);

export default RequestList;
