import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState, userData } from './Recoil/atoms';
import MainPage from './Pages/mainPage';
import NotFound from './Pages/notFoundPage';
import LoginPage from './Pages/loginPage';
import SearchPage from './Pages/searchPage';
import CreatePostPage from './Pages/createPostPage';
import ChatSection from './Components/UI/chatSection';
import PostDetailPage from './Pages/postDetailPage';
import EditTagPage from './Pages/editTagPage';
import UpdatePostPage from './Pages/updatePostPage';

function MainHome() {
  const isLogin = useRecoilValue(isLoginState);
  const currentUserData = useRecoilValue(userData);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? <MainPage uid={currentUserData.uid} /> : <SearchPage />
          }
        />
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
          element={
            isLogin ? (
              <CreatePostPage uid={currentUserData.uid} />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/posts/:id/edit"
          element={<UpdatePostPage uid={currentUserData.uid} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ChatSection></ChatSection>
    </>
  );
}

export default MainHome;
