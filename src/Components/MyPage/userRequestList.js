import styled from 'styled-components';

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
const userRequests = [
  {
    title: '제가 도와드립니다',
    content: '뭐가 문제인가요?',
    createdAt: '2023.06.17'
  },
  {
    title: '제가 도와드립니다',
    content: '뭐가 문제인가요?',
    createdAt: '2023.06.17'
  },
  {
    title: '제가 도와드립니다',
    content: '뭐가 문제인가요?',
    createdAt: '2023.06.17'
  }
];

const UserRequestList = () => (
  <UserRequestContainer>
    {userRequests.map((el, idx) => (
      <section key={idx}>
        <div>{el.title}</div>
        <div>{el.content}</div>
        <div>{el.createdAt}</div>
      </section>
    ))}
  </UserRequestContainer>
);

export default UserRequestList;
