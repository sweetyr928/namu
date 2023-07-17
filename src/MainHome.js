import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/mainPage';
import SearchPage from './Pages/searchPage';
import CreatePostPage from './Pages/createPostPage';
import ChatSection from './Components/UI/chatSection';
import PostDetailPage from './Pages/postDetailPage';
import EditTagPage from './Pages/editTagPage';
import UpdatePostPage from './Pages/updatePostPage';

function MainHome({ uid }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage uid={uid} />} />
        <Route path="/posts/:id" element={<PostDetailPage uid={uid} />} />
        <Route path="/tag" element={<EditTagPage uid={uid} />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/newPost" element={<CreatePostPage uid={uid} />} />
        <Route path="/posts/:id/edit" element={<UpdatePostPage uid={uid} />} />
      </Routes>
      <ChatSection></ChatSection>
    </>
  );
}

export default MainHome;
