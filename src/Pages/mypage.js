import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import UserInfo from '../Components/MyPage/userInfo';
import UserTitle from '../Components/MyPage/userTitle';
import UserPostList from '../Components/MyPage/userPostList';
import TabMenu from '../Components/UI/TabMenu';
import UserRequestList from '../Components/MyPage/userRequestList';
import { userData } from '../Recoil/atoms';
import {
  badges,
  updateUserBadges,
  updateUserLevel
} from '../Components/API/Login/fetchUser';

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

const tabs = [
  {
    name: '나의 요청들',
    content: <UserRequestList />
  },
  { name: '나의 질문들', content: <UserPostList /> }
];

const MyPage = () => {
  const currentUserData = useRecoilValue(userData);
  const currentUserBadges = currentUserData.userBadges;
  const currentUserLevel = currentUserData.userLevel;

  useEffect(() => {
    const CalculateUserData = async () => {
      let newUserBadges = currentUserData.userBadges.slice();
      if (
        currentUserData.userPosts.length > 0 &&
        !currentUserData.userBadges.includes('첫 번째 나무')
      )
        newUserBadges = [...currentUserBadges, '첫 번째 나무'];
      if (
        currentUserData.userRequests.length > 0 &&
        !currentUserData.userBadges.includes('친절의 씨앗')
      )
        newUserBadges = [...newUserBadges, '친절의 씨앗'];
      if (
        currentUserData.userRequests.length >= 5 &&
        currentUserData.userChatrooms.length >= 3 &&
        !currentUserData.userBadges.includes('나눔의 즐거움')
      )
        newUserBadges = [...newUserBadges, '나눔의 즐거움'];
      if (
        currentUserData.userPosts.length >= 5 &&
        currentUserData.userChatrooms.length >= 3 &&
        !currentUserData.userBadges.includes('성장의 열정')
      )
        newUserBadges = [...newUserBadges, '성장의 열정'];
      if (
        currentUserData.userPosts.length >= 15 &&
        currentUserData.userChatrooms.length >= 10 &&
        !currentUserData.userBadges.includes('배움의 매력')
      )
        newUserBadges = [...newUserBadges, '배움의 매력'];
      if (
        currentUserData.userPoint >= 3 &&
        currentUserData.userChatrooms.length >= 15 &&
        !currentUserData.userBadges.includes('품앗이 대장')
      )
        newUserBadges = [...newUserBadges, '품앗이 대장'];
      if (
        currentUserData.userPoint >= 4.5 &&
        currentUserData.userChatrooms.length >= 20 &&
        !currentUserData.userBadges.includes('나는야 고수')
      )
        newUserBadges = [...newUserBadges, '나는야 고수'];
      if (
        currentUserData.userPosts.length >= 25 &&
        currentUserData.userChatrooms.length >= 20 &&
        !currentUserData.userBadges.includes('미니 수목원')
      )
        newUserBadges = [...newUserBadges, '미니 수목원'];

      if (currentUserBadges.length !== newUserBadges.length)
        await updateUserBadges(currentUserData.uuid, newUserBadges);

      let newUserLevel = 0;

      if (newUserBadges.length === 9) newUserLevel = 4;
      else if (newUserBadges.length >= 5) newUserLevel = 3;
      else if (newUserBadges.length >= 3) newUserLevel = 2;

      if (currentUserLevel !== newUserLevel)
        await updateUserLevel(currentUserData.uuid, newUserLevel);
    };

    CalculateUserData();
  }, [currentUserData]);

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
