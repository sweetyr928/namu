import styled from 'styled-components';
import { GreenButton } from '../Components/UI/button';
import { handleGoogleLogin } from '../Components/API/Login/fetchUser';

const LoginContainer = styled.section`
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
  button {
    width: 200px;
    height: 50px;
    font-size: 20px;
    margin-top: 70px;
  }
`;

function LoginPage() {
  return (
    <LoginContainer>
      <h1>나무와 함께 해야 볼 수 있어요!</h1>
      <GreenButton onClick={handleGoogleLogin}>함께 하러 가기</GreenButton>
    </LoginContainer>
  );
}

export default LoginPage;
