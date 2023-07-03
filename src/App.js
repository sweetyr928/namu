import styled, { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import MemberHeader from './Components/UI/memberHeader';
import SideBar from './Components/UI/Sidebar';
import MainPage from './Pages/main';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  div,
  button,
  span,
  p{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    color: #3f3f3f;
  }
`;

const AppContainer = styled.div`
  overflow: hidden;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcf9c6;
  height: 100vh;
`;

function App() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);
  return (
    <AppContainer>
      <GlobalStyle />
      <MemberHeader />
      <MainContainer>
        <SideBar />
        <MainPage />
      </MainContainer>
    </AppContainer>
  );
}

export default App;
