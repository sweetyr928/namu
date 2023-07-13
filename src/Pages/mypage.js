import styled from 'styled-components';
import UserInfo from '../Components/MyPage/userInfo';
import UserTitle from '../Components/MyPage/userTitle';
import UserPostList from '../Components/MyPage/userPostList';
import UserRequestList from '../Components/MyPage/userRequestList';
import TabMenu from '../Components/UI/TabMenu';

const MyPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 100%;
  height: calc(80%);
  background-color: #ffffff;
  margin: 0px 20px 50px 100px;
  padding: 20px;
`;

const ListContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 100%;
  height: calc(80%);
  background-color: #ffffff;
  padding-top: 50px;
`;

const UserList = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  background-color: #c7d36f;
`;

const tabs = [
  { name: '나의 요청들', content: <UserRequestList /> },
  { name: '나의 질문들', content: <UserPostList /> }
];

const MyPage = ({ name }) => (
  <MyPageContainer>
    <UserInfo name={name} />
    <ListContainer>
      <UserTitle />
      <UserList>
        <TabMenu tabs={tabs} />
      </UserList>
    </ListContainer>
  </MyPageContainer>
);

export default MyPage;
