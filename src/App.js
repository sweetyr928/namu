import styled, { createGlobalStyle } from 'styled-components';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './Components/UI/Sidebar';
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

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcf9c6;
  height: 100vh;
`;

function App() {
  const [name, setName] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const sessions = Object.keys(sessionStorage);
    for (let i = 0; i < sessions.length; i += 1) {
      if (sessions[i].includes('firebase:authUser:')) {
        setIsLogin(true);
        setName(JSON.parse(sessionStorage.getItem(sessions[i])).displayName);
      }
    }
  }, [userData]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <AppContainer>
      <GlobalStyle />
      <Header isLogin={isLogin} setUserData={setUserData} name={name} />
      <MainContainer>
        <Router>
          <SideBar />
          <Routes>
            <Route path="/*" element={<MainHome />} />
            <Route path="/mypage" element={<MyPage name={name} />} />
          </Routes>
        </Router>
      </MainContainer>
    </AppContainer>
  );
}

export default App;
