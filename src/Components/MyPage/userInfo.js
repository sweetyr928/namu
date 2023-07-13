import styled from 'styled-components';
import { ParkRounded } from '@mui/icons-material';

const InfoContainer = styled.article`
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 30px;
  background-color: #c7d36f;
  padding: 20px 0px;
  svg {
    padding: 0px 0px 0px 20px;
  }
`;
const TwoLineText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 22px;
  font-weight: bold;
  padding: 0px 15px;
`;

const UserInfo = ({ name }) => (
  <InfoContainer>
    <ParkRounded sx={{ fontSize: 60 }} />
    <TwoLineText>
      <div>안녕하세요, 나는야 고수 {name} 님!</div>
      <div>{name} 님의 나무는 현재 4단계입니다.</div>
    </TwoLineText>
  </InfoContainer>
);

export default UserInfo;
