import styled from 'styled-components';
import { WhiteButton } from '../UI/button';

const UserTitleContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #c7d36f;
  button {
    margin-bottom: 20px;
  }
`;

const UserTitleHeader = styled.section`
  display: flex;
  width: 100%;
  height: 17%;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  font-weight: 800;
`;

const UserTitleList = styled.section`
  display: flex;
  width: 100%;
  height: 80%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 40px;
    font-size: 19px;
    font-weight: 700;
    background-color: #ffffff;
    margin: 10px;
    padding: 10px;
    border-radius: 30px;
  }
`;

const titles = [
  '나무 심기',
  '첫 번째 나무',
  '미니 수목원',
  '친절의 씨앗',
  '나는야 고수',
  '배움의 매력',
  '나눔의 즐거움',
  '성장의 열정',
  '품앗이 대장'
];
const usertitles = ['나무 심기', '첫 번째 나무', '미니 수목원'];

const UserTitle = () => (
  <UserTitleContainer>
    <UserTitleHeader>나의 목패들</UserTitleHeader>
    <UserTitleList>
      {titles.map((el, idx) => (
        <div key={idx} className={usertitles.includes(el) ? 'get' : ''}>
          {el}
        </div>
      ))}
    </UserTitleList>
    <WhiteButton>목패 변경</WhiteButton>
  </UserTitleContainer>
);

export default UserTitle;
