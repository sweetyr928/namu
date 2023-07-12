import styled, { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './Components/UI/sidebar';
import Main from './Pages/main';
import Header from './Components/UI/header';
import Search from './Pages/search';
import ChatSection from './Components/UI/chatSection';
import CreatePost from './Pages/post';

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
        <Router>
          <SideBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post" element={<CreatePost />} />
            {/* <Route path="/mypage" element={<MyPage />} /> */}
          </Routes>
          <ChatSection></ChatSection>
        </Router>
      </MainContainer>
    </AppContainer>
  );
}

export default App;
