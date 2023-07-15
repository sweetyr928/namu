import styled from 'styled-components';

const UserPostContainer = styled.section`
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
const userPosts = [
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

const UserPostList = () => (
  <UserPostContainer>
    {userPosts.map((el, idx) => (
      <section key={idx}>
        <div>{el.title}</div>
        <div>{el.content}</div>
        <div>{el.createdAt}</div>
      </section>
    ))}
  </UserPostContainer>
);

export default UserPostList;
