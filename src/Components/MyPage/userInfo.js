import styled from 'styled-components';
import { GiPlantSeed } from 'react-icons/gi';
import { PiPlantDuotone } from 'react-icons/pi';
import { BiSolidTree } from 'react-icons/bi';
import { MdForest } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { userData, currentBadge } from '../../Recoil/atoms';

const InfoContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #c7d36f;
  padding: 30px 0px;
  margin-bottom: 20px;
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

const profiles = [
  <GiPlantSeed key={0} size="30" />,
  <PiPlantDuotone key={1} size="30" />,
  <BiSolidTree key={2} size="30" />,
  <MdForest key={3} size="30" />
];

function UserInfo() {
  const currentUserData = useRecoilValue(userData);
  const selectedBadge = useRecoilValue(currentBadge);

  useEffect(() => {}, [selectedBadge]);

  return (
    <InfoContainer>
      {profiles[currentUserData.userLevel - 1]}
      <TwoLineText>
        <div>
          안녕하세요, {selectedBadge} {currentUserData.name} 님!
        </div>
        <div>
          {currentUserData.name} 님의 나무는 현재 {currentUserData.userLevel}
          단계입니다.
        </div>
      </TwoLineText>
    </InfoContainer>
  );
}

export default UserInfo;
