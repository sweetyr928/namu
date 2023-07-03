import styled from 'styled-components';
import { useEffect } from 'react';
import Header from './Components/header';
import SideBar from './Components/Sidebar';
import PostSection from './Components/postSection';
import ChatSection from './Components/chatSection';

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
      <Header />
      <MainContainer>
        <SideBar />
        <PostSection />
        <ChatSection />
      </MainContainer>
    </AppContainer>
  );
}

export default App;
