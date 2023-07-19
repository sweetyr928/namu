import styled, { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './Components/UI/sidebar';
import Header from './Components/UI/header';
import MyPage from './Pages/mypage';
import MainHome from './MainHome';

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

const MainContainer = styled.main`
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
        <Router>
          <SideBar />
          <Routes>
            <Route path="/*" element={<MainHome />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Router>
      </MainContainer>
    </AppContainer>
  );
}

export default App;
