import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Pages/main';
import Search from './Pages/search';
import CreatePost from './Pages/createPost';
import ChatSection from './Components/UI/chatSection';

function MainHome({ uid }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/newPost" element={<CreatePost uid={uid} />} />
      </Routes>
      <ChatSection></ChatSection>
    </>
  );
}

export default MainHome;
