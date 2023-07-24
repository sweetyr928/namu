import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState } from './Recoil/atoms';
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

  return (
    <>
      <Routes>
        <Route path="/" element={isLogin ? <MainPage /> : <SearchPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/tag" element={<EditTagPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/newPost"
          element={isLogin ? <CreatePostPage /> : <LoginPage />}
        />
        <Route path="/posts/:id/edit" element={<UpdatePostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ChatSection isLogin={isLogin} />
    </>
  );
}

export default MainHome;
