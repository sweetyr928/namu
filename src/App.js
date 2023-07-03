import styled, { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import SideBar from './Components/UI/Sidebar';
import MainPage from './Pages/main';
import Header from './Components/UI/header';

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
      <Header />
      <MainContainer>
        <SideBar />
        <MainPage />
      </MainContainer>
    </AppContainer>
  );
}

export default App;
