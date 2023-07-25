import styled, { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilValue } from 'recoil';
import { isLoginState } from './Recoil/atoms';
import SideBar from './Components/UI/Sidebar';
import Header from './Components/UI/header';
import MyPage from './Pages/mypage';
import LoginPage from './Pages/loginPage';
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

const queryClient = new QueryClient();

function App() {
  const isLogin = useRecoilValue(isLoginState);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <GlobalStyle />
        <Router>
          <Header />
          <MainContainer>
            <SideBar />
            <Routes>
              <Route path="/*" element={<MainHome />} />
              <Route
                path="/mypage"
                element={isLogin ? <MyPage /> : <LoginPage />}
              />
            </Routes>
          </MainContainer>
        </Router>
      </AppContainer>
    </QueryClientProvider>
  );
}

export default App;
