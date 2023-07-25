import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import UserInfo from '../Components/MyPage/userInfo';
import UserTitle from '../Components/MyPage/userTitle';
import UserPostList from '../Components/MyPage/userPostList';
import TabMenu from '../Components/UI/TabMenu';
import UserRequestList from '../Components/MyPage/userRequestList';
import { getRequestById } from '../Components/API/Request/fetchRequest';
import { userData } from '../Recoil/atoms';

const MyPageContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 100%;
  height: calc(80%);
  background-color: #ffffff;
  margin: 0px 20px 50px 100px;
  padding: 20px;
`;

const UserContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  padding-right: 30px;
`;

const UserList = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  background-color: #9eb23b;
  overflow: hidden;
  font-weight: 600;
  font-size: 18px;
  button {
    border-bottom: 2px solid #ffffff;
  }
  .active {
    background-color: #c7d36f;
    color: #ffffff;
    font-weight: 800;
    font-size: 20px;
    border: none;
  }
`;

const MyPage = () => {
  const tabs = [
    {
      name: '나의 요청들',
      content: <UserRequestList />
    },
    { name: '나의 질문들', content: <UserPostList /> }
  ];

  return (
    <MyPageContainer>
      <UserContainer>
        <UserInfo />
        <UserTitle />
      </UserContainer>
      <UserList>
        <TabMenu tabs={tabs} />
      </UserList>
    </MyPageContainer>
  );
};

export default MyPage;
