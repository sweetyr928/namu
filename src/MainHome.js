import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userData } from './Recoil/atoms';
import MainPage from './Pages/mainPage';
import SearchPage from './Pages/searchPage';
import CreatePostPage from './Pages/createPostPage';
import ChatSection from './Components/UI/chatSection';
import PostDetailPage from './Pages/postDetailPage';
import EditTagPage from './Pages/editTagPage';
import UpdatePostPage from './Pages/updatePostPage';

function MainHome() {
  const currentUserData = useRecoilValue(userData);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage uid={currentUserData.uid} />} />
        <Route
          path="/posts/:id"
          element={<PostDetailPage uid={currentUserData.uid} />}
        />
        <Route
          path="/tag"
          element={<EditTagPage uid={currentUserData.uid} />}
        />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/newPost"
          element={<CreatePostPage uid={currentUserData.uid} />}
        />
        <Route
          path="/posts/:id/edit"
          element={<UpdatePostPage uid={currentUserData.uid} />}
        />
      </Routes>
      <ChatSection></ChatSection>
    </>
  );
}

export default MainHome;
