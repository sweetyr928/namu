import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { userData, currentBadge } from '../../Recoil/atoms';
import { profiles } from '../../profiles';

const InfoContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20vh;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #c7d36f;
  padding: 3vh 0px;
  margin-bottom: 2vh;
`;

const UserIconWrapper = styled.section`
  border: 3px solid #3f3f3f;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 5px;
  margin: 0px 10px 0px 0px;
`;

const TwoLineText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  padding-top: 20px;
`;

function UserInfo() {
  const currentUserData = useRecoilValue(userData);
  const selectedBadge = useRecoilValue(currentBadge);

  useEffect(() => {}, [selectedBadge]);

  return (
    <InfoContainer>
      <UserIconWrapper>{profiles[currentUserData.userLevel]}</UserIconWrapper>
      <TwoLineText>
        <div>
          안녕하세요, {selectedBadge} {currentUserData.name} 님!
        </div>
        <div>
          {currentUserData.name} 님의 나무는 현재{' '}
          {currentUserData.userLevel + 1}
          단계입니다.
        </div>
      </TwoLineText>
    </InfoContainer>
  );
}

export default UserInfo;
