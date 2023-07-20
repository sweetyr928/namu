import styled from 'styled-components';

const NotFoundContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: calc(60% - 10px);
  height: calc(80%);
  background-color: #ffffff;
  margin: 0px 20px 50px 70px;
  font-size: 30px;
  font-weight: 600;
  h1 {
    margin-top: 50px;
  }
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <h1>{`존재하지 않는 페이지입니다 :(`}</h1>
    </NotFoundContainer>
  );
}

export default NotFound;
